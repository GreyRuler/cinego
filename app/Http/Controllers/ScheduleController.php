<?php

namespace App\Http\Controllers;

use App\Http\Resources\ScheduleResource;
use App\Models\Hall;
use App\Models\Movie;
use App\Models\Schedule;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ScheduleController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum')->except('show');
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $halls = Hall::all()->reduce(function ($carry, $item) {
            $carry[$item->id] = [
                'name' => $item->name,
                'data' => [],
            ];
            return $carry;
        }, []);
        return Schedule::all()->reduce(function ($carry, $item) {
            $carry[$item->hall->id]['data'][$item->id] = [
                'name' => $item->movie->name,
                'startDate' => $item->time,
                'duration' => $item->movie->duration,
                'color' => $item->movie->color,
            ];
            return $carry;
        }, $halls);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $startTime = $request->input('time');
        $movieDuration = Movie::find($request->get('movie_id'))->duration * 60 * 1000;
        $endTime = $request->input('time') + $movieDuration;
        $hall = Hall::find($request->input('hall_id'));
        $times = $hall->schedules->map(function (Schedule $schedule) {
            return [
                'startTime' => $schedule->time,
                'endTime' => $schedule->time + ($schedule->movie->duration * 60 * 1000),
            ];
        });
        $range = $times->first(function ($item) use ($startTime, $endTime) {
            return
                ($startTime > $item['startTime'] && $startTime < $item['endTime']) ||
                ($endTime > $item['startTime'] && $endTime < $item['endTime']) ||
                ($startTime > $item['startTime'] && $endTime < $item['endTime']) ||
                ($startTime < $item['startTime'] && $endTime > $item['endTime']);
        });
        if ($range) {
            return response($range, 422);
        }

        $schedule = Schedule::create($request->all());
        return response([
            'id' => $schedule->id,
            'name' => $schedule->movie->name,
            'startDate' => (int)$schedule->time,
            'hall_id' => $schedule->hall_id,
            'duration' => $schedule->movie->duration,
            'color' => $schedule->movie->color,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Schedule $schedule)
    {
        return new ScheduleResource($schedule);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Schedule $schedule)
    {
        $schedule->update($request->all());

        return $schedule;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Schedule $schedule)
    {
        $id = $schedule->id;
        $hall_id = $schedule->hall_id;
        $schedule->delete();
        return response([
            'id' => $id,
            'hall_id' => $hall_id,
        ]);
    }

    /**
     * Return dateMin, dateMax for schedule
     * @return Application|ResponseFactory|\Illuminate\Foundation\Application|Response
     */
    public function range()
    {
        $dateMin = Schedule::min('time');
        $dateMax = Schedule::all()->map(function (Schedule $schedule) {
            return $schedule->time + $schedule->movie->duration * 60 * 1000;
        })->max();
        return response([
            'dateMin' => $dateMin,
            'dateMax' => $dateMax,
        ]);
    }
}
