<?php

declare(strict_types=1);

use App\Http\Controllers\AlbumController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\LocaleController;
use Illuminate\Support\Facades\Route;

Route::get('/', HomeController::class)->name('home');

Route::put('/locale', LocaleController::class)->name('locale.set');

Route::prefix('api')->name('api.')->group(function(): void {
    Route::get('/highlight-albums', [AlbumController::class, 'listHighlightAlbumsApi'])->name('listHighlightAlbums');
});
