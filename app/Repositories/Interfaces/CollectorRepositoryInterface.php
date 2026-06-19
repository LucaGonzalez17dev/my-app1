<?php

namespace App\Repositories\Interfaces;

use App\Models\Collector;

interface CollectorRepositoryInterface
{
    public function getAll();

    public function findById(int $id): ?Collector;

    public function create(array $data): Collector;

    public function update(Collector $collector, array $data): bool;

    public function delete(Collector $collector): bool;

    public function searchByName(string $name);
}