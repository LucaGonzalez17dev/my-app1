<?php

namespace App\Repositories;

use App\Models\OverdueInstallment;
use App\Repositories\Interfaces\OverdueInstallmentRepositoryInterface;

class OverdueInstallmentRepository implements OverdueInstallmentRepositoryInterface
{
    public function getAll()
    {
        return OverdueInstallment::with('member.collector')->get();
    }

    public function findById(int $id): ?OverdueInstallment
    {
        return OverdueInstallment::with('member.collector')->find($id);
    }

    public function create(array $data): OverdueInstallment
    {
        return OverdueInstallment::create($data);
    }

    public function update(OverdueInstallment $overdueInstallment, array $data): bool
    {
        return $overdueInstallment->update($data);
    }

    public function delete(OverdueInstallment $overdueInstallment): bool
    {
        return $overdueInstallment->delete();
    }

    public function findByMember(int $memberId)
    {
        return OverdueInstallment::where('member_id', $memberId)
            ->with('member.collector')
            ->get();
    }

    public function findByCollector(int $collectorId)
    {
        return OverdueInstallment::whereHas('member', function ($query) use ($collectorId) {
             $query->where('collector_id', $collectorId);
        })
            ->with('member.collector')
            ->get();
    }

    public function findByPeriod(string $period)
    {
        return OverdueInstallment::where('period', $period)
            ->with('member.collector')
            ->get();
    }

    public function findByMemberAndPeriod(int $memberId, string $period)
    {
        return OverdueInstallment::where('member_id', $memberId)
            ->where('period', $period)
            ->first();
    }

}
