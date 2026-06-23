<?php

use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;
use App\Http\Controllers\CollectorController;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\LoanController;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');

    Route::resource(
    'collectors',
    CollectorController::class
);

Route::get(
    '/members/search',
    [MemberController::class, 'searchMembers']
);

Route::get(
    '/loans/search',
    [LoanController::class, 'searchByMember']
);

Route::resource(
    'members',
    MemberController::class
);

Route::resource(
    'loans',
    LoanController::class
);


});



require __DIR__.'/settings.php';
