<?php

namespace App\Repositories\Interfaces;

use App\Models\OverdueInstallment;

interface OverdueInstallmentRepositoryInterface
{
    public function getAll();

    public function findById(int $id): ?OverdueInstallment;

    public function create(array $data): OverdueInstallment;

    public function update( OverdueInstallment $overdueInstallment,array $data): bool;

    public function delete( OverdueInstallment $overdueInstallment): bool;

    public function findByMember(int $memberId);

    public function findByCollector(int $collectorId);

    public function findByPeriod(string $period);

    public function findByMemberAndPeriod(int $memberId, string $period);
}

