<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderFileResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray(Request $request): array
    {
        return [

            'id' => $this->id,

            'file_name' => $this->file_name,

            'file_url' => $this->file_url,

            'file_size' => $this->file_size,

            'file_size_formatted' => $this->file_size_formatted,

            'file_type' => $this->file_type,

            'uploaded_by' => $this->uploaded_by,

            'created_at' => $this->created_at,
        ];
    }
}