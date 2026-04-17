<?php

declare(strict_types=1);

use App\Http\Controllers\AboutController;
use App\Http\Controllers\CinematographyController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\LocaleController;
use App\Http\Controllers\PhotographyController;
use Common\App\Http\Controllers\GetGoogleDriveFileController;
use Illuminate\Support\Facades\Route;

Route::put('/locale', LocaleController::class)->name('locale.set');

Route::get('/files/{fileName}', GetGoogleDriveFileController::class)->name('file');

Route::get('/', HomeController::class)->name('home');

Route::get('/photography', PhotographyController::class)->name('photography');

Route::get('/cinematography', CinematographyController::class)->name('cinematography');

Route::get('/about', AboutController::class)->name('about');
