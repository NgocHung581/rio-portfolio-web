<?php

declare(strict_types=1);

namespace App\Services\Album;

use App\Repositories\AlbumRepository;
use Illuminate\Pagination\LengthAwarePaginator;

/**
 * Service class for listing albums with pagination.
 */
class ListAlbumsService
{
    public function __construct(private readonly AlbumRepository $albumRepository)
    {
    }

    /**
     * Execute the service.
     */
    public function execute(int $perPage): LengthAwarePaginator
    {
        return $this->albumRepository->findWithPagination(
            perPage: $perPage,
            relations: ['thumbnail'],
            withTrashed: false
        );
    }
}
