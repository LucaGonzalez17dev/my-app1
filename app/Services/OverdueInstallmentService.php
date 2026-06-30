<?php

namespace App\Services;

use App\Models\OverdueInstallment;
use App\Repositories\Interfaces\OverdueInstallmentRepositoryInterface;

class OverdueInstallmentService
{
    public function __construct(
        private OverdueInstallmentRepositoryInterface $overdueInstallmentRepository
    ) {
    }

    public function getAll()
    {
        return $this->overdueInstallmentRepository->getAll();
    }

    public function findById(int $id)
    {
        return $this->overdueInstallmentRepository->findById($id);
    }

    public function create(array $data)
    {
        return $this->overdueInstallmentRepository->create($data);
    }

    public function update(OverdueInstallment $overdueInstallment, array $data)
    {
        return $this->overdueInstallmentRepository->update($overdueInstallment, $data);
    }

    public function delete(OverdueInstallment $overdueInstallment)
    {
        return $this->overdueInstallmentRepository->delete($overdueInstallment);
    }

    public function findByMember(int $memberId)
    {
        return $this->overdueInstallmentRepository->findByMember($memberId);
    }

    public function findByCollector(int $collectorId)
    {
        return $this->overdueInstallmentRepository->findByCollector($collectorId);
    }

    public function findByPeriod(string $period)
    {
        return $this->overdueInstallmentRepository->findByPeriod($period);
    }

    public function findByMemberAndPeriod(int $memberId, string $period)
    {
        return $this->overdueInstallmentRepository->findByMemberAndPeriod($memberId, $period);
    }

    public function createMany(array $memberIds, string $period)
    {
    foreach ($memberIds as $memberId) {

        if (!$this->findByMemberAndPeriod($memberId, $period)) {

            $this->create([
                'member_id' => $memberId,
                'period' => $period,
            ]);

        }

    }
    }
}