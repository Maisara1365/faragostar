<?php

namespace App\Http\Controllers\Api\Conversation;

use App\Http\Controllers\Controller;
use App\Http\Requests\Conversation\StoreConversationRequest;
use App\Http\Requests\Conversation\UpdateConversationRequest;
use App\Http\Resources\ConversationResource;
use App\Models\Conversation;
use App\Models\User;
use App\Services\Conversation\ConversationService;
use Illuminate\Http\Request;

class ConversationController extends Controller
{
    /**
     * Constructor.
     */
    public function __construct(
        private ConversationService $conversationService
    ) {}

    /**
     * List conversations.
     *
     * Admin:
     *   Can view all conversations.
     *
     * Content Manager:
     *   Can view only customer conversations
     *   specifically assigned to them.
     */
    public function index(Request $request)
    {
        $user = $request->user();

        /*
        |--------------------------------------------------------------------------
        | Admin
        |--------------------------------------------------------------------------
        */

        if ($user->role === 'admin') {
            return $this->success(
                ConversationResource::collection(
                    $this->conversationService->getAll()
                ),
                'Conversations retrieved successfully.'
            );
        }

        /*
        |--------------------------------------------------------------------------
        | Content Manager
        |--------------------------------------------------------------------------
        */

        if ($user->role === 'content_manager') {
            return $this->success(
                ConversationResource::collection(
                    $this->conversationService
                        ->getContentManagerConversations($user)
                ),
                'Conversations retrieved successfully.'
            );
        }

        /*
        |--------------------------------------------------------------------------
        | Unauthorized
        |--------------------------------------------------------------------------
        */

        return $this->forbidden(
            'You are not authorized to access these conversations.'
        );
    }

    /**
     * Customer - My conversations.
     */
    public function myConversations(Request $request)
    {
        if ($request->user()->role !== 'customer') {
            return $this->forbidden(
                'Only customers can access their customer conversations.'
            );
        }

        return $this->success(
            ConversationResource::collection(
                $this->conversationService->getCustomerConversations(
                    $request->user()
                )
            ),
            'Conversations retrieved successfully.'
        );
    }

    /**
     * Customer only - Create conversation.
     */
    public function store(
        StoreConversationRequest $request
    ) {
        if ($request->user()->role !== 'customer') {
            return $this->forbidden(
                'Only customers can create conversations.'
            );
        }

        $conversation = $this->conversationService->create(
            $request->validated(),
            $request->user()
        );

        return $this->success(
            new ConversationResource($conversation),
            'Conversation created successfully.',
            201
        );
    }

    /**
     * Admin only - Create conversation for a customer.
     */
    public function storeForCustomer(
        Request $request
    ) {
        if ($request->user()->role !== 'admin') {
            return $this->forbidden(
                'Only administrators can create conversations for customers.'
            );
        }

        $request->validate([
            'customer_id' => [
                'required',
                'exists:users,id',
            ],
            'subject' => [
                'nullable',
                'string',
                'max:255',
            ],
        ]);

        $customer = User::findOrFail(
            $request->customer_id
        );

        if ($customer->role !== 'customer') {
            return $this->forbidden(
                'The selected user is not a customer.'
            );
        }

        $conversation = $this->conversationService->createForCustomer(
            $customer,
            $request->subject,
            $request->user()
        );

        return $this->success(
            new ConversationResource($conversation),
            'Conversation created successfully.',
            201
        );
    }

    /**
     * Content Manager only - Create conversation for an administrator.
     */
    public function storeForAdmin(
        Request $request
    ) {
        if ($request->user()->role !== 'content_manager') {
            return $this->forbidden(
                'Only content managers can create conversations for administrators.'
            );
        }

        $request->validate([
            'subject' => [
                'nullable',
                'string',
                'max:255',
            ],
        ]);

        $conversation = $this->conversationService->createForAdmin(
            $request->user(),
            $request->subject
        );

        return $this->success(
            new ConversationResource($conversation),
            'Conversation created successfully.',
            201
        );
    }

    /**
     * Show conversation.
     *
     * Admin:
     *   Can view any conversation.
     *
     * Content Manager:
     *   Can view only conversations specifically assigned to them.
     *
     * Customer:
     *   Can only view their own conversations.
     */
    public function show(
        Request $request,
        Conversation $conversation
    ) {
        $user = $request->user();

        /*
        |--------------------------------------------------------------------------
        | Customer
        |--------------------------------------------------------------------------
        */

        if ($user->role === 'customer') {

            if ($conversation->customer_id !== $user->id) {
                return $this->forbidden(
                    'You are not authorized to access this conversation.'
                );
            }
        }

        /*
        |--------------------------------------------------------------------------
        | Content Manager
        |--------------------------------------------------------------------------
        */

        if ($user->role === 'content_manager') {

            /*
            |--------------------------------------------------------------------------
            | IMPORTANT
            |--------------------------------------------------------------------------
            |
            | The Content Manager must be specifically assigned to this
            | conversation. Merely having an admin_id is NOT enough.
            |
            */

            if (
                ! $this->conversationService
                    ->isAssignedToContentManager(
                        $conversation,
                        $user
                    )
            ) {
                return $this->forbidden(
                    'You are not authorized to access this conversation.'
                );
            }
        }

        /*
        |--------------------------------------------------------------------------
        | Allowed Roles
        |--------------------------------------------------------------------------
        */

        if (! in_array($user->role, [
            'admin',
            'content_manager',
            'customer',
        ], true)) {
            return $this->forbidden(
                'You are not authorized to access this conversation.'
            );
        }

        return $this->success(
            new ConversationResource($conversation),
            'Conversation retrieved successfully.'
        );
    }

    /**
     * Admin only - Update conversation.
     */
    public function update(
        UpdateConversationRequest $request,
        Conversation $conversation
    ) {
        if ($request->user()->role !== 'admin') {
            return $this->forbidden(
                'Only administrators can update conversations.'
            );
        }

        $conversation = $this->conversationService->update(
            $conversation,
            $request->validated()
        );

        return $this->success(
            new ConversationResource($conversation),
            'Conversation updated successfully.'
        );
    }

    /**
     * Admin only - Assign administrator.
     */
    public function assignAdmin(
        Request $request,
        Conversation $conversation
    ) {
        if ($request->user()->role !== 'admin') {
            return $this->forbidden(
                'Only administrators can assign conversations.'
            );
        }

        $request->validate([
            'admin_id' => [
                'required',
                'exists:users,id',
            ],
        ]);

        $admin = User::findOrFail(
            $request->admin_id
        );

        if ($admin->role !== 'admin') {
            return $this->forbidden(
                'The selected user is not an administrator.'
            );
        }

        $conversation = $this->conversationService->assignAdmin(
            $conversation,
            $admin
        );

        return $this->success(
            new ConversationResource($conversation),
            'Administrator assigned successfully.'
        );
    }

    /**
     * Admin only - Assign Content Manager.
     *
     * The administrator explicitly assigns one Content Manager
     * to the conversation.
     */
    public function assignContentManager(
        Request $request,
        Conversation $conversation
    ) {
        if ($request->user()->role !== 'admin') {
            return $this->forbidden(
                'Only administrators can assign content managers.'
            );
        }

        $request->validate([
            'content_manager_id' => [
                'required',
                'exists:users,id',
            ],
        ]);

        $contentManager = User::findOrFail(
            $request->content_manager_id
        );

        if ($contentManager->role !== 'content_manager') {
            return $this->forbidden(
                'The selected user is not a content manager.'
            );
        }

        $conversation = $this->conversationService
            ->assignContentManager(
                $conversation,
                $contentManager
            );

        return $this->success(
            new ConversationResource($conversation),
            'Content manager assigned successfully.'
        );
    }

    /**
     * Admin only - Open conversation.
     */
    public function open(
        Request $request,
        Conversation $conversation
    ) {
        if ($request->user()->role !== 'admin') {
            return $this->forbidden(
                'Only administrators can open conversations.'
            );
        }

        $conversation = $this->conversationService->open(
            $conversation
        );

        return $this->success(
            new ConversationResource($conversation),
            'Conversation opened successfully.'
        );
    }

    /**
     * Admin only - Close conversation.
     */
    public function close(
        Request $request,
        Conversation $conversation
    ) {
        if ($request->user()->role !== 'admin') {
            return $this->forbidden(
                'Only administrators can close conversations.'
            );
        }

        $conversation = $this->conversationService->close(
            $conversation
        );

        return $this->success(
            new ConversationResource($conversation),
            'Conversation closed successfully.'
        );
    }

    /**
     * Admin only - Delete conversation.
     *
     * Deleting the conversation removes it from the system
     * for all users who previously had access to it.
     */
    public function destroy(
        Request $request,
        Conversation $conversation
    ) {
        if ($request->user()->role !== 'admin') {
            return $this->forbidden(
                'Only administrators can delete conversations.'
            );
        }

        $this->conversationService->delete(
            $conversation
        );

        return $this->success(
            null,
            'Conversation deleted successfully.'
        );
    }
}