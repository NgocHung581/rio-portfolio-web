<?php

declare(strict_types=1);

namespace App\UseCases\Category;

use App\Repositories\CategoryRepository;
use Common\App\Enums\MediaType;
use Illuminate\Database\Eloquent\Collection;

/**
 * The use case class for finding categories by media type.
 */
class FindCategoriesByMediaTypeUseCase
{
    public function __construct(private readonly CategoryRepository $categoryRepository)
    {
    }

    public function __invoke(MediaType $mediaType): Collection
    {
        return $this->categoryRepository->findManyByMediaType($mediaType);
    }
}
