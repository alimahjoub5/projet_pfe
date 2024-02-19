<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;

class UserController extends Controller
{
    // Afficher la liste des utilisateurs
    public function index()
    {
        $users = User::all();
        return response()->json($users);
    }

    // Afficher un utilisateur spécifique
    public function show($id)
    {
        $user = User::findOrFail($id);
        return response()->json($user);
    }

    // Créer un nouvel utilisateur
    public function store(Request $request)
    {
        $request->validate([
            'FirstName' => 'required|max:50',
            'LastName' => 'required|max:50',
            'Email' => 'required|email|unique:users|max:100',
            'Username' => 'required|unique:users|max:50',
            'Password' => 'required|max:100',
            'Role' => 'required|in:Admin,Technician,Manager',
            'Active' => 'required|boolean',
            'CreatedOn' => 'required|date',
            'CreatedBy' => 'required|integer',
        ]);

        $user = User::create($request->all());

        return response()->json($user, 201);
    }

    // Mettre à jour un utilisateur existant
    public function update(Request $request, $id)
    {
        $request->validate([
            'FirstName' => 'required|max:50',
            'LastName' => 'required|max:50',
            'Email' => 'required|email|max:100|unique:users,Email,'.$id,
            'Username' => 'required|max:50|unique:users,Username,'.$id,
            'Password' => 'required|max:100',
            'Role' => 'required|in:Admin,Technician,Manager',
            'Active' => 'required|boolean',
            'CreatedOn' => 'required|date',
            'CreatedBy' => 'required|integer',
        ]);

        $user = User::findOrFail($id);
        $user->update($request->all());

        return response()->json($user, 200);
    }

    // Supprimer un utilisateur
    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return response()->json(null, 204);
    }
}
