<?php

namespace App\Http\Controllers\Api\Message;

use App\Http\Controllers\Controller;
use App\Http\Requests\Message\StoreMessageRequest;
use App\Http\Requests\Message\UpdateMessageRequest;
use App\Http\Resources\MessageResource;
use App\Models\Conversation;
use App\Models\Message;
use App\Services\Message\MessageService;
use App\Services\Notification\NotificationService;
use App\Models\User;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function __construct(
        private MessageService $messageService,
        private NotificationService $notificationService
    ) {}

    /**
     * Display messages of a conversation.
     *
     * Admin:
     *   Can view messages in any conversation.
     *
     * Content Manager:
     *   Can view messages only in conversations
     *   explicitly assigned to them.
     *
     * Customer:
     *   Can view messages only in their own conversations.
     */
    public function index(
        Conversation $conversation,
        Request $request
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

            if ($conversation->content_manager_id !== $user->id) {
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
            MessageResource::collection(
                $this->messageService->getConversationMessages(
                    $conversation
                )
            ),
            'Messages retrieved successfully.'
        );
    }

    /**
     * Store message.
     *
     * Admin:
     *   Can send messages in any open conversation.
     *
     * Content Manager:
     *   Can send messages only in conversations
     *   explicitly assigned to them.
     *
     * Customer:
     *   Can send messages only in their own open conversation.
     */
    public function store(
        StoreMessageRequest $request
    ) {
        $user = $request->user();

        $conversation = Conversation::findOrFail(
            $request->conversation_id
        );

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
                'You are not authorized to send messages.'
            );
        }

        /*
        |--------------------------------------------------------------------------
        | Conversation must be open
        |--------------------------------------------------------------------------
        */

        if ($conversation->status !== 'open') {
            return $this->forbidden(
                'This conversation has been closed.'
            );
        }

        /*
        |--------------------------------------------------------------------------
        | Customer
        |--------------------------------------------------------------------------
        */

        if ($user->role === 'customer') {

            if ($conversation->customer_id !== $user->id) {
                return $this->forbidden(
                    'You are not authorized to send messages to this conversation.'
                );
            }
        }

        /*
        |--------------------------------------------------------------------------
        | Content Manager
        |--------------------------------------------------------------------------
        |
        | Content Managers can only send messages in conversations
        | explicitly assigned to their own user account.
        |
        */

        if ($user->role === 'content_manager') {

            if ($conversation->content_manager_id !== $user->id) {
                return $this->forbidden(
                    'You are not authorized to send messages in this conversation.'
                );
            }
        }

        /*
        |--------------------------------------------------------------------------
        | Create Message
        |--------------------------------------------------------------------------
        */

        $message = $this->messageService->create(
            $request->validated(),
            $user
        );

        /*
        |--------------------------------------------------------------------------
        | Create Notifications
        |--------------------------------------------------------------------------
        */

        $this->createMessageNotifications(
            $conversation,
            $user,
            $message
        );

        return $this->success(
            new MessageResource($message),
            'Message sent successfully.',
            201
        );
    }

    /**
     * Update message.
     *
     * Only the original sender can edit their message.
     */
    public function update(
        UpdateMessageRequest $request,
        Message $message
    ) {
        $user = $request->user();

        if ($message->conversation->status !== 'open') {
            return $this->forbidden(
                'This conversation has been closed.'
            );
        }

        if ($message->sender_id !== $user->id) {
            return $this->forbidden(
                'You can only edit your own messages.'
            );
        }

        /*
        |--------------------------------------------------------------------------
        | Content Manager cannot edit messages
        |--------------------------------------------------------------------------
        */

        if ($user->role === 'content_manager') {
            return $this->forbidden(
                'Content managers cannot edit messages.'
            );
        }

        $message = $this->messageService->update(
            $message,
            $request->validated()
        );

        return $this->success(
            new MessageResource($message),
            'Message updated successfully.'
        );
    }

    /**
     * Mark message as seen.
     */
    public function markAsSeen(
        Request $request,
        Message $message
    ) {
        $user = $request->user();

        /*
        |--------------------------------------------------------------------------
        | Customer
        |--------------------------------------------------------------------------
        */

        if (
            $user->role === 'customer' &&
            $message->conversation->customer_id !== $user->id
        ) {
            return $this->forbidden(
                'You are not authorized to access this message.'
            );
        }

        /*
        |--------------------------------------------------------------------------
        | Content Manager
        |--------------------------------------------------------------------------
        */

        if (
            $user->role === 'content_manager' &&
            $message->conversation->content_manager_id !== $user->id
        ) {
            return $this->forbidden(
                'You are not authorized to access this message.'
            );
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
                'You are not authorized to mark this message as seen.'
            );
        }

        $message = $this->messageService->markAsSeen(
            $message
        );

        return $this->success(
            new MessageResource($message),
            'Message marked as seen.'
        );
    }

    /**
     * Remove attachment.
     *
     * Only the original sender can remove their attachment.
     */
    public function deleteAttachment(
        Message $message,
        Request $request
    ) {
        $user = $request->user();

        if ($message->sender_id !== $user->id) {
            return $this->forbidden(
                'You can only remove attachments from your own messages.'
            );
        }

        /*
        |--------------------------------------------------------------------------
        | Content Manager cannot delete attachments
        |--------------------------------------------------------------------------
        */

        if ($user->role === 'content_manager') {
            return $this->forbidden(
                'Content managers cannot delete message attachments.'
            );
        }

        $message = $this->messageService->deleteAttachment(
            $message
        );

        return $this->success(
            new MessageResource($message),
            'Attachment removed successfully.'
        );
    }

    /**
     * Create notifications for a newly sent message.
     */
    private function createMessageNotifications(
        Conversation $conversation,
        User $sender,
        Message $message
    ): void {
        /*
        |--------------------------------------------------------------------------
        | Customer message
        |--------------------------------------------------------------------------
        |
        | Notify the assigned Content Manager and Admin.
        |
        */

        if ($sender->role === 'customer') {

            /*
             * Notify assigned Content Manager.
             */
            if ($conversation->content_manager_id) {

                $contentManager = User::find(
                    $conversation->content_manager_id
                );

                if ($contentManager) {
                    $this->notificationService->create(
                        $contentManager,
                        'new_message',
                        $message,
                        [
                            'conversation_id' => $conversation->id,
                            'message_id' => $message->id,
                            'sender_id' => $sender->id,
                            'sender_role' => $sender->role,
                            'action' => 'message',
                        ]
                    );
                }
            }

            /*
             * Notify assigned Admin.
             */
            if ($conversation->admin_id) {

                $admin = User::find(
                    $conversation->admin_id
                );

                if ($admin) {
                    $this->notificationService->create(
                        $admin,
                        'new_message',
                        $message,
                        [
                            'conversation_id' => $conversation->id,
                            'message_id' => $message->id,
                            'sender_id' => $sender->id,
                            'sender_role' => $sender->role,
                            'action' => 'message',
                        ]
                    );
                }
            }
        }

        /*
        |--------------------------------------------------------------------------
        | Admin message
        |--------------------------------------------------------------------------
        |
        | Notify the customer.
        |
        */

        if ($sender->role === 'admin') {

            if ($conversation->customer_id) {

                $customer = User::find(
                    $conversation->customer_id
                );

                if ($customer) {
                    $this->notificationService->create(
                        $customer,
                        'new_message',
                        $message,
                        [
                            'conversation_id' => $conversation->id,
                            'message_id' => $message->id,
                            'sender_id' => $sender->id,
                            'sender_role' => $sender->role,
                            'action' => 'message',
                        ]
                    );
                }
            }
        }

        /*
        |--------------------------------------------------------------------------
        | Content Manager message
        |--------------------------------------------------------------------------
        |
        | Notify the administrator.
        |
        */

        if ($sender->role === 'content_manager') {

            if ($conversation->admin_id) {

                $admin = User::find(
                    $conversation->admin_id
                );

                if ($admin) {
                    $this->notificationService->create(
                        $admin,
                        'new_message',
                        $message,
                        [
                            'conversation_id' => $conversation->id,
                            'message_id' => $message->id,
                            'sender_id' => $sender->id,
                            'sender_role' => $sender->role,
                            'action' => 'message',
                        ]
                    );
                }
            }
        }
    }
}
