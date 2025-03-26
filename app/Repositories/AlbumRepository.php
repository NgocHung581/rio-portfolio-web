<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Models\Album;
use Common\App\Repositories\AlbumRepository as CommonAlbumRepository;
use Illuminate\Database\Eloquent\Collection;

/**
 * Repository class for `Album` model.
 */
class AlbumRepository extends CommonAlbumRepository
{
    /**
     * Retrieve all albums that are highlighted.
     */
    public function getHighlightAlbums(): Collection
    {
        return Album::query()
            ->with('thumbnail')
            ->where('is_highlight', true)
            ->whereHas('mediaItems')
            ->get();
    }
}
