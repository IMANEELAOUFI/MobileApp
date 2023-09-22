<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});


Route::get('/sendIceCandidate', function () {
    event(new \App\Events\sendIceCandidate());
    return null;
});
Route::get('/sendAnswer', function () {
    event(new \App\Events\sendAnswer());
    return null;
});