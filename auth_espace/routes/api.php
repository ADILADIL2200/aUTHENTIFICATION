<?php
use App\Http\Controllers\AvocatController;
use App\Http\Controllers\ProfilAvocatController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AvocatController::class, 'register']);

Route::get('/email/verify/{id}/{hash}', [AvocatController::class, 'verifyEmail'])
    ->middleware(['signed'])
    ->name('verification.verify');

Route::middleware('auth:sanctum')->group(function () {

    Route::get('/me', function (Request $request) {
        return response()->json($request->user()->load('avocat'));
    });

    Route::post('/profil-avocat', [ProfilAvocatController::class, 'store'])
        ->middleware('verified');
});
