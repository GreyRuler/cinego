<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Collection;

class Hall extends Model
{
    use HasFactory;

    public $timestamps = false;
    public $fillable = [
        'name',
        'countRow',
        'countColumn',
        'active',
    ];

    public function seats(): HasMany
    {
        return $this->hasMany(Seat::class, 'hall_id');
    }

    public function getSeats($countRow, $countColumn)
    {
        $seats = $this->seats()->get();
        if ($this->countRow == $countRow && $this->countColumn == $countColumn) {
            return $seats->reduce(function ($carry, $seat) {
                $carry[$seat->row][$seat->column] = $seat;
                return $carry;
            }, []);
        }
        return $this->defaultScheme($countRow, $countColumn);
    }

    public function defaultScheme($countRow, $countColumn): Collection
    {
        return collect(range(0, $countRow - 1))->map(function ($item, $row) use ($countColumn) {
            return collect(range(0, $countColumn - 1))->map(function ($item, $column) use ($countColumn, $row) {
                return [
                    'row' => $row,
                    'column' => $column,
                    'type_place' => 'disabled',
                    'hall_id' => $this->id,
                    'number' => $row * $countColumn + ($column + 1)
                ];
            });
        });
    }

    public function typePlaces(): HasMany
    {
        return $this->hasMany(TypePlace::class, 'hall_id');
    }

    public function schedules(): HasMany
    {
        return $this->hasMany(Schedule::class, 'hall_id');
    }
}
