<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class PanierController extends Controller
{
  public function index()
{
    $panier = session()->get('panier', []);

    return Inertia::render('Panier/Index', [
        'panier' => $panier,
    ]);
}

public function destroy($id)
    {
        $panier = session()->get('panier', []);

        if (isset($panier[$id])) {
            unset($panier[$id]);
            session()->put('panier', $panier);
        }

        return redirect()->route('panier.index');
    }

    public function ajouter(Request $request)
{
    $plat = Plat::findOrFail($request->plat_id);

    $panier = session()->get('panier', []);

    if (isset($panier[$plat->id])) {
        $panier[$plat->id]['quantite']++;
    } else {
        $panier[$plat->id] = [
            'id' => $plat->id,
            'nom' => $plat->name,
            'prix' => $plat->price,
            'quantite' => 1,
        ];
    }

    session()->put('panier', $panier);

    return back()->with('success', "{$plat->name} ajouté au panier.");
}

}
  