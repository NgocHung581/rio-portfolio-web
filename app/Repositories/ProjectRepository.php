<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Models\Project;
use Common\App\Repositories\ProjectRepository as CommonProjectRepository;
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
}
