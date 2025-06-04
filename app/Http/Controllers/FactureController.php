<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Facture;
use App\Models\Category;
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
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
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
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
