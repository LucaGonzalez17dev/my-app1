<?php

namespace App\Repositories\Interfaces;

use App\Models\Loan;

interface LoanRepositoryInterface
{
    public function getAll();

    public function findById(int $id);

    public function create(array $data);

    public function update(Loan $loan, array $data);

    public function delete(Loan $loan);

    public function findByMember(int $memberId);
}