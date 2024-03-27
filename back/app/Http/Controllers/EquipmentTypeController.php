<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\EquipmentType;

class EquipmentTypeController extends Controller
{
    public function index()
    {
        $equipmentTypes = EquipmentType::all();
        return response()->json($equipmentTypes, 200);
    }

    public function show($id)
    {
        $equipmentType = EquipmentType::find($id);
        if (!$equipmentType) {
            return response()->json(['message' => 'Equipment type not found'], 404);
        }
        return response()->json($equipmentType, 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'TypeName' => 'required|string|unique:equipment_types,TypeName',
            'Description' => 'nullable|string',
            'Manufacturer' => 'nullable|string',
            'ModelNumber' => 'nullable|string',
            'SerialNumber' => 'nullable|string',
            'InstallationDate' => 'nullable|date',
            'WarrantyExpiration' => 'nullable|date',
            'MaintenanceInterval' => 'nullable|integer',
            'LastMaintenanceDate' => 'nullable|date',
            // Ajoutez d'autres règles de validation au besoin
        ]);

        $equipmentType = EquipmentType::create($request->all());
        return response()->json($equipmentType, 201);
    }

    public function update(Request $request, $id)
    {
        $equipmentType = EquipmentType::find($id);
        if (!$equipmentType) {
            return response()->json(['message' => 'Equipment type not found'], 404);
        }

        $request->validate([
            'TypeName' => 'string|unique:equipment_types,TypeName,' . $equipmentType->EquipmentTypeID . ',EquipmentTypeID',

            'Description' => 'nullable|string',
            'Manufacturer' => 'nullable|string',
            'ModelNumber' => 'nullable|string',
            'SerialNumber' => 'nullable|string',
            'InstallationDate' => 'nullable|date',
            'WarrantyExpiration' => 'nullable|date',
            'MaintenanceInterval' => 'nullable|integer',
            'LastMaintenanceDate' => 'nullable|date',

            // Ajoutez d'autres règles de validation au besoin
        ]);

        $equipmentType->update($request->all());
        return response()->json($equipmentType, 200);
    }

    public function destroy($id)
    {
        $equipmentType = EquipmentType::find($id);
        if (!$equipmentType) {
            return response()->json(['message' => 'Equipment type not found'], 404);
        }

        $equipmentType->delete();
        return response()->json(null, 204);
    }


    public function getEquipmentName($id) {
        $equipment = EquipmentType::find($id);
        if ($equipment !== null) { // Vérifiez si l'équipement a été trouvé
            return response()->json($equipment->TypeName, 200); // Utilisez le nom de la colonne correspondant à la structure de votre table
        } else {
            return response()->json(['error' => 'Equipment not found'], 404);
        }
    }
    

}
