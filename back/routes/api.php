<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TicketController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\EquipmentTypeController;
use App\Http\Controllers\PriorityController;
use App\Http\Controllers\AuthController;


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

Route::group([
    'middleware' => 'api',
], function () {

    Route::post('signup', [AuthController::class, 'signup']);

    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('me', 'AuthController@me');
    Route::post('sendPasswordResetLink', 'ResetPasswordController@sendEmail');
    Route::post('resetPassword', 'ChangePasswordController@process');
});

//ticket routes

Route::get('tickets', [TicketController::class, 'getTicket']);
Route::get('ticket/{id}', [TicketController::class, 'getTicketById']);
Route::post('addTicket', [TicketController::class, 'addTicket']);
Route::put('updateTicket/{id}', [TicketController::class, 'updateTicket']);
Route::delete('deleteTicket/{id}', [TicketController::class, 'deleteTicket']);

// user controller routes

Route::get('users', [UserController::class, 'index']);
Route::get('users/{id}', [UserController::class, 'show']);
Route::post('users', [UserController::class, 'store']);
Route::put('users/{id}', [UserController::class, 'update']);
Route::delete('users/{id}', [UserController::class, 'destroy']);


// equipement type api routes


Route::get('equipment-types', [EquipmentTypeController::class, 'index']);
Route::get('equipment-types/{id}', [EquipmentTypeController::class, 'show']);
Route::post('equipment-types', [EquipmentTypeController::class, 'store']);
Route::put('equipment-types/{id}', [EquipmentTypeController::class, 'update']);
Route::delete('equipment-types/{id}', [EquipmentTypeController::class, 'destroy']);
Route::get('equipment/{id}/name', [EquipmentTypeController::class, 'getEquipmentName']);


// priorities controllers


Route::get('/priorities', [PriorityController::class, 'index']);
Route::get('/priorities/{id}', [PriorityController::class, 'show']);
Route::post('/priorities', [PriorityController::class, 'store']);
Route::put('/priorities/{id}', [PriorityController::class, 'update']);
Route::delete('/priorities/{id}', [PriorityController::class, 'destroy']);
Route::get('priorities/{id}/name', [PriorityController::class, 'getPriorityName']);




// techniciens groups

use App\Http\Controllers\TechnicianGroupController;

Route::get('/technician-groups', [TechnicianGroupController::class, 'index']);
Route::get('/technician-groups/{id}', [TechnicianGroupController::class, 'show']);
Route::post('/technician-groups', [TechnicianGroupController::class, 'store']);
Route::put('/technician-groups/{id}', [TechnicianGroupController::class, 'update']);
Route::delete('/technician-groups/{id}', [TechnicianGroupController::class, 'destroy']);


// tickets status api

use App\Http\Controllers\TicketStatusController;

Route::get('/ticket-statuses', [TicketStatusController::class, 'index']);
Route::get('/ticket-statuses/{id}', [TicketStatusController::class, 'show']);
Route::post('/ticket-statuses', [TicketStatusController::class, 'store']);
Route::put('/ticket-statuses/{id}', [TicketStatusController::class, 'update']);
Route::delete('/ticket-statuses/{id}', [TicketStatusController::class, 'destroy']);


// tickets task api 

use App\Http\Controllers\TicketTaskController;

Route::get('/ticket-tasks', [TicketTaskController::class, 'index']);
Route::get('/ticket-tasks/{id}', [TicketTaskController::class, 'show']);
Route::post('/ticket-tasks', [TicketTaskController::class, 'store']);
Route::put('/ticket-tasks/{id}', [TicketTaskController::class, 'update']);
Route::delete('/ticket-tasks/{id}', [TicketTaskController::class, 'destroy']);

//user technician groups api 

use App\Http\Controllers\UsersTechnicianGroupsController;

Route::get('/user-technician-groups', [UsersTechnicianGroupsController::class, 'index']);
Route::get('/user-technician-groups/{id}', [UsersTechnicianGroupsController::class, 'show']);
Route::post('/user-technician-groups/assign-user', [UsersTechnicianGroupsController::class, 'assignUserToGroup']);
Route::post('/user-technician-groups/remove-user', [UsersTechnicianGroupsController::class, 'removeUserFromGroup']);
Route::get('/technician-groups/{groupId}/users', [UsersTechnicianGroupsController::class, 'getUsersInGroup']);
