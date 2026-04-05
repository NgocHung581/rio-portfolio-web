<?php

declare(strict_types=1);

use App\Http\Controllers\AboutController;
use App\Http\Controllers\AlbumController;
use App\Http\Controllers\CinematographyController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\LocaleController;
use App\Http\Controllers\PhotographyController;
use Illuminate\Support\Facades\Route;

Route::put('/locale', LocaleController::class)->name('locale.set');

Route::get('/', HomeController::class)->name('home');

Route::get('/photography', PhotographyController::class)->name('photography');

Route::get('/cinematography', CinematographyController::class)->name('cinematography');

Route::get('/about', AboutController::class)->name('about');

Route::prefix('projects')->controller(AlbumController::class)->name('albums.')
    ->group(function(): void {
        Route::get('/', 'index')->name('index');
        Route::get('/{album:slug}', 'show')->name('show');
    });

Route::prefix('api')->name('api.')->group(function(): void {
    Route::controller(AlbumController::class)->group(function(): void {
        Route::get('/projects', 'listAlbumsApi')->name('listAlbums');
    });
});
