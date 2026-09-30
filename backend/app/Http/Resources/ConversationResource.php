<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ConversationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray(Request $request): array
    {
        return [

            /*
            |--------------------------------------------------------------------------
            | Conversation
            |--------------------------------------------------------------------------
            */

            'id' => $this->id,

            'customer_id' => $this->customer_id,

            'admin_id' => $this->admin_id,

            'content_manager_id' =>
                $this->content_manager_id,

            'subject' => $this->subject,

            'status' => $this->status,

            /*
            |--------------------------------------------------------------------------
            | Customer
            |--------------------------------------------------------------------------
            */

            'customer' => $this->whenLoaded(
                'customer',
                function () {

                    if (! $this->customer) {
                        return null;
                    }

                    return [
                        'id' =>
                            $this->customer->id,

                        'name' =>
                            $this->customer->name,

                        'email' =>
                            $this->customer->email,

                        'role' =>
                            $this->customer->role,
                    ];
                }
            ),

            /*
            |--------------------------------------------------------------------------
            | Administrator
            |--------------------------------------------------------------------------
            */

            'admin' => $this->whenLoaded(
                'admin',
                function () {

                    if (! $this->admin) {
                        return null;
                    }

                    return [
                        'id' =>
                            $this->admin->id,

                        'name' =>
                            $this->admin->name,

                        'email' =>
                            $this->admin->email,

                        'role' =>
                            $this->admin->role,
                    ];
                }
            ),

            /*
            |--------------------------------------------------------------------------
            | Assigned Content Manager
            |--------------------------------------------------------------------------
            */

            'content_manager' => $this->whenLoaded(
                'contentManager',
                function () {

                    if (! $this->contentManager) {
                        return null;
                    }

                    return [
                        'id' =>
                            $this->contentManager->id,

                        'name' =>
                            $this->contentManager->name,

                        'email' =>
                            $this->contentManager->email,

                        'role' =>
                            $this->contentManager->role,
                    ];
                }
            ),

            /*
            |--------------------------------------------------------------------------
            | Last Message
            |--------------------------------------------------------------------------
            */

            'last_message' => $this->whenLoaded(
                'messages',
                function () {

                    $message =
                        $this->messages->first();

                    return $message
                        ? new MessageResource($message)
                        : null;
                }
            ),

            /*
            |--------------------------------------------------------------------------
            | Unread Messages
            |--------------------------------------------------------------------------
            */

            'unread_count' =>
                $this->unread_count ?? 0,

            /*
            |--------------------------------------------------------------------------
            | Timestamps
            |--------------------------------------------------------------------------
            */

            'created_at' =>
                $this->created_at,

            'updated_at' =>
                $this->updated_at,

        ];
    }
}