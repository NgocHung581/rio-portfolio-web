<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Models\Project;
use Common\App\Enums\WebVisibility;
use Common\App\Repositories\ProjectRepository as CommonProjectRepository;
use Illuminate\Contracts\Pagination\CursorPaginator;
use Illuminate\Database\Eloquent\Collection;

/**
 * The repository class for project.
 */
class ProjectRepository extends CommonProjectRepository
{
    /**
     * Get all highlighted projects.
     */
    public function getHighlights(): Collection
    {
        return Project::query()->public()->where('is_highlight', true)->orderByDesc('id')->get();
    }

    /**
     * Paginate projects by category ID.
     */
    public function paginateByCategoryId(int $perPage, int $categoryId): CursorPaginator
    {
        return Project::query()
            ->where('category_id', $categoryId)
            ->where('web_visibility', WebVisibility::Public)
            ->orderByDesc('id')
            ->cursorPaginate($perPage);
    }
}
