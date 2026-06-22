<?php

namespace App\Repositories;

use App\Models\Member;
use App\Repositories\Interfaces\MemberRepositoryInterface;

class MemberRepository implements MemberRepositoryInterface
{

    public function getAll()
    {
        return Member::with('collector')->get();
    }


    public function findById(int $id): ?Member
    {
        return Member::find($id);
    }


    public function create(array $data): Member
    {
        return Member::create($data);
    }


    public function update(Member $member, array $data): bool
    {
        return $member->update($data);
    }


    public function delete(Member $member): bool
    {
        return $member->delete();
    }


    public function searchByName(string $name)
    {
        return Member::where('full_name', 'like', "%{$name}%")
            ->with('collector')
            ->get();
    }

    public function findByCollector(int $collectorId)
    {
        return Member::where('collector_id', $collectorId)
            ->with('collector')
            ->get();
    }
}