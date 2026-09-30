<?php

namespace App\Services\Conversation;

use App\Models\Conversation;
use App\Models\User;

class ConversationService
{
    /**
     * Get all conversations for administrators.
     */
    public function getAll()
    {
        return Conversation::with([
            'customer',
            'admin',
            'contentManager',
            'messages' => function ($query) {
                $query->latest()->limit(1);
            },
        ])
        ->withCount([
            'messages as unread_count' => function ($query) {
                $query->where('seen', false);
            },
        ])
        ->latest()
        ->get();
    }

    /**
     * Get conversations assigned to the authenticated
     * Content Manager.
     *
     * IMPORTANT:
     *
     * A Content Manager can only see conversations where
     * content_manager_id matches their authenticated user ID.
     */
    public function getContentManagerConversations(
        User $contentManager
    ) {
        return Conversation::with([
            'customer',
            'admin',
            'contentManager',
            'messages' => function ($query) {
                $query->latest()->limit(1);
            },
        ])
        ->withCount([
            'messages as unread_count' => function ($query) {
                $query->where('seen', false);
            },
        ])
        ->where(
            'content_manager_id',
            $contentManager->id
        )
        ->latest()
        ->get();
    }

    /**
     * Get conversations for the authenticated customer.
     */
    public function getCustomerConversations(
        User $customer
    ) {
        return Conversation::with([
            'admin',
            'contentManager',
            'messages' => function ($query) {
                $query->latest()->limit(1);
            },
        ])
        ->withCount([
            'messages as unread_count' => function ($query) {
                $query->where('seen', false);
            },
        ])
        ->where(
            'customer_id',
            $customer->id
        )
        ->latest()
        ->get();
    }

    /**
     * Create a new conversation.
     *
     * Customer creates the conversation.
     * Content Manager is NOT automatically assigned.
     *
     * The administrator must explicitly assign a
     * Content Manager later.
     */
    public function create(
        array $data,
        User $customer
    ): Conversation {
        return Conversation::create([
            'customer_id' => $customer->id,
            'admin_id' => null,
            'content_manager_id' => null,
            'subject' => $data['subject'] ?? null,
            'status' => 'open',
        ]);
    }

    /**
     * Admin - Create a conversation for a customer.
     *
     * The conversation starts without a Content Manager.
     * Admin must explicitly assign one.
     */
    public function createForCustomer(
        User $customer,
        ?string $subject,
        User $admin
    ): Conversation {
        return Conversation::create([
            'customer_id' => $customer->id,
            'admin_id' => $admin->id,
            'content_manager_id' => null,
            'subject' => $subject,
            'status' => 'open',
        ]);
    }

    /**
     * Content Manager - Create a conversation with an administrator.
     *
     * This is a separate Content Manager -> Admin conversation.
     *
     * The Content Manager is the owner of this conversation,
     * so content_manager_id is set to the authenticated
     * Content Manager.
     */
    public function createForAdmin(
        User $contentManager,
        ?string $subject
    ): Conversation {
        $admin = User::where('role', 'admin')
            ->orderBy('id')
            ->first();

        if (! $admin) {
            throw new \RuntimeException(
                'No administrator is available.'
            );
        }

        return Conversation::create([
            /*
             * IMPORTANT:
             *
             * This is NOT a customer conversation.
             * Do not put the Content Manager in customer_id.
             */
            'customer_id' => null,

            'admin_id' => $admin->id,

            /*
             * The Content Manager owns this conversation.
             */
            'content_manager_id' => $contentManager->id,

            'subject' => $subject,

            'status' => 'open',
        ]);
    }

    /**
     * Determine whether a Content Manager is explicitly
     * assigned to a conversation.
     */
    public function isAssignedToContentManager(
        Conversation $conversation,
        User $contentManager
    ): bool {
        return (int) $conversation->content_manager_id ===
            (int) $contentManager->id;
    }

    /**
     * Update conversation.
     */
    public function update(
        Conversation $conversation,
        array $data
    ): Conversation {
        $conversation->update($data);

        return $conversation->refresh();
    }

    /**
     * Assign an administrator.
     */
    public function assignAdmin(
        Conversation $conversation,
        User $admin
    ): Conversation {
        $conversation->update([
            'admin_id' => $admin->id,
        ]);

        return $conversation->refresh();
    }

    /**
     * Assign a Content Manager.
     *
     * Only this Content Manager will be allowed to access
     * the assigned customer conversation.
     */
    public function assignContentManager(
        Conversation $conversation,
        User $contentManager
    ): Conversation {
        $conversation->update([
            'content_manager_id' => $contentManager->id,
        ]);

        return $conversation->refresh();
    }

    /**
     * Open conversation.
     */
    public function open(
        Conversation $conversation
    ): Conversation {
        $conversation->update([
            'status' => 'open',
        ]);

        return $conversation->refresh();
    }

    /**
     * Close conversation.
     */
    public function close(
        Conversation $conversation
    ): Conversation {
        $conversation->update([
            'status' => 'closed',
        ]);

        return $conversation->refresh();
    }

    /**
     * Delete conversation.
     *
     * Deleting the conversation removes it from the
     * conversation list for all participants.
     *
     * Related messages should be removed automatically
     * if the database foreign key uses cascade delete.
     */
    public function delete(
        Conversation $conversation
    ): void {
        $conversation->delete();
    }
}