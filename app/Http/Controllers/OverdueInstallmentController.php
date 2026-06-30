<?php

namespace App\Http\Controllers;

use App\Models\Member;
use App\Models\Collector;
use App\Models\OverdueInstallment;
use App\Services\OverdueInstallmentService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OverdueInstallmentController extends Controller
{
    public function __construct(
        private OverdueInstallmentService $overdueInstallmentService
    ) {
    }

    public function index()
    {
    $overdueInstallments = OverdueInstallment::with([
        'member.collector'
    ])
        ->get()
        ->groupBy('member_id')
        ->map(function ($items) {

        return [
            'member' => $items->first()->member,

            'total' => $items->count(),

            'periods' => $items
                ->pluck('period')
                ->sort()
                ->values(),

        ];

    })
        ->sortByDesc('total')
        ->values();


    return Inertia::render(
        'OverdueInstallments/Index',
            [
                'overdueInstallments' => $overdueInstallments,

                'collectors' => Collector::all(),
            ]
        );
    }

    public function create()
    {
        return Inertia::render(
         'OverdueInstallments/Create'
        );
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'member_ids' => 'required|array|min:1',
            'member_ids.*' => 'exists:members,id',
            'period' => 'required|date',
        ]);

        $this->overdueInstallmentService->createMany(
            $validated['member_ids'],
            $validated['period']
        );

        return redirect()
            ->route('overdue-installments.index')
            ->with(
                'success',
                'Cuotas vencidas registradas correctamente.'
            );
    }

    public function destroy(OverdueInstallment $overdueInstallment)
    {
        $this->overdueInstallmentService->delete(
            $overdueInstallment
        );

        return redirect()
            ->route('overdue-installments.index')
            ->with(
                'success',
                'Cuota eliminada correctamente.'
            );
    }

    public function searchByMember(Request $request)
{
    $memberId = $request->input('member_id');


    if (!$memberId) {

        return redirect()
            ->route('overdue-installments.index');

    }


    $overdueInstallments =
        $this->overdueInstallmentService
            ->findByMember((int)$memberId);



    return Inertia::render(
        'OverdueInstallments/Index',
        [
            'overdueInstallments' => $overdueInstallments
        ]
    );
}

    public function findByCollector(Request $request)
    {
        $collectorId = $request->input('collector_id');

        return Inertia::render('OverdueInstallments/Index', [
            'overdueInstallments' =>
                $this->overdueInstallmentService
                    ->findByCollector($collectorId),

            'collectors' => Collector::all(),
        ]);
    }

    public function findByPeriod(Request $request)
    {
        $period = $request->input('period');

        return Inertia::render('OverdueInstallments/Index', [
            'overdueInstallments' =>
                $this->overdueInstallmentService
                    ->findByPeriod($period),

            'collectors' => Collector::all(),
        ]);
    }

    public function showByMember(Member $member)
    {
    $overdueInstallments = $this->overdueInstallmentService
        ->findByMember($member->id);


    return Inertia::render(
        'OverdueInstallments/Show',
        [
            'member' => $member->load('collector'),

            'overdueInstallments' => $overdueInstallments
        ]
    );
    }

}