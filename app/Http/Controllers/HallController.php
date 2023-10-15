<?php

namespace App\Http\Controllers;

use App\Models\Hall;
use Illuminate\Http\Request;

class HallController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Hall::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $hall = Hall::create($request->all());

        return response($hall, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Hall $hall)
    {
        return $hall;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Hall $hall)
    {
        $hall->update($request->all());

        return $hall;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Hall $hall)
    {
        $hall->delete();

        return response("", 204);
    }

    public function toggleSale()
    {
        $halls = Hall::all();

        if (!$halls->count()) {
            return response('Нет залов', 422);
        }

        $isConfiguration = $halls->every(function (Hall $hall) {
            return $hall->countRow && $hall->typePlaces()->get()->count() >= 2;
        });
        if (!$isConfiguration) {
            return response('Залы не сконфигурированы', 422);
        }

        $halls = Hall::all();
        $halls->each(function (Hall $hall) {
            $hall->update([
                'active' => !$hall->active
            ]);
        });

        return response($halls);
    }
}
