<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Plat;
use App\Models\Category;
use Inertia\Inertia;

class PlatController extends Controller
{
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

    public function create()
    {
        $categories = Category::select('id', 'name')->get(); 

        return Inertia::render('Plats/Create', [
            'categories' => $categories,
        ]);
    }

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

        if ($request->hasFile('image')) {
            $plat->addMediaFromRequest('image')->toMediaCollection('images');
        }

        return redirect()->route('plats.index')->with('success', 'Plat ajouté avec succès.');
    }

    public function edit(Plat $plat)
    {
        $plat->image_url = $plat->getFirstMediaUrl('images');
        return Inertia::render('Plats/Edit', [
            'plat' => $plat,
            'categories' => Category::all(),
        ]);
    }

    public function update(Request $request, $id)
{
    $plat = Plat::findOrFail($id);

    $request->validate([
        'name' => 'required|string|max:255',
        'description' => 'required|string',
        'price' => 'required|numeric',
        'category_id' => 'required|exists:categories,id',
        'image' => 'nullable|image|max:2048',
    ]);

    $plat->update([
        'name' => $request->name,
        'description' => $request->description,
        'price' => $request->price,
        'category_id' => $request->category_id,
    ]);

    // Gérer l'image avec Spatie
    if ($request->hasFile('image')) {
        $plat->clearMediaCollection('images');
        $plat->addMediaFromRequest('image')->toMediaCollection('images');
    }

    return redirect()->back()->with('success', 'Plat mis à jour avec succès');
}


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