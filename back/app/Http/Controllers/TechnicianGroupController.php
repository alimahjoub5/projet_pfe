<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TechnicianGroup;

class TechnicianGroupController extends Controller
{
    public function index()
    {
        $groups = TechnicianGroup::all();
        return response()->json($groups, 200);
    }

    public function show($id)
    {
        $group = TechnicianGroup::find($id);
        if (!$group) {
            return response()->json(['message' => 'Technician group not found'], 404);
        }
        return response()->json($group, 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'GroupName' => 'required|string|unique:technician_groups,GroupName',
            // Ajoutez d'autres règles de validation au besoin
        ]);

        $group = TechnicianGroup::create($request->all());
        return response()->json($group, 201);
    }

    public function update(Request $request, $id)
    {
        $group = TechnicianGroup::find($id);
        if (!$group) {
            return response()->json(['message' => 'Technician group not found'], 404);
        }

        $request->validate([
            'GroupName' => 'required|string|unique:technician_groups,GroupName,'.$group->GroupID .',GroupID',
            // Ajoutez d'autres règles de validation au besoin
        ]);

        $group->update($request->all());
        return response()->json($group, 200);
    }

    public function destroy($id)
    {
        $group = TechnicianGroup::find($id);
        if (!$group) {
            return response()->json(['message' => 'Technician group not found'], 404);
        }

        $group->delete();
        return response()->json(null, 204);
    }

   /* public function getAllGroupNames()
    {
        // Récupérer tous les noms de groupe
        $groupNames = TechnicianGroup::pluck('GroupName');

        // Retourner les noms de groupe sous forme de réponse JSON
        return response()->json(['groupNames' => $groupNames], 200);
    }*/

    public function getGroupNameById($id)
    {
        $group = TechnicianGroup::find($id);

        if (!$group) {
            return response()->json(['message' => 'Group not found'], 404);
        }

        return response()->json(['group_name' => $group->GroupName], 200);
    }

}
