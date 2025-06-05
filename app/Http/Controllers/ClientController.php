<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ClientController extends Controller
{
    public function Index()
    {
        $clients = Client::latest()->get()->map(function ($client) {
            return [
                'id' => $client->id,
                'name' => $client->name,
                'email' => $client->email,
                'phone' => $client->phone,
                'address' => $client->address,
            ];
        });

        return Inertia::render('Client/Index', [
            'clients' => $clients,
        ]);
    }

    // (optionnel) Ajoute d'autres méthodes si besoin : create, store, edit, update, destroy

    /**
     * Show the form for creating a new resource.
     */
    public function create() :Response
    {
        return Inertia::render('Client/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
         $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string|max:255',
        ]);

        Client::create($validated);

        return redirect()->route('Client.index')->with('success', 'Client ajouté avec succès.');
    }

    /**
     * Display the specified resource.
     */
    //public function show(string $id){}

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
{
    $client = Client::findOrFail($id);

    return Inertia::render('Client/Edit', [
        'client' => $client,
    ]);
}


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
          $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:20',
        ]);
        
        $client = Client::findOrFail($id);
        $client->update($validated);

        return redirect()->route('Client.index')->with('success', 'Client modifié avec succès.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
         $client = Client::findOrFail($id);
        $client->delete();

        return redirect()->route('Client.index')->with('success', 'Client supprimé avec succès.');
    }
}
