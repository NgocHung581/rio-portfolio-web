<?php

declare(strict_types=1);

namespace App\Services\Album;

use App\Repositories\AlbumRepository;
use Illuminate\Database\Eloquent\Collection;

/**
 * Retrieve all albums that are highlighted.
 */
class GetHighlightAlbumsService
{
    public function __construct(private readonly AlbumRepository $albumRepository)
    {
    }

    public function execute(): Collection
    {
        return $this->albumRepository->getHighlightAlbums();
    }
}
