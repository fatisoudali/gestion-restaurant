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
   public function edit(Plat $plat)
{
    return Inertia::render('Plats/Edit', [
        'plat' => $plat,
        'categories' => Category::all(['id', 'name']),
    ]);
}

    /**
     * Update the specified resource in storage.
     */
   public function update(Request $request, Plat $plat)
{
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'description' => 'nullable|string',
        'price' => 'required|numeric',
        'category_id' => 'required|exists:categories,id',
    ]);

    $plat->update($validated);

    return redirect()->route('plats.index')->with('success', 'Plat mis à jour avec succès.');
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

    public function frontIndex()
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
        return Inertia::render('Frontend/plates', [
            'plats' => $plats,
        ]);
    }
}
