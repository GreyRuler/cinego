<?php

namespace App\Http\Controllers;

use App\Models\Hall;
use App\Models\TypePlace;
use Illuminate\Http\Request;

class TypePlaceController extends Controller
{
    public function index(Hall $hall)
    {
        $data = $hall->typePlaces()->get()->reduce(function ($carry, $typePlace) {
            $carry[$typePlace->name] = $typePlace->price;
            return $carry;
        }, []);
        if (count($data)) return $data;
        return [
            'standard' => null,
            'vip' => null,
        ];
    }

    public function store(Request $request, Hall $hall)
    {
        TypePlace::updateOrCreate(
            ['name' => 'standard', 'hall_id' => $hall->id],
            ['price' => $request->get('standard')]
        );
        TypePlace::updateOrCreate(
            ['name' => 'vip', 'hall_id' => $hall->id],
            ['price' => $request->get('vip')]
        );

        return response('', 201);
    }

    public function show(Hall $hall, TypePlace $typePlace)
    {
        return $typePlace;
    }

    public function update(Request $request, Hall $hall, TypePlace $typePlace)
    {
        $request->validate([

        ]);

        $typePlace->update($request->validated());

        return $typePlace;
    }

    public function destroy(Hall $hall, TypePlace $typePlace)
    {
        $typePlace->delete();

        return response()->json();
    }
}
