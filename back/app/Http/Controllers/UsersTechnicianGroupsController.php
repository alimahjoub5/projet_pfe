<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TechnicianGroup;
use App\Models\User;

class UsersTechnicianGroupsController extends Controller
{
    public function index()
    {
        $usersTechnicianGroups = TechnicianGroup::with('users')->get();
        return response()->json($usersTechnicianGroups, 200);
    }

    public function show($groupId)
    {
        $group = TechnicianGroup::with('users')->find($groupId);
        if (!$group) {
            return response()->json(['message' => 'Technician group not found'], 404);
        }
        return response()->json($group, 200);
    }

    public function assignUserToGroup(Request $request)
    {
        $request->validate([
            'UserID' => 'required|exists:users,UserID',
            'GroupID' => 'required|exists:technician_groups,GroupID',
        ]);

        $group = TechnicianGroup::find($request->GroupID);
        $group->users()->attach($request->UserID);

        return response()->json(['message' => 'User assigned to group successfully'], 201);
    }

    public function removeUserFromGroup(Request $request)
    {
        $request->validate([
            'UserID' => 'required|exists:users,UserID',
            'GroupID' => 'required|exists:technician_groups,GroupID',
        ]);

        $group = TechnicianGroup::find($request->GroupID);
        $group->users()->detach($request->UserID);

        return response()->json(['message' => 'User removed from group successfully'], 200);
    }

    public function getUsersInGroup($groupId)
    {
        $group = TechnicianGroup::with('users')->find($groupId);
        if (!$group) {
            return response()->json(['message' => 'Technician group not found'], 404);
        }

        $users = $group->users;
        return response()->json($users, 200);
    }
}
