<?php

declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * Resource class for transforming album data.
 */
class AlbumResource extends JsonResource
{
    public static $wrap;

    /**
     * Transform the resource into an array.
     */
    public function toArray(Request $request): array
    {
        $locale = app()->getLocale();

        return [
            'id' => $this->id,
            'title' => $this->{"title_{$locale}"},
            'name' => $this->{"name_{$locale}"},
            'description' => $this->{"description_{$locale}"},
            'summary' => $this->{"summary_{$locale}"},
            'is_highlight' => $this->is_highlight,
            'thumbnail' => new MediaFileResource($this->thumbnail),
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
            'updated_at' => $this->updated_at->format('Y-m-d H:i:s'),
        ];
    }
}
