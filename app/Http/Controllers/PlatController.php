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
         $categories = Category::all();
    return Inertia::render('Plats/Create', [
        'categories' => $categories,
    ]);
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
        $plat = Plat::findOrFail($id);
        $plat->delete();

        return redirect()->route('plats.index')->with('success', 'Plat supprimée avec succès.');
    }
}
