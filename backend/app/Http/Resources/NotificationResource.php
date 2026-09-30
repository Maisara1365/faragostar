<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class NotificationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray(
        Request $request
    ): array {
        return [
            'id' => $this->id,

            /*
             * Translation key.
             *
             * The frontend uses this value with
             * en.ts / fa.ts.
             */
            'type' => $this->type,

            /*
             * Dynamic notification data.
             */
            'data' => $this->data,

            'notifiable_type' => $this->notifiable_type,

            'notifiable_id' => $this->notifiable_id,

            'read' => $this->read_at !== null,

            'read_at' => $this->read_at,

            'created_at' => $this->created_at,

            'updated_at' => $this->updated_at,
        ];
    }
}
