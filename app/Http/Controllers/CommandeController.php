<?php

namespace App\Http\Controllers;

use App\Models\Commande;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Models\Plat;

use Inertia\Inertia;

class CommandeController extends Controller
{
    public function index()
    {
        $commandes = Commande::with('client')->latest()->get()->map(function ($cmd) {
            return [
                'id' => $cmd->id,
                'numTable' => $cmd->numTable,
                'status' => $cmd->status,
                'type' => $cmd->type,
                'total' => $cmd->total,
                'client' => $cmd->client ? ['name' => $cmd->client->name] : null,
            ];
        });

        return Inertia::render('Commande/Index', [
            'commandes' => $commandes,
        ]);
    }
    public function valider(Request $request)
{
    $request->validate([
        'plat_id' => 'required|exists:plats,id',
        'quantite' => 'required|integer|min:1',
    ]);

    // Exemple simple : sauvegarder la commande
    $commande = new \App\Models\Commande();
    $commande->plat_id = $request->plat_id;
    $commande->quantite = $request->quantite;
    $commande->user_id = auth()->id(); // si connecté
    $commande->save();

    return redirect()->route('Accueile')->with('success', 'Commande confirmée !');
}


 public function Show ($id)
    {
        $plat= plat::findOrFail($id);

        return Inertia::render('Commande/Show', [
            'plat' => $plat,
        ]);
    }
    
    public function create()
    {
        $categories = Category::all(['id', 'name']);

        return Inertia::render('Commande/Create', [
            'categories' => $categories,
        ]);
    }

    public function store(Request $request)
{
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'type' => 'required|string|in:sur place,à emporter',
        'status' => 'required|string|in:en attente,servi',
        'price' => 'required|numeric|min:0',
        'numTable' => 'required|integer|min:1',
    ]);

    Commande::create($validated);

    return redirect()->route('Commande.index')->with('success', 'Commande créée avec succès.');
}


    public function edit($id)
    {
        $commande = Commande::with('category')->findOrFail($id);
        $categories = Category::all(['id', 'name']);

        return Inertia::render('Commande/Edit', [
            'commande' => $commande,
            'categories' => Category::select('id', 'name')->get(),
        ]);
    }

    public function update(Request $request, $id)
    {
        $commande = Commande::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'quantity' => 'required|integer|min:1',
            'category_id' => 'required|exists:categories,id',
        ]);

        $commande->update($validated);

        return redirect()->route('Commande.index')->with('success', 'Commande mise à jour avec succès.');
    }

    public function destroy($id)
    {
        $commande = Commande::findOrFail($id);
        $commande->delete();

        return redirect()->route('Commande.index')->with('success', 'Commande supprimée avec succès.');
    }
}
