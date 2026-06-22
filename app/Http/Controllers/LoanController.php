<?php

namespace App\Http\Controllers;

use App\Models\Loan;
use App\Models\Member;
use App\Services\LoanService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LoanController extends Controller
{

    public function __construct(
        private LoanService $loanService
    ) {
    }



    public function index()
    {
        $loans = $this->loanService->getAll();


        return Inertia::render('Loans/Index', [
            'loans' => $loans
        ]);
    }



    public function create()
    {
        return Inertia::render('Loans/Create', [

            'members' => Member::all()

        ]);
    }



    public function store(Request $request)
    {

        $validated = $request->validate([

            'member_id' => 'required|exists:members,id',

            'collection_address' => 
                'required|string|max:255',

            'item_name' => 
                'required|string|max:255',

            'quantity' => 
                'required|integer|min:1',

            'loan_date' =>
                'required|date',

        ]);



        $this->loanService->create($validated);



        return redirect()
            ->route('loans.index')
            ->with(
                'success',
                'Loan created successfully.'
            );
    }




    public function edit(Loan $loan)
    {

        return Inertia::render('Loans/Edit', [

            'loan' => $loan,

            'members' => Member::all()

        ]);

    }




    public function update(
        Request $request,
        Loan $loan
    )
    {

        $validated = $request->validate([

            'member_id' => 
                'required|exists:members,id',

            'collection_address' => 
                'required|string|max:255',

            'item_name' => 
                'required|string|max:255',

            'quantity' => 
                'required|integer|min:1',

            'loan_date' => 
                'required|date',

        ]);



        $this->loanService->update(
            $loan,
            $validated
        );



        return redirect()
            ->route('loans.index')
            ->with(
                'success',
                'Loan updated successfully.'
            );

    }





    public function destroy(Loan $loan)
    {

        $this->loanService->delete($loan);



        return redirect()
            ->route('loans.index')
            ->with(
                'success',
                'Loan deleted successfully.'
            );

    }


}