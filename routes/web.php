<?php

declare(strict_types=1);

use App\Http\Controllers\AboutController;
use App\Http\Controllers\AlbumController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\LocaleController;
use Illuminate\Support\Facades\Route;

Route::get('/', HomeController::class)->name('home');

Route::get('/about', AboutController::class)->name('about');

Route::put('/locale', LocaleController::class)->name('locale.set');

Route::prefix('projects')->controller(AlbumController::class)->name('albums.')
    ->group(function(): void {
        Route::get('/', 'index')->name('index');
        Route::get('/{album:slug}', 'show')->name('show');
    });

Route::prefix('api')->name('api.')->group(function(): void {
    Route::controller(AlbumController::class)->group(function(): void {
        Route::get('/highlight-projects', 'listHighlightAlbumsApi')->name('listHighlightAlbums');
        Route::get('/projects', 'listAlbumsApi')->name('listAlbums');
    });
});
