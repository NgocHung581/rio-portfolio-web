<?php

declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * Resource class for transforming media file data.
 */
class MediaFileResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray(Request $request): array
    {
        $data = [
            'id' => $this->id,
            'url' => $this->url,
            'type' => $this->type,
        ];

        if (!empty($this->aspect_ratio)) {
            $data['aspect_ratio'] = $this->aspect_ratio;
        }

        return $data;
    }
}
