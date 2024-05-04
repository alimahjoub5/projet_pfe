<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TicketController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\EquipmentTypeController;
use App\Http\Controllers\PriorityController;
use App\Http\Controllers\TechnicianGroupController;
use App\Http\Controllers\UsersTechnicianGroupsController;
use App\Http\Controllers\TicketTaskController;
use App\Http\Controllers\TicketStatusController;
use App\Http\Controllers\ChatMessageController;
// ----------Gestion De stock---------------------------------



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
Route::post('login', [UserController::class, 'login']);
// routes/api.php

use App\Http\Controllers\GestionStocks\PieceController;

Route::prefix('pieces')->group(function () {
    Route::get('/', [PieceController::class, 'index']);
    Route::post('/', [PieceController::class, 'store']);
    Route::get('/{piece}', [PieceController::class, 'show']);
    Route::put('/{piece}', [PieceController::class, 'update']);
    Route::delete('/{piece}', [PieceController::class, 'destroy']);
});
// stocks ---------------------------------------------------------

use App\Http\Controllers\GestionStocks\StockPieceController;
    Route::prefix('stock-pieces')->group(function () {
    Route::get('/', [StockPieceController::class, 'index']);
    Route::post('/', [StockPieceController::class, 'store']);
    Route::get('/{stockPiece}', [StockPieceController::class, 'show']);
    Route::put('/{stockPiece}', [StockPieceController::class, 'update']);
    Route::delete('/{stockPiece}', [StockPieceController::class, 'destroy']);
});
//commandeEnAttente---------------------------------------------------------
use App\Http\Controllers\GestionStocks\CommandeEnAttenteController;

Route::get('/commandes', [CommandeEnAttenteController::class, 'index']);
Route::get('/commandes/{id}', [CommandeEnAttenteController::class, 'show']);
Route::post('/commandes', [CommandeEnAttenteController::class, 'store']);
Route::put('/commandes/{id}', [CommandeEnAttenteController::class, 'update']);
Route::delete('/commandes/{id}', [CommandeEnAttenteController::class, 'destroy']);

use Illuminate\Support\Facades\File;

Route::get('pdf/{fileName}', function ($fileName) {
    $filePath = storage_path('app/pdf/' . $fileName);



    // Lecture du fichier PDF
    $file = File::get($filePath);

    // Création d'une réponse HTTP avec le contenu du fichier PDF
    $response = new \Illuminate\Http\Response($file, 200);

    // Spécification du type de contenu comme application/pdf
    $response->header('Content-Type', 'application/pdf');

    // Retourne la réponse HTTP avec le fichier PDF
    return $response;
});



//location------------------------------------------------------------------------
use App\Http\Controllers\GestionStocks\LocationController;

Route::get('/location', [LocationController::class, 'index']);

Route::get('/location/{id}', [LocationController::class, 'show']);
Route::post('/location', [LocationController::class, 'store']);
Route::put('/location/{id}', [LocationController::class, 'update']);
Route::delete('/location/{id}', [LocationController::class, 'destroy']);
//founisseur --------------------------------------------------------------------
use App\Http\Controllers\GestionStocks\FournisseurController;

Route::get('/fournisseurs', [FournisseurController::class, 'index']);
Route::get('/fournisseurs/{id}', [FournisseurController::class, 'show']);
Route::post('/fournisseurs', [FournisseurController::class, 'store']);
Route::put('/fournisseurs/{id}', [FournisseurController::class, 'update']);
Route::delete('/fournisseurs/{id}', [FournisseurController::class, 'destroy']);
Route::get('fournisseurs/piece/{pieceId}', [FournisseurController::class, 'getFournisseursByPiece']);

//--------------------------------------------------------------------------------------
use App\Http\Controllers\GestionStocks\UtilisationPiecesController;

Route::get('/utilisation', [UtilisationPiecesController::class, 'index']);
Route::get('/utilisation/{id}', [UtilisationPiecesController::class, 'show']);
Route::post('/utilisation', [UtilisationPiecesController::class, 'store']);
Route::put('/utilisation/{id}', [UtilisationPiecesController::class, 'update']);
Route::delete('/utilisation/{id}', [UtilisationPiecesController::class, 'destroy']);
//---------------------------------------------------------------------------------------


Route::middleware('auth:sanctum')->group(function () {
    // Routes protégées
    Route::get('/user', function (Request $request) {
        return $request->user();
    });


Route::get('tickets', [TicketController::class, 'getTicket']);
Route::get('ticket/{id}', [TicketController::class, 'getTicketById']);
Route::post('addTicket', [TicketController::class, 'addTicket']);
Route::put('updateTicket/{id}', [TicketController::class, 'updateTicket']);
Route::delete('deleteTicket/{id}', [TicketController::class, 'deleteTicket']);
Route::get('ticket/{ticketID}/name', [TicketController::class, 'getTicketName']);
Route::post('tickets/{ticketId}/assign-to-group', [TicketController::class, 'assignTicketToGroup']);

// user controller routes


Route::get('users', [UserController::class, 'index']);
Route::get('users/{id}', [UserController::class, 'show']);
Route::post('users', [UserController::class, 'store']);
Route::put('users/{id}', [UserController::class, 'update']);
Route::delete('users/{id}', [UserController::class, 'destroy']);
Route::put('/users/{userId}/status', [UserController::class, 'toggleStatus']);
Route::get('technicians', [UserController::class,'getTechnicien']);
Route::get('users/{userID}/username', [UserController::class, 'getUsername']);
Route::put('users/tickets/{ticketId}/assign-technician', [UserController::class, 'assignTechnicianToTicket']);


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


Route::get('/technician-groups', [TechnicianGroupController::class, 'index']);
Route::get('/technician-groups/{id}', [TechnicianGroupController::class, 'show']);
Route::post('/technician-groups', [TechnicianGroupController::class, 'store']);
Route::put('/technician-groups/{id}', [TechnicianGroupController::class, 'update']);
Route::delete('/technician-groups/{id}', [TechnicianGroupController::class, 'destroy']);
Route::get('/group/{id}', [TechnicianGroupController::class, 'getGroupNameById']);


// tickets status api


Route::get('/ticket-statuses', [TicketStatusController::class, 'index']);
Route::get('/ticket-statuses/{id}', [TicketStatusController::class, 'show']);
Route::post('/ticket-statuses', [TicketStatusController::class, 'store']);
Route::put('/ticket-statuses/{id}', [TicketStatusController::class, 'update']);
Route::delete('/ticket-statuses/{id}', [TicketStatusController::class, 'destroy']);
Route::get('/ticket-statuses/{statusCodeID}/name', [TicketStatusController::class, 'getName']);


// tickets task api 


Route::get('/ticket-tasks', [TicketTaskController::class, 'index']);
Route::get('/ticket-tasks/{id}', [TicketTaskController::class, 'show']);
Route::post('/ticket-tasks', [TicketTaskController::class, 'store']);
Route::put('/ticket-tasks/{id}', [TicketTaskController::class, 'update']);
Route::delete('/ticket-tasks/{id}', [TicketTaskController::class, 'destroy']);

//user technician groups api 


Route::get('/user-technician-groups', [UsersTechnicianGroupsController::class, 'index']);
Route::get('/user-technician-groups/{id}', [UsersTechnicianGroupsController::class, 'show']);
Route::post('/user-technician-groups/assign-user', [UsersTechnicianGroupsController::class, 'assignUserToGroup']);
Route::post('/user-technician-groups/remove-user', [UsersTechnicianGroupsController::class, 'removeUserFromGroup']);
Route::get('/technician-groups/{groupId}/users', [UsersTechnicianGroupsController::class, 'getUsersInGroup']);





});

Route::get('/check-conversation/{userId1}/{userId2}', [ChatMessageController::class,'checkConversation']);
Route::post('/chat/send-message', [ChatMessageController::class,'sendMessage']);
Route::get('/chat/get-messages/{senderId}/{recipientId}', [ChatMessageController::class,'getMessages']);
