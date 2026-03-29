<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\UseCases\MediaItem\GetMediaItemsOnBannerUseCase;
use App\UseCases\Project\GetHighlightedProjectsUseCase;
use Inertia\Response;
use Inertia\ResponseFactory;

/**
 * Controller class for home route.
 */
class HomeController extends Controller
{
    /**
     * Display the home view.
     */
    public function __invoke(
        GetMediaItemsOnBannerUseCase $getMediaItemsOnBannerUseCase,
        GetHighlightedProjectsUseCase $getHighlightedProjectsUseCase
    ): Response|ResponseFactory {
        $mediaItemsOnBanner = $getMediaItemsOnBannerUseCase();
        $highlightedProjects = $getHighlightedProjectsUseCase();

        return inertia('Home', compact('mediaItemsOnBanner', 'highlightedProjects'));
    }
}
