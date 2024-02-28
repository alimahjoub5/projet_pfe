<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

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
       /* $request->validate([
            'FirstName' => 'required|string',
            'LastName' => 'required|string',
            'Email' => 'required|email|unique:users',
            'Username' => 'required|string|unique:users',
            'Password' => 'required|string',
            'Role' => 'required|string|in:Admin,Technician,Manager',
            'Active' => 'required|boolean',
            // Ajoutez d'autres règles de validation au besoin
        ]);*/

        $user = User::create($request->all());
        return response()->json($user, 201);
    }

    public function update(Request $request, $id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $request->validate([
            'FirstName' => 'string',
            'LastName' => 'string',
            'Email' => 'email|unique:users,Email,' . $id,
            'Username' => 'string|unique:users,Username,' . $id,
            'Password' => 'string',
            'Role' => 'string|in:Admin,Technician,Manager',
            'Active' => 'boolean',
            // Ajoutez d'autres règles de validation au besoin
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
}
