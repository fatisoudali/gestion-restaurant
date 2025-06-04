<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Facture;
use App\Models\Category;
use App\Models\Client;
use Inertia\Inertia;
use App\Models\Commande;


class FactureController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
{
    $factures = Commande::with('client')
        ->latest()
        ->get()
        ->map(fn ($commande) => [
            'id' => $commande->id,
            'client' => [
                'id' => $commande->client->id,
                'name' => $commande->client->name,
            ],
            'status' => $commande->status,
            'type' => $commande->type,
            'numTable' => $commande->numTable,
            'total' => $commande->total,
            'notes' => $commande->notes,
        ]);

    return inertia('Facture/Index', [
        'factures' => $factures,
    ]);
}


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $clients = Client::select('id', 'name')->get();
        return Inertia::render('Facture/Create', ['clients' => $clients]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
         $validated = $request->validate([
            'client_id' => 'required|exists:clients,id',
            'status' => 'required|string',
            'type' => 'required|in:emporter,sur_place',
            'numTable' => 'nullable|string',
            'total' => 'required|numeric',
            'notes' => 'nullable|string',
        ]);

        Commande::create($validated);

        return redirect()->route('Factures.Index')->with('success', 'Facture créée avec succès.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        
        $facture = Commande::findOrFail($id);
        return Inertia::render('Facture/Edit', ['facture' => $facture]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $facture = Commande::findOrFail($id);

        $validated = $request->validate([
            'client_id' => 'required|exists:clients,id',
            'status' => 'required|string',
            'type' => 'required|in:emporter,sur_place',
            'numTable' => 'nullable|string',
            'total' => 'required|numeric',
            'notes' => 'nullable|string',
        ]);

        $facture->update($validated);

        return redirect()->route('Facture.index')->with('success', 'Facture mise à jour avec succès.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
         $facture = Commande::findOrFail($id);
        $facture->delete();

        return redirect()->route('Facture.index')->with('success', 'Facture supprimée avec succès.');
    }
}
