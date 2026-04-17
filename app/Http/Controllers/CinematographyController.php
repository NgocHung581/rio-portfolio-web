<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Constants\PerPage;
use App\UseCases\Category\FindCategoriesByMediaTypeUseCase;
use App\UseCases\Project\PaginateProjectsByCategoryIdUseCase;
use Common\App\Enums\MediaType;
use Common\App\Traits\NumberHelper;
use Illuminate\Http\Request;
use Illuminate\Pagination\CursorPaginator;
use Inertia\Response;
use Inertia\ResponseFactory;

/**
 * Controller class for cinematography route.
 */
class CinematographyController extends Controller
{
    use NumberHelper;

    /**
     * Display the cinematography view.
     */
    public function __invoke(
        Request $request,
        FindCategoriesByMediaTypeUseCase $findCategoriesByMediaTypeUseCase,
        PaginateProjectsByCategoryIdUseCase $paginateProjectsByCategoryIdUseCase
    ): Response|ResponseFactory {
        $categories = $findCategoriesByMediaTypeUseCase(MediaType::Video);

        if ($categories->isEmpty()) {
            $projects = new CursorPaginator([], PerPage::PROJECTS_PER_PAGE);
        } else {
            $categoryId = isset($request->category_id) ? $this->parseInt($request->category_id) : $categories->first()->id;
            $projects = $paginateProjectsByCategoryIdUseCase(PerPage::PROJECTS_PER_PAGE, $categoryId);
        }

        return inertia('Cinematography', compact('categories', 'projects'));
    }
}
