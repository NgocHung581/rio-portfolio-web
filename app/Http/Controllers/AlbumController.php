<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\Album\ListHighlightAlbumsRequest;
use App\Http\Resources\AlbumResource;
use App\Services\Album\ListHighlightAlbumsService;
use Illuminate\Http\JsonResponse;

/**
 * Controller class for album routes.
 */
class AlbumController extends Controller
{
    /**
     * List highlighted albums for API.
     */
    public function listHighlightAlbumsApi(
        ListHighlightAlbumsRequest $request,
        ListHighlightAlbumsService $listHighlightAlbumsService
    ): JsonResponse {
        $highlightAlbums = $listHighlightAlbumsService->execute($request->per_page);

        return AlbumResource::collection($highlightAlbums)->response();
    }
}
