<?php

namespace App\Repositories\Interfaces;

use App\Models\Member;

interface MemberRepositoryInterface
{
    public function getAll();

    public function findById(int $id): ?Member;

    public function create(array $data): Member;

    public function update(Member $member, array $data): bool;

    public function delete(Member $member): bool;

    public function searchByName(string $name);

    public function findByCollector(int $collectorId);
}