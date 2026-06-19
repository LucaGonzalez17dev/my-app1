<?php

namespace App\Http\Controllers;

use App\Models\Collector;
use App\Services\CollectorService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CollectorController extends Controller
{
    public function __construct(
        private CollectorService $collectorService
    ) {
    }


    public function index()
    {
        $collectors = $this->collectorService->getAll();

        return Inertia::render('Collectors/Index', [
            'collectors' => $collectors
        ]);
    }


    public function create()
    {
        return Inertia::render('Collectors/Create');
    }


    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'nullable|string|max:50',
        ]);


        $this->collectorService->create($validated);


        return redirect()
            ->route('collectors.index')
            ->with('success', 'Collector created successfully.');
    }


    public function edit(Collector $collector)
    {
        return Inertia::render('Collectors/Edit', [
            'collector' => $collector
        ]);
    }


    public function update(Request $request, Collector $collector)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'nullable|string|max:50',
        ]);


        $this->collectorService->update(
            $collector,
            $validated
        );


        return redirect()
            ->route('collectors.index')
            ->with('success', 'Collector updated successfully.');
    }


    public function destroy(Collector $collector)
    {
        try {

            $this->collectorService->delete($collector);


            return redirect()
                ->route('collectors.index')
                ->with('success', 'Collector deleted successfully.');


        } catch (\Exception $e) {


            return redirect()
                ->route('collectors.index')
                ->with('error', $e->getMessage());

        }
    }
}