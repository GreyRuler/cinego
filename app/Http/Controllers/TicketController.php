<?php

namespace App\Http\Controllers;

use App\Http\Resources\TicketResource;
use App\Models\Schedule;
use App\Models\Ticket;
use Illuminate\Http\Request;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class TicketController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, Schedule $schedule)
    {
        $uuid = $request->query('uuid');
        if (!Ticket::where('qr_code', $uuid)->exists()) {
            return response('', 404);
        }
        $clientUrl = $request->header('Origin') . "/schedules/$schedule->id/tickets?uuid=$uuid";
        $qrCode = base64_encode(QrCode::format('png')->size(300)->generate($clientUrl));
        return response()->json([
            'ticket' => new TicketResource($schedule),
            'qrCode' => $qrCode,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Schedule $schedule)
    {
        $places = $request->get('places');

        $existsTickets = Ticket::where('schedule_id', $schedule->id)
            ->whereIn('seat_id', $places)->exists();
        if ($existsTickets) {
            return response('Выбранные Вами места уже забронированы', 422);
        }

        $uuid = uuid_create();
        collect($places)->each(function ($placeId) use ($uuid, $schedule) {
            Ticket::create([
                'schedule_id' => $schedule->id,
                'seat_id' => $placeId,
                'qr_code' => $uuid,
            ]);
        });
        return response()->json([
            'uuid' => $uuid
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Schedule $schedule, Ticket $ticket)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Schedule $schedule, Ticket $ticket)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Schedule $schedule, Ticket $ticket)
    {
        //
    }
}
