<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\QueryException;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        try {
            User::factory()->create([
                'name' => 'Администратор',
                'email' => 'admin@admin.ru',
                'email_verified_at' => now(),
                'password' => bcrypt('admin'), // password
                'remember_token' => Str::random(10),
            ]);
        } catch (QueryException $exception) {
            echo $exception->getMessage();
        }
    }
}
