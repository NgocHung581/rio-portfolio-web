<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Models\Category;
use Common\App\Enums\MediaType;
use Common\App\Enums\WebVisibility;
use Common\App\Repositories\CategoryRepository as CommonCategoryRepository;
use Illuminate\Database\Eloquent\Collection;

/**
 * The repository class for category.
 */
class CategoryRepository extends CommonCategoryRepository
{
    /**
     * Find many categories by media type.
     */
    public function findManyByMediaType(MediaType $mediaType): Collection
    {
        return Category::query()
            ->with([
                'projects' => fn ($query) => $query->where('web_visibility', WebVisibility::Public)->orderByDesc('id'),
            ])
            ->whereHas('projects')
            ->where('media_type', $mediaType)
            ->orderByDesc('id')
            ->get();
    }
}
