<?php

declare(strict_types=1);

namespace App\UseCases\Project;

use App\Repositories\ProjectRepository;
use Illuminate\Contracts\Pagination\CursorPaginator;

/**
 * The use case class for paginating projects by category ID.
 */
class PaginateProjectsByCategoryIdUseCase
{
    public function __construct(private readonly ProjectRepository $projectRepository)
    {
    }

    public function __invoke(int $perPage, int $categoryId): CursorPaginator
    {
        return $this->projectRepository->paginateByCategoryId($perPage, $categoryId);
    }
}
