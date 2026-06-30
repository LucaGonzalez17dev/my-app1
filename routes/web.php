<?php

use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

use App\Http\Controllers\CollectorController;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\LoanController;
use App\Http\Controllers\OverdueInstallmentController;


Route::inertia(
    '/',
    'welcome',
    [
        'canRegister' => Features::enabled(
            Features::registration()
        ),
    ]
)->name('home');



Route::middleware(['auth', 'verified'])->group(function () {


    Route::inertia(
        'dashboard',
        'dashboard'
    )->name('dashboard');



    Route::resource(
        'collectors',
        CollectorController::class
    );



    Route::get(
        '/members/search',
        [MemberController::class, 'searchMembers']
    )->name('members.search');


    Route::get(
        '/members/collector',
        [MemberController::class, 'findByCollector']
    )->name('members.collector');


    Route::resource(
        'members',
        MemberController::class
    );

    Route::get(
        '/loans/search',
        [LoanController::class, 'searchByMember']
    )->name('loans.search');


    Route::resource(
        'loans',
        LoanController::class
    );

    Route::get(
        '/overdue-installments/search',
        [OverdueInstallmentController::class, 'searchByMember']
    )->name('overdue-installments.search');


    Route::get(
        '/overdue-installments/collector',
        [OverdueInstallmentController::class, 'findByCollector']
    )->name('overdue-installments.collector');

    Route::get(
    '/overdue-installments/member/{member}',
    [OverdueInstallmentController::class, 'showByMember']
    )->name('overdue-installments.member');


    Route::resource(
        'overdue-installments',
        OverdueInstallmentController::class
    );



});


require __DIR__.'/settings.php';