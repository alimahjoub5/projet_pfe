<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Ticket;
use Illuminate\Support\Facades\Mail;
use App\Mail\AccountCreated;
use App\Mail\TechnicianAssignedToTicket;

use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;


class UserController extends Controller
{
    public function index()
    {
        $users = User::all();
        return response()->json($users, 200);
    }

    public function show($id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
        return response()->json($user, 200);
    }


    public function store(Request $request)
    {
        $request->validate([
            'FirstName' => 'required|string',
            'LastName' => 'required|string',
            'Email' => 'required|email|unique:users',
            'Username' => 'required|string|unique:users',
            'Password' => 'required|string|min:6', // Minimum 6 caractères pour le mot de passe
            'Role' => 'required|string|in:Admin,Technician,Manager',
        ]);
    
        // Récupérer le mot de passe depuis la requête
        $mdp = $request->input('Password');
    
        // Hasher le mot de passe
        $data = $request->all();
        $data['Password'] = Hash::make($mdp);
    
        // Créer l'utilisateur
        $user = User::create($data);
    
        // Envoyer l'e-mail après avoir créé l'utilisateur
        Mail::to($user->Email)->send(new AccountCreated($user, $mdp));
    
        // Retourner une réponse JSON avec l'utilisateur créé
        return response()->json($user, 201);
    }
    
    


    public function update(Request $request, $UserId)
    {
        $user = User::find($UserId);
    
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
    
        $request->validate([
            'FirstName' => 'string',
            'LastName' => 'string',
            'Email' => 'email|unique:users,Email,' . $user->UserID . ',UserID',
            'Username' => 'string|unique:users,Username,' . $user->UserID . ',UserID',
            // Ajoutez d'autres règles de validation au besoin
        ]);
    
        $request->merge([
            'ModifiedBy' => Auth::id(),
            'ModifiedOn' => now(),
        ]);
    
    
        $user->update($request->all());
    
        return response()->json($user, 200);
    }
    
    

    

    public function destroy($id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $user->delete();
        return response()->json(null, 204);
    }



    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');
    
        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $token = $user->createToken('API Token')->plainTextToken;
    
            return response()->json([
                'token' => $token,
                'UserID' => $user->UserID,
                'User' => $user->FirstName.' '.$user->LastName,
                'Role' => $user->Role,
            ]);
        }
    
        return response()->json(['message' => 'Unauthorized'], 401);
    }

    public function toggleStatus($id)
    {
        $user = User::findOrFail($id);
    
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
    
        $user->Active = !$user->Active;
        $user->save();
    
        return response()->json(['message' => 'User status updated successfully'], 200);
    }

    public function getTechnicien()
    {
        // Récupérer les techniciens depuis la base de données
        $technicians = User::where('Role', 'Technician')->get();

        // Retourner les techniciens au format JSON
        return response()->json($technicians);
    }

    public function getUsername($userID) {
        $user = User::find($userID);
        
        if ($user) {
            return response()->json(['username' => $user->Username], 200);
        } else {
            return response()->json(['error' => 'User not found'], 404);
        }
    }

    public function assignTechnicianToTicket(Request $request, $ticketId)
{
    // Validation des données de la requête
    $request->validate([
        'UserID' => 'required|exists:users,UserID' // Assurez-vous que 'UserID' est le bon nom de champ dans votre base de données
    ]);

    // Recherche du ticket
    $ticket = Ticket::findOrFail($ticketId);

    // Attribution du technicien au ticket
    $ticket->update(['AssigneeID' => $request->UserID]);

    // Recherche du technicien assigné
    $technician = User::findOrFail($request->UserID);

    // Vérifier si la mise à jour a réussi
    if ($ticket->wasChanged()) {
        // Envoyer l'e-mail de notification
        Mail::to($technician->Email)->send(new TechnicianAssignedToTicket($ticket, $technician));

        // Réponse JSON si la mise à jour a réussi
        return response()->json(['message' => 'Technician assigned to ticket successfully'], 200);
    } else {
        // Réponse JSON si la mise à jour a échoué
        return response()->json(['message' => 'Failed to assign technician to ticket'], 500);
    }
}
    



public function resetPasswordRequest(Request $request)
{
    $request->validate([
        'email' => 'required|email',
    ]);

    $response = Password::sendResetLink($request->only('email'));

    return $response == Password::RESET_LINK_SENT
        ? response()->json(['message' => 'Email sent with password reset link'], 200)
        : response()->json(['message' => 'Unable to send reset link'], 500);
}



public function resetPassword(Request $request, $token)
{
    $request->validate([
        'email' => 'required|email',
        'password' => 'required|confirmed|min:6',
        'token' => 'required|string',
    ]);

    $response = Password::reset($request->only('email', 'password', 'password_confirmation', 'token'), function ($user, $password) {
        $user->forceFill([
            'password' => Hash::make($password)
        ])->save();
    });

    return $response == Password::PASSWORD_RESET
                ? response()->json(['message' => 'Password reset successfully'], 200)
                : response()->json(['message' => 'Unable to reset password'], 500);
}

    
}