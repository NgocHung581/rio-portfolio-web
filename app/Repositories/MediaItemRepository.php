<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Models\MediaItem;
use Common\App\Enums\WebVisibility;
use Common\App\Repositories\MediaItemRepository as CommonMediaItemRepository;
use Illuminate\Database\Eloquent\Collection;

/**
 * The repository class for media item.
 */
class MediaItemRepository extends CommonMediaItemRepository
{
    /**
     * Retrieve all media items that are banners and publicly visible.
     */
    public function getBanners(): Collection
    {
        return MediaItem::query()
            ->leftJoin('galleries', 'media_items.gallery_id', '=', 'galleries.id')
            ->leftJoin('projects', 'galleries.project_id', '=', 'projects.id')
            ->where('media_items.is_banner', true)
            // Media items without a gallery belong to no project (behind the scene), so they are always shown.
            ->where(function($query): void {
                $query->whereNull('media_items.gallery_id')
                    ->orWhere('projects.web_visibility', WebVisibility::Public->value);
            })
            ->orderByDesc('media_items.id')
            ->select('media_items.*')
            ->get();
    }
}
