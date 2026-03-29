<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\UseCases\Category\FindCategoriesByMediaTypeUseCase;
use Common\App\Enums\MediaType;
use Inertia\Response;
use Inertia\ResponseFactory;

/**
 * Controller class for cinematography route.
 */
class CinematographyController extends Controller
{
    /**
     * Display the cinematography view.
     */
    public function __invoke(
        FindCategoriesByMediaTypeUseCase $findCategoriesByMediaTypeUseCase
    ): Response|ResponseFactory {
        $categories = $findCategoriesByMediaTypeUseCase(MediaType::Video);

        return inertia('Cinematography', compact('categories'));
    }
}
