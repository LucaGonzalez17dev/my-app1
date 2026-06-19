<?php

namespace App\Services;

use App\Models\Collector;
use App\Repositories\Interfaces\CollectorRepositoryInterface;
use Exception;

class CollectorService
{
    public function __construct(
        private CollectorRepositoryInterface $collectorRepository
    ) {
    }


    public function getAll()
    {
        return $this->collectorRepository->getAll();
    }


    public function findById(int $id)
    {
        return $this->collectorRepository->findById($id);
    }


    public function create(array $data)
    {
        return $this->collectorRepository->create($data);
    }


    public function update(Collector $collector, array $data)
    {
        return $this->collectorRepository->update($collector, $data);
    }


    public function delete(Collector $collector)
    {
        if ($collector->members()->count() > 0) {

            throw new Exception(
                'No se puede eliminar un cobrador que tiene socios asignados.'
            );
        }


        return $this->collectorRepository->delete($collector);
    }
}