<?php

namespace App\Http\Controllers\Api\Contact;

use App\Http\Controllers\Controller;
use App\Http\Requests\Contact\StoreContactMessageRequest;
use App\Http\Requests\Contact\UpdateContactMessageRequest;
use App\Http\Resources\ContactMessageResource;
use App\Models\ContactMessage;
use App\Services\Contact\ContactMessageService;

class ContactMessageController extends Controller
{
    /**
     * Constructor.
     */
    public function __construct(
        private ContactMessageService $contactMessageService
    ) {}

    /**
     * Display all messages (Admin).
     */
    public function index()
    {
        return $this->success(
            ContactMessageResource::collection(
                $this->contactMessageService->getAll()
            ),
            'Contact messages retrieved successfully.'
        );
    }

    /**
     * Display unread messages.
     */
    public function unread()
    {
        return $this->success(
            ContactMessageResource::collection(
                $this->contactMessageService->getUnread()
            ),
            'Unread messages retrieved successfully.'
        );
    }

    /**
     * Display read messages.
     */
    public function read()
    {
        return $this->success(
            ContactMessageResource::collection(
                $this->contactMessageService->getRead()
            ),
            'Read messages retrieved successfully.'
        );
    }

    /**
     * Display replied messages.
     */
    public function replied()
    {
        return $this->success(
            ContactMessageResource::collection(
                $this->contactMessageService->getReplied()
            ),
            'Replied messages retrieved successfully.'
        );
    }

    /**
     * Store a contact message (Public).
     */
    public function store(StoreContactMessageRequest $request)
    {
        $contactMessage = $this->contactMessageService->create(
            $request->validated()
        );

        return $this->success(
            new ContactMessageResource($contactMessage),
            'Your message has been sent successfully.',
            201
        );
    }

    /**
     * Display a specific message.
     */
    public function show(ContactMessage $contactMessage)
    {
        return $this->success(
            new ContactMessageResource($contactMessage),
            'Contact message retrieved successfully.'
        );
    }

    /**
     * Update a message.
     */
    public function update(
        UpdateContactMessageRequest $request,
        ContactMessage $contactMessage
    ) {
        $contactMessage = $this->contactMessageService->update(
            $contactMessage,
            $request->validated()
        );

        return $this->success(
            new ContactMessageResource($contactMessage),
            'Contact message updated successfully.'
        );
    }

    /**
     * Mark message as read.
     */
    public function markAsRead(ContactMessage $contactMessage)
    {
        $contactMessage = $this->contactMessageService->markAsRead(
            $contactMessage
        );

        return $this->success(
            new ContactMessageResource($contactMessage),
            'Message marked as read.'
        );
    }

    /**
     * Mark message as replied.
     */
    public function markAsReplied(ContactMessage $contactMessage)
    {
        $contactMessage = $this->contactMessageService->markAsReplied(
            $contactMessage
        );

        return $this->success(
            new ContactMessageResource($contactMessage),
            'Message marked as replied.'
        );
    }
}