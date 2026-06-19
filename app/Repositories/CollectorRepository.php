<?php

namespace App\Repositories;

use App\Models\Collector;
use App\Repositories\Interfaces\CollectorRepositoryInterface;

class CollectorRepository implements CollectorRepositoryInterface
{

    public function getAll()
    {
        return Collector::all();
    }


    public function findById(int $id): ?Collector
    {
        return Collector::find($id);
    }


    public function create(array $data): Collector
    {
        return Collector::create($data);
    }


    public function update(Collector $collector, array $data): bool
    {
        return $collector->update($data);
    }


    public function delete(Collector $collector): bool
    {
        return $collector->delete();
    }


    public function searchByName(string $name)
    {
        return Collector::where('name', 'like', "%{$name}%")
            ->get();
    }
}