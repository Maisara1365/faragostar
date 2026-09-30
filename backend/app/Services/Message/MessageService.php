<?php

namespace App\Services\Message;

use App\Models\Conversation;
use App\Models\Message;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class MessageService
{
    /**
     * Get all messages for a conversation.
     */
    public function getConversationMessages(
        Conversation $conversation
    )
    {
        return $conversation->messages()
            ->with('sender')
            ->oldest()
            ->get();
    }

    /**
     * Create a new message.
     */
    public function create(
        array $data,
        User $sender
    ): Message {

        if (
            isset($data['attachment']) &&
            $data['attachment'] instanceof UploadedFile
        ) {
            $data['attachment'] = $data['attachment']->store(
                'messages',
                'public'
            );
        }

        return Message::create([
            'conversation_id' => $data['conversation_id'],
            'sender_id'       => $sender->id,
            'message'         => $data['message'] ?? '',
            'attachment'      => $data['attachment'] ?? null,
            'seen'            => false,
            'seen_at'         => null,
        ]);
    }

    /**
     * Update message.
     */
    public function update(
        Message $message,
        array $data
    ): Message {

        if (
            isset($data['attachment']) &&
            $data['attachment'] instanceof UploadedFile
        ) {

            if (
                $message->attachment &&
                Storage::disk('public')->exists($message->attachment)
            ) {
                Storage::disk('public')->delete(
                    $message->attachment
                );
            }

            $data['attachment'] = $data['attachment']->store(
                'messages',
                'public'
            );
        }

        $message->update($data);

        return $message->refresh();
    }

    /**
     * Mark message as seen.
     */
    public function markAsSeen(
        Message $message
    ): Message {

        $message->markAsSeen();

        return $message->refresh();
    }

    /**
     * Delete message attachment.
     */
    public function deleteAttachment(
        Message $message
    ): Message {

        if (
            $message->attachment &&
            Storage::disk('public')->exists($message->attachment)
        ) {
            Storage::disk('public')->delete(
                $message->attachment
            );

            $message->update([
                'attachment' => null,
            ]);
        }

        return $message->refresh();
    }
}