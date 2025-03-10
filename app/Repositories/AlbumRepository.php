<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Models\Album;
use Common\App\Repositories\AlbumRepository as CommonAlbumRepository;
use Illuminate\Pagination\LengthAwarePaginator;

/**
 * Repository class for `Album` model.
 */
class AlbumRepository extends CommonAlbumRepository
{
    /**
     * Retrieve all albums that are highlighted.
     */
    public function findHighlightAlbums(int $perPage): LengthAwarePaginator
    {
        return Album::query()
            ->with('thumbnail')
            ->where('is_highlight', true)
            ->paginate($perPage);
    }
}
