<?php

declare(strict_types=1);

namespace App\Services\AlbumMediaItem;

use App\Repositories\AlbumMediaItemRepository;
use Illuminate\Database\Eloquent\Collection;

/**
 * List album media items that display on the banner.
 */
class ListAlbumMediaItemsOnBannerService
{
    public function __construct(private readonly AlbumMediaItemRepository $albumMediaItemRepository)
    {
    }

    public function execute(): Collection
    {
        return $this->albumMediaItemRepository->getAlbumMediaItemsOnBanner();
    }
}
