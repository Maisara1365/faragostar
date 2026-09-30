<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MessageResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray(Request $request): array
    {
        return [

            'id' => $this->id,

            'conversation_id' => $this->conversation_id,

            'sender_id' => $this->sender_id,

            'message' => $this->message,

            'attachment' => $this->attachment,

            'seen' => $this->seen,

            'seen_at' => $this->seen_at,

            'created_at' => $this->created_at,

            'updated_at' => $this->updated_at,

        ];
    }
}