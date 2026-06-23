<?php

namespace App\Http\Controllers;

use App\Models\Member;
use App\Models\Collector;
use App\Services\MemberService;
use Inertia\Inertia;
use Illuminate\Http\Request;

class MemberController extends Controller
{
    public function __construct(
        private MemberService $memberService
    ) {
    }

    public function index()
    {
        $members = $this->memberService->getAll();

        return Inertia::render('Members/Index', [
            'members' => $members
        ]);
    }

    public function create()
    {
        return Inertia::render('Members/Create', [
            'collectors' => Collector::all(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'full_name' => 'required|string|max:255',
            'national_id' => 'required|string|max:20',
            'phone' => 'nullable|string|max:50',
            'collection_address' => 'required|string|max:255',
            'membership_frequency' => 'required',
            'collector_id' => 'required|exists:collectors,id',
        ]);

        $this->memberService->create($validated);

        return redirect()
            ->route('members.index')
            ->with('success', 'Member created successfully.');
    }

    public function edit(Member $member)
    {
        return Inertia::render('Members/Edit', [
            'member' => $member,
            'collectors' => Collector::all(),
        ]);
    }

    public function update(Request $request, Member $member)
    {
        $validated = $request->validate([
            'full_name' => 'required|string|max:255',
            'national_id' => 'required|string|max:20',
            'phone' => 'nullable|string|max:50',
            'collection_address' => 'required|string|max:255',
            'membership_frequency' => 'required',
            'collector_id' => 'required|exists:collectors,id',
        ]);

        $this->memberService->update(
            $member,
            $validated
        );

        return redirect()
            ->route('members.index')
            ->with('success', 'Member updated successfully.');
    }

    public function destroy(Member $member)
    {
        $this->memberService->delete($member);

        return redirect()
            ->route('members.index')
            ->with('success', 'Member deleted successfully.');
    }

    public function searchMembers(Request $request)
    {
    $searchTerm = $request->input('query');


    $members = Member::where(
            'full_name',
            'like',
            "%{$searchTerm}%"
        )
        ->orWhere(
            'national_id',
            'like',
            "%{$searchTerm}%"
        )
        ->limit(10)
        ->get([
            'id',
            'full_name',
            'national_id'
        ]);


    return response()->json($members);
    }
}