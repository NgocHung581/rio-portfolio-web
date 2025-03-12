<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Resources\AlbumMediaItemResource;
use App\Http\Resources\AlbumResource;
use App\Services\Album\ListHighlightAlbumsService;
use App\Services\AlbumMediaItem\ListAlbumMediaItemsOnBannerService;
use Common\App\Constants\PerPage;
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
        ListHighlightAlbumsService $listHighlightAlbumsService
    ): Response|ResponseFactory {
        $albumMediaItems = $listAlbumMediaItemsOnBannerService->execute();
        $albumMediaItemsOnBanner = $albumMediaItems->map(fn($albumMediaItem) => new AlbumMediaItemResource($albumMediaItem));
        $highlightAlbums = $listHighlightAlbumsService->execute(PerPage::DEFAULT);

        return inertia('Home', [
            'albumMediaItemsOnBanner' => $albumMediaItemsOnBanner,
            'highlightAlbums' => AlbumResource::collection($highlightAlbums),
        ]);
    }
}
