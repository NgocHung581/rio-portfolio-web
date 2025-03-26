<?php

declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * Resource class for transforming album media item data.
 */
class AlbumMediaItemResource extends JsonResource
{
    public static $wrap;

    /**
     * Transform the resource into an array.
     */
    public function toArray(Request $request): array
    {
        $data = [
            'id' => $this->id,
            'type' => $this->mediaFile->type,
            'url' => $this->mediaFile->url,
            'column_span' => $this->column_span,
        ];

        if ($this->relationLoaded('album')) {
            $data['album'] = new AlbumResource($this->album);
        } else {
            $data['album_id'] = $this->album_id;
        }

        if ($this->relationLoaded('videoThumbnailFile') && isset($this->videoThumbnailFile)) {
            $data['video_thumbnail_url'] = $this->videoThumbnailFile->url;
        }

        return $data;
    }
}
