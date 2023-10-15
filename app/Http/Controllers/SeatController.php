<?php

namespace App\Http\Controllers;

use App\Models\Hall;
use App\Models\Seat;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class SeatController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum')->except(['index', 'amount']);
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, Hall $hall)
    {
        $countRow = $request->query('countRow');
        $countColumn = $request->query('countColumn');
        return $hall->getSeats($countRow, $countColumn);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Hall $hall)
    {
        $hall->seats()->each(function ($seat) {
            $seat->delete();
        });

        $hall->update($request->all());

        $scheme = $request->json('scheme');
        collect($scheme)->each(function ($row) use ($hall) {
            collect($row)->each(function ($column) use ($hall) {
                Seat::create($column);
            });
        });

        return response(Hall::all(), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Hall $hall, Seat $seat)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Hall $hall, Seat $seat)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Hall $hall, Seat $seat)
    {
        $seat->delete();

        return response("", 204);
    }

    /**
     * Считает общую стоимость зрительских мест,
     * переданных в queryParams
     * @param Request $request
     * @param Hall $hall
     * @return Application|\Illuminate\Contracts\Foundation\Application|Response|ResponseFactory
     */
    public function amount(Request $request, Hall $hall)
    {
        $places = $request->get('places');
        $price = $hall->seats()->whereIn('number', $places)->get()
            ->map(function (Seat $seat) use ($hall) {
                $typePlace = $seat->hall->typePlaces->firstWhere('name', $seat->type_place);
                return $typePlace->price;
            })->sum();
        return response($price, 200);
    }
}
