<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);
    
        if (!Auth::attempt(['Email' => $request->email, 'Password' => $request->password, 'Active' => 1])) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }
    
        $user = Auth::user();
        $token = $user->createToken('AuthToken')->accessToken;
    
        return response()->json([
            'token' => $token,
            'user' => [
                'id' => $user->id,
                'FirstName' => $user->FirstName,
                'LastName' => $user->LastName,
                'Email' => $user->Email,
                'Role' => $user->Role,
                // Adjust this according to your User model
                // You can include other user information here if needed
            ]
        ]);
    }
}
