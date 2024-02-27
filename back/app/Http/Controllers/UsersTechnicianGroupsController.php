<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UserTechnicianGroup;
use App\Models\User;

class UserTechnicianGroupController extends Controller
{
    public function index()
    {
        $userTechnicianGroups = UserTechnicianGroup::all();
        return response()->json($userTechnicianGroups, 200);
    }

    public function show($id)
    {
        $userTechnicianGroup = UserTechnicianGroup::find($id);
        if (!$userTechnicianGroup) {
            return response()->json(['message' => 'User-Technician Group association not found'], 404);
        }
        return response()->json($userTechnicianGroup, 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'UserID' => 'required|exists:users,UserID',
            'GroupID' => 'required|exists:technician_groups,GroupID',
        ]);

        $userTechnicianGroup = UserTechnicianGroup::create($request->all());
        return response()->json($userTechnicianGroup, 201);
    }

    public function getUsersByGroup($groupId)
    {
        $users = User::whereHas('technicianGroups', function ($query) use ($groupId) {
            $query->where('GroupID', $groupId);
        })->get();

        return response()->json($users, 200);
    }
}
