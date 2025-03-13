<?php

declare(strict_types=1);

namespace App\Services\AlbumMediaItem;

use App\Repositories\AlbumMediaItemRepository;
use Illuminate\Pagination\LengthAwarePaginator;

/**
 * Service class for listing album media items.
 */
class ListAlbumMediaItemsService
{
    public function __construct(private readonly AlbumMediaItemRepository $albumMediaItemRepository)
    {
    }

    public function execute(int $albumId, int $perPage): LengthAwarePaginator
    {
        return $this->albumMediaItemRepository->findAlbumMediaItems(
            $albumId,
            $perPage,
            ['album.thumbnail', 'mediaFile', 'videoThumbnailFile']
        );
    }
}
