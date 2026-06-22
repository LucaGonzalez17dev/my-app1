<?php

namespace App\Services;

use App\Models\Loan;
use App\Repositories\Interfaces\LoanRepositoryInterface;

class LoanService
{

    public function __construct(
        private LoanRepositoryInterface $loanRepository
    ) {
    }


    public function getAll()
    {
        return $this->loanRepository->getAll();
    }


    public function findById(int $id)
    {
        return $this->loanRepository->findById($id);
    }


    public function findByMember(int $memberId)
    {
        return $this->loanRepository->findByMember($memberId);
    }


    public function create(array $data)
    {
        return $this->loanRepository->create($data);
    }


    public function update(Loan $loan, array $data)
    {
        return $this->loanRepository->update(
            $loan,
            $data
        );
    }


    public function delete(Loan $loan)
    {
        return $this->loanRepository->delete($loan);
    }

}