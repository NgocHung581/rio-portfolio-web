<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use Inertia\Response;
use Inertia\ResponseFactory;

class HomeController extends Controller
{
    /**
     * Display the home view.
     */
    public function __invoke(): Response|ResponseFactory
    {
        return inertia('Home');
    }
}
