<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Models\AlbumMediaItem;
use Common\App\Repositories\AlbumMediaItemRepository as CommonAlbumMediaItemRepository;
use Illuminate\Database\Eloquent\Collection;

/**
 * Repository class for `AlbumMediaItem` model.
 */
class AlbumMediaItemRepository extends CommonAlbumMediaItemRepository
{
    /**
     * Retrieve the album media items that are displayed on the banner.
     */
    public function getAlbumMediaItemsOnBanner(): Collection
    {
        return AlbumMediaItem::query()
            ->with('mediaFile')
            ->where('is_displayed_on_banner', true)
            ->whereRelation('album', 'deleted_at', null)
            ->get();
    }
}
