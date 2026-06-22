<?php

namespace App\Services;

use App\Models\Member;
use App\Repositories\Interfaces\MemberRepositoryInterface; 
use Exception;

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
}