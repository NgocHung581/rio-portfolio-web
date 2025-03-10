<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use Inertia\Response;
use Inertia\ResponseFactory;

/**
 * Controller class for about route.
 */
class AboutController extends Controller
{
    /**
     * Display the about view.
     */
    public function __invoke(): Response|ResponseFactory
    {
        return inertia('About');
    }
}
