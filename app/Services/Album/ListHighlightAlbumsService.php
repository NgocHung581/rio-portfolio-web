<?php

declare(strict_types=1);

namespace App\Services\Album;

use App\Repositories\AlbumRepository;
use Illuminate\Pagination\LengthAwarePaginator;

/**
 * Retrieve all albums that are highlighted.
 */
class ListHighlightAlbumsService
{
    public function __construct(private readonly AlbumRepository $albumRepository)
    {
    }

    public function execute(int $perPage): LengthAwarePaginator
    {
        return $this->albumRepository->findHighlightAlbums($perPage);
    }
}
