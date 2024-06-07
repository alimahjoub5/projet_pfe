<?php

namespace App\Http\Controllers;

use App\Models\EquipmentType;
use App\Models\UtilisationPiece;
use App\Models\PieceStockMovement;
use Illuminate\Http\Request;
use App\Services\EquipmentAvailabilityService;

class StatisticController extends Controller
{

    protected $availabilityService;

    public function __construct(EquipmentAvailabilityService $availabilityService)
    {
        $this->availabilityService = $availabilityService;
    }

    /**
     * Get the availability rate of the equipment.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getAvailabilityRate(Request $request)
    {
        $request->validate([
            'equipment_type_id' => 'required|integer|exists:equipment_types,EquipmentTypeID',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date'
        ]);

        $equipmentTypeId = $request->input('equipment_type_id');
        $startDate = $request->input('start_date');
        $endDate = $request->input('end_date');

        $availabilityRate = $this->availabilityService->calculateAvailabilityRate($equipmentTypeId, $startDate, $endDate);

        return response()->json([
            'equipment_type_id' => $equipmentTypeId,
            'availability_rate' => $availabilityRate
        ]);
    }

}
