<?php

namespace App\Repositories;

use App\Models\Loan;
use App\Repositories\Interfaces\LoanRepositoryInterface;

class LoanRepository implements LoanRepositoryInterface
{

    public function getAll()
    {
        return Loan::with('member')->get();
    }



    public function findById(int $id)
    {
        return Loan::with('member')
            ->findOrFail($id);
    }



    public function create(array $data)
    {
        return Loan::create($data);
    }



    public function update(Loan $loan, array $data)
    {
        $loan->update($data);

        return $loan;
    }



    public function delete(Loan $loan)
    {
        return $loan->delete();
    }



    public function findByMember(int $memberId)
    {
        return Loan::where('member_id', $memberId)
            ->with('member')
            ->get();
    }

}