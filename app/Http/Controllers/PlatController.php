<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Plat;
use App\Models\Category;
use Inertia\Inertia;

class PlatController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $plats = Plat::with('category')->latest()->get()->map(function ($plat) {
            return [
                'id' => $plat->id,
                'category_id' => $plat->category_id,
                'name' => $plat->name,
                'image' => $plat->getFirstMediaUrl('images'),
                'price' => $plat->price,
                'category' => [
                    'name' => optional($plat->category)->name,
                ],
            ];
        });
        return Inertia::render('Plats/Index', [
            'plats' => $plats,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
          $categories = Category::select('id', 'name')->get(); 

    return Inertia::render('Plats/Create', [
        'categories' => $categories,
    ]);

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
{
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'price' => 'required|numeric',
        'description' => 'nullable|string',
        'category_id' => 'required|exists:categories,id',
        'image' => 'required|image|max:2048',
    ]);

    $plat = Plat::create([
        'name' => $validated['name'],
        'price' => $validated['price'],
         'description' => $validated['description'] ?? null,
        'category_id' => $validated['category_id'],
    ]);

    // Enregistrer l'image via Spatie Media Library
    if ($request->hasFile('image')) {
        $plat->addMediaFromRequest('image')->toMediaCollection('images');
    }

    return redirect()->route('plats.index')->with('success', 'Plat ajouté avec succès.');
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
    $plat = Plat::with('category')->findOrFail($id);
    $categories = Category::all();

    return Inertia::render('Plats/Edit', [
        'plat' => [
            'id' => $plat->id,
            'name' => $plat->name,
            'price' => $plat->price,
            'category_id' => $plat->category_id,
            'image' => $plat->getFirstMediaUrl('images'),
        ],
        'categories' => $categories,
    ]);
}


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
{
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'price' => 'required|numeric',
        'description' => $validated['description'] ?? null,
        'category_id' => 'required|exists:categories,id',
        'image' => 'nullable|image|max:2048',
    ]);

    $plat = Plat::findOrFail($id);
    $plat->update([
        'name' => $validated['name'],
        'price' => $validated['price'],
        'category_id' => $validated['category_id'],
    ]);

    if ($request->hasFile('image')) {
        $plat->clearMediaCollection('images');
        $plat->addMediaFromRequest('image')->toMediaCollection('images');
    }

    return redirect()->route('plats.index')->with('success', 'Plat modifié avec succès.');
}


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $plat = Plat::findOrFail($id);
        $plat->delete();

        return redirect()->route('plats.index')->with('success', 'Plat supprimée avec succès.');
    }
}
