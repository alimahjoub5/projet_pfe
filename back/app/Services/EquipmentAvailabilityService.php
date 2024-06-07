<?php

namespace App\Services;

use App\Models\EquipmentType;
use App\Models\Ticket;
use Carbon\Carbon;

class EquipmentAvailabilityService
{
    public function calculateAvailabilityRate($equipmentTypeId, $startDate, $endDate)
    {
        // Parse the start and end dates
        $startDate = Carbon::parse($startDate);
        $endDate = Carbon::parse($endDate);
    
        // Get all tickets for this equipment within the period
        $tickets = Ticket::where('EquipmentTypeID', $equipmentTypeId)
            ->whereBetween('StartDate', [$startDate, $endDate])
            ->whereNotNull('datedevalidation') // Make sure 'datedevalidation' is not null
            ->get();
    
        // Calculate the total downtime
        $totalDowntime = $tickets->sum(function ($ticket) use ($startDate, $endDate) {
            // Calculate the intersection of downtime period and the given period
            $downtimeStart = Carbon::parse($ticket->StartDate)->max($startDate);
            $downtimeEnd = Carbon::parse($ticket->datedevalidation)->min($endDate);
            return $downtimeStart->diffInMinutes($downtimeEnd);
        });
    
        // Calculate the total time in the period
        $totalTime = $startDate->diffInMinutes($endDate);
    
        // Calculate the uptime
        $uptime = $totalTime - $totalDowntime;
    
        // Calculate the availability rate
        $availabilityRate = ($uptime / $totalTime) * 100;
    
        return $availabilityRate;
    }
    
}
