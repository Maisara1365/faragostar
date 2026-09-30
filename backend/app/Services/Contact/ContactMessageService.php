<?php

namespace App\Services\Contact;

use App\Models\ContactMessage;

class ContactMessageService
{
    /**
     * Get all contact messages.
     */
    public function getAll()
    {
        return ContactMessage::latest()->get();
    }

    /**
     * Get unread messages.
     */
    public function getUnread()
    {
        return ContactMessage::unread()
            ->latest()
            ->get();
    }

    /**
     * Get read messages.
     */
    public function getRead()
    {
        return ContactMessage::read()
            ->latest()
            ->get();
    }

    /**
     * Get replied messages.
     */
    public function getReplied()
    {
        return ContactMessage::replied()
            ->latest()
            ->get();
    }

    /**
     * Store a new contact message.
     */
    public function create(array $data): ContactMessage
    {
        return ContactMessage::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'phone' => $data['phone'] ?? null,
            'subject' => $data['subject'] ?? null,
            'service' => $data['service'] ?? null,
            'message' => $data['message'],
            'status' => 'unread',
        ]);
    }

    /**
     * Update a contact message.
     */
    public function update(
        ContactMessage $contactMessage,
        array $data
    ): ContactMessage {

        $contactMessage->update($data);

        return $contactMessage->refresh();
    }

    /**
     * Mark message as read.
     */
    public function markAsRead(
        ContactMessage $contactMessage
    ): ContactMessage {

        $contactMessage->markAsRead();

        return $contactMessage->refresh();
    }

    /**
     * Mark message as replied.
     */
    public function markAsReplied(
        ContactMessage $contactMessage
    ): ContactMessage {

        $contactMessage->markAsReplied();

        return $contactMessage->refresh();
    }
}