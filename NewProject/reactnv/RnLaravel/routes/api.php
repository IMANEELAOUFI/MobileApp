<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Auth\LoginController;
use App\Http\Controllers\Api\Auth\RegisterController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\ChatMessageController;
use App\Http\Controllers\EmailVerificationController;

Route::middleware('auth:api')->group(function () {
    // Protected Routes

    // Email Verification

    // Logout
    Route::post('logout', [LoginController::class, 'logout'])->name('logout');

    // Other protected routes...


});

// Public Routes

// Register
Route::post('register', [RegisterController::class, 'register'])->name('register');

Route::get('email/verify/{id}/{hash}', [EmailVerificationController::class, 'verify'])->name('verification.verify');
// Login
Route::post('login', [LoginController::class, 'login'])->name('login');

// Other public routes...


// Protected Routes outside the middleware group

// Chat Routes
Route::middleware('auth:user')->group(function () {
    Route::apiResource('chat', ChatController::class)->only(['index', 'store', 'show']);
    Route::post('group',[ChatController::class, 'group'])->name('group_chat');
    Route::post('group/{chatId}',[ChatController::class, 'leaveGroup'])->name('leave_group');
    Route::post('chat_message/{chatId}', [ChatMessageController::class, 'store'])->name('chat_message');
    Route::post('chat_message/{chatId}/upload', [ChatMessageController::class, 'upload'])->name('message');
    Route::get('chat_message/{chatId}/{page}', [ChatMessageController::class, 'index'])->name('chat_message.index');
    Route::get('saved', [ChatMessageController::class, 'savedmessages'])->name('saved');
    
});

// User Routes
Route::middleware('auth:user')->group(function () {
    Route::apiResource('user', UserController::class)->only(['index']);
    Route::post('/users/{id}', [UserController::class, 'destroy']);

});
