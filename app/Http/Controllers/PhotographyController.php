<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\UseCases\Category\FindCategoriesByMediaTypeUseCase;
use Common\App\Enums\MediaType;
use Inertia\Response;
use Inertia\ResponseFactory;

/**
 * Controller class for photography route.
 */
class PhotographyController extends Controller
{
    /**
     * Display the photography view.
     */
    public function __invoke(
        FindCategoriesByMediaTypeUseCase $findCategoriesByMediaTypeUseCase
    ): Response|ResponseFactory {
        $categories = $findCategoriesByMediaTypeUseCase(MediaType::Image);

        return inertia('Photography', compact('categories'));
    }
}
