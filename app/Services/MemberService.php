<?php

namespace App\Services;

use App\Models\Member;
use App\Repositories\Interfaces\MemberRepositoryInterface; 

class MemberService
{
    public function __construct(
        private MemberRepositoryInterface $memberRepository
    ) {
    }


    public function getAll()
    {
        return $this->memberRepository->getAll();
    }


    public function findById(int $id)
    {
        return $this->memberRepository->findById($id);
    }


    public function create(array $data)
    {
        return $this->memberRepository->create($data);
    }


    public function update(Member $member, array $data)
    {
        return $this->memberRepository->update($member, $data);
    }


    public function delete(Member $member)
    {
        return $this->memberRepository->delete($member);
    }

    public function searchByName(string $name)
    {
        return $this->memberRepository->searchByName($name);
    }
}