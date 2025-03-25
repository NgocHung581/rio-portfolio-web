<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Resources\AlbumMediaItemResource;
use App\Http\Resources\AlbumResource;
use App\Services\Album\GetHighlightAlbumsService;
use App\Services\AlbumMediaItem\ListAlbumMediaItemsOnBannerService;
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
        ListAlbumMediaItemsOnBannerService $listAlbumMediaItemsOnBannerService,
        GetHighlightAlbumsService $getHighlightAlbumsService
    ): Response|ResponseFactory {
        $albumMediaItems = $listAlbumMediaItemsOnBannerService->execute();
        $albumMediaItemsOnBanner = $albumMediaItems->map(fn($albumMediaItem) => new AlbumMediaItemResource($albumMediaItem));
        $highlightAlbums = $getHighlightAlbumsService->execute();

        return inertia('Home', [
            'albumMediaItemsOnBanner' => $albumMediaItemsOnBanner,
            'highlightAlbums' => $highlightAlbums->map(fn($album) => new AlbumResource($album)),
        ]);
    }
}
