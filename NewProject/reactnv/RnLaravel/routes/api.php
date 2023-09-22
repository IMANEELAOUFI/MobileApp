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


// Update User
Route::middleware('auth:user')->group(function () {
    Route::apiResource('user', UserController::class)->only(['index', 'update']);
    Route::post('/users/{id}', [UserController::class, 'destroy']);
    Route::put('/users/{id}', [UserController::class, 'update']);
}); 

//Voice Call Routes

Route::middleware('auth:user')->group(function () {
    // Route pour démarrer un appel vidéo
    Route::post('voice-call/start', [VoiceCallController::class, 'startCall'])->name('voice-call.start');
    // Route pour accepter un appel vidéo
    Route::post('voice-call/accept/{callId}', [VoiceCallController::class, 'acceptCall'])->name('voice-call.accept');
    // Route pour réfuser un appel vidéo
    Route::post('voice-call/decline/{callId}', [VoiceCallController::class, 'declineCall'])->name('voice-call.decline');
    // Route pour rejoindre un appel vidéo
    Route::post('voice-call/join/{callId}', [VoiceCallController::class, 'joinCall'])->name('voice-call.join');
    // Route pour terminer un appel vidéo
    Route::post('voice-call/end/{callId}', [VoiceCallController::class, 'endCall'])->name('voice-call.end');
    // Endpoint pour envoyer une offre WebRTC (initiateur)
    Route::post('voice-call/send-offer/{callId}', [VoiceCallController::class, 'sendOffer'])->name('voice-call.send-offer');
    // Endpoint pour envoyer une réponse WebRTC (destinataire)
    Route::post('voice-call/send-answer/{callId}', [VoiceCallController::class, 'sendAnswer'])->name('voice-call.send-answer');
    // Endpoint pour envoyer un candidat ICE WebRTC (initiateur ou destinataire)
    Route::post('voice-call/send-ice-candidate/{callId}', [VoiceCallController::class, 'sendIceCandidate'])->name('voice-call.send-ice-candidate');
});



