<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


//Get all tickets
Route::get('tickets','TicketController@getTicket');

//Get speic ticket detail
Route::get('ticket/{id}','TicketController@getTicketById');

//Add ticket
Route::post('addTicket','TicketController@addTicket');

//Update Ticket
Route::get('updateTicket/{id}','TicketController@updateTicket');

//Delete ticket
Route::delete('deleteTicket/{id}','TicketController@deleteTicket');