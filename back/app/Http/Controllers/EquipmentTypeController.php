<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\EquipmentType;
use App\Models\Ticket;
use DB;
use Carbon\Carbon;

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
    
    public function getMaintenanceClaimRate()
    {
        // Récupérer le nombre total d'équipements
        $totalEquipments = EquipmentType::count();

        // Récupérer le nombre total de réclamations de maintenance
        $totalMaintenanceClaims = Ticket::whereNotNull('EquipmentTypeID')->count();

        // Calculer le taux de réclamation de maintenance
        $maintenanceClaimRate = 0;
        if ($totalEquipments > 0) {
            $maintenanceClaimRate = ($totalMaintenanceClaims / $totalEquipments) * 100;
        }

        return response()->json([
            'total_equipments' => $totalEquipments,
            'total_maintenance_claims' => $totalMaintenanceClaims,
            'maintenance_claim_rate' => $maintenanceClaimRate
        ]);
    }



    
        public function getAverageAssetLifetime()
        {
            // Récupérer tous les équipements avec la date d'installation
            $equipments = EquipmentType::whereNotNull('InstallationDate')->get();
    
            $totalLifetime = 0;
            $totalEquipments = 0;
    
            foreach ($equipments as $equipment) {
                // Calculer la durée de vie de l'équipement
                $installationDate = Carbon::parse($equipment->InstallationDate);
                $currentDate = Carbon::now();
                $lifetime = $installationDate->diffInYears($currentDate);
    
                // Ajouter la durée de vie à la durée totale
                $totalLifetime += $lifetime;
                $totalEquipments++;
            }
    
            // Calculer la durée moyenne de vie des équipements
            $averageLifetime = $totalEquipments > 0 ? $totalLifetime / $totalEquipments : 0;
    
            return response()->json([
                'average_asset_lifetime' => $averageLifetime
            ]);
        }
    
    


}
