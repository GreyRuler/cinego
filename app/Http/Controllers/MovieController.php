<?php

namespace App\Http\Controllers;

use App\Http\Middleware\SaveFile;
use App\Models\Movie;
use App\Models\Schedule;
use App\Models\Ticket;
use Illuminate\Http\Request;
use Ramsey\Collection\Collection;

class MovieController extends Controller
{
    public function __construct()
    {
        $this->middleware([
            SaveFile::class,
        ])->only('store', 'update');
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Movie::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $movie = Movie::create($request->all());

        return response($movie, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Movie $movie)
    {
        return $movie;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Movie $movie)
    {
        $movie->update($request->all());

        return $request->all();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Movie $movie)
    {
        $movie->schedules()->each(function (Schedule $schedule) {
            $schedule->delete();
        });
        $movie->delete();

        return response("", 204);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function moviesForInterval(Request $request)
    {
        $from = $request->query('from');
        $to = $request->query('to');
        $schedules = Schedule::whereBetween('time', [$from, $to])->get();
        $movies = $schedules->unique(function (Schedule $schedule) {
            return $schedule->movie_id;
        })->reduce(function ($carry, Schedule $schedule) {
            $carry[$schedule->movie_id] = [
                ...$schedule->movie->toArray(),
                'halls' => [],
            ];
            return $carry;
        }, []);
        $moviesWithHalls = $schedules->reduce(function ($carry, Schedule $schedule) {
            $carry[$schedule->movie_id]['halls'][$schedule->hall_id] = [
                ...$schedule->hall->toArray(),
                'movieId' => $schedule->movie_id,
                'times' => [],
            ];
            return $carry;
        }, $movies);
        $data = $schedules->reduce(function ($carry, Schedule $schedule) {
            $carry[$schedule->movie_id]['halls'][$schedule->hall_id]['times'][$schedule->id] = $schedule->time;
            return $carry;
        }, $moviesWithHalls);
        return response($data);
    }
}
