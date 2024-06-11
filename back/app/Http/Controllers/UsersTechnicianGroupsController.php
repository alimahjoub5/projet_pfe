<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TechnicianGroup;
use App\Models\User;
use App\Models\UsersTechnicianGroups;
use App\Models\UserTechnicianGroup;

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

    public function getGroupMembers($userId)
    {
        // Récupère l'utilisateur avec les groupes auxquels il appartient
        $user = User::with('technicianGroups.users')->find($userId);

        if (!$user) {
            return response()->json(['error' => 'Utilisateur non trouvé.'], 404);
        }

        // Récupère les groupes auxquels l'utilisateur appartient
        $groups = $user->technicianGroups;

        // Initialise une collection pour les membres du groupe
        $groupMembers = collect();

        // Récupère tous les membres de chaque groupe
        foreach ($groups as $group) {
            $groupMembers = $groupMembers->merge($group->users);
        }

        // Supprime les doublons de membres
        $groupMembers = $groupMembers->unique('UserID');

        return response()->json($groupMembers);
    }

}