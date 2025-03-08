<?php

declare(strict_types=1);

use App\Http\Controllers\HomeController;
use App\Http\Controllers\LocaleController;
use Common\App\Http\Middleware\SetLocale;
use Illuminate\Support\Facades\Route;

Route::middleware(SetLocale::class)->group(function(): void {
    Route::get('/', HomeController::class)->name('home');
    Route::put('/locale', LocaleController::class)->name('locale.set');
});
