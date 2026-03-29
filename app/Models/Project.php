<?php

declare(strict_types=1);

namespace App\Models;

use Common\App\Enums\WebVisibility;
use Common\App\Models\Project as CommonProject;
use Illuminate\Database\Eloquent\Builder;

/**
 * The model class for project.
 */
class Project extends CommonProject
{
    /**
     * Scope a query to only include public projects.
     */
    protected function scopePublic(Builder $query): void
    {
        $query->where('web_visibility', WebVisibility::Public);
    }
}
