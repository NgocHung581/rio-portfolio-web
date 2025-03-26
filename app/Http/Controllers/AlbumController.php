<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\Album\ListAlbumsRequest;
use App\Http\Resources\AlbumResource;
use App\Models\Album;
use App\Services\Album\ListAlbumsService;
use Common\App\Constants\PerPage;
use Illuminate\Http\JsonResponse;
use Inertia\Response;
use Inertia\ResponseFactory;

/**
 * Controller class for album routes.
 */
class AlbumController extends Controller
{
    /**
     * Display the album list view.
     */
    public function index(ListAlbumsService $service): Response|ResponseFactory
    {
        $albums = $service->execute(PerPage::DEFAULT);

        return inertia('Album/List', [
            'albums' => AlbumResource::collection($albums),
        ]);
    }

    /**
     * List albums for API.
     */
    public function listAlbumsApi(
        ListAlbumsRequest $request,
        ListAlbumsService $service
    ): JsonResponse {
        $albums = $service->execute($request->per_page);

        return AlbumResource::collection($albums)->response();
    }

    /**
     * Display the album detail view.
     */
    public function show(Album $album): Response|ResponseFactory
    {
        if ($album->mediaItems->isEmpty()) {
            abort(404);
        }

        $album->load(['mediaItems' => fn($query) => $query->with(['mediaFile', 'videoThumbnailFile'])]);

        return inertia('Album/Detail', [
            'album' => new AlbumResource($album),
        ]);
    }
}
