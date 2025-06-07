<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\contact;

class ContactController extends Controller
{
     public function index()
        {
           return Inertia::render('plats', [
        'plates' => Plate::all(),
    ]);
        }
         // Traitement de l'envoi du formulaire
    public function send(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'email' => 'required|email|max:100',
            'message' => 'required|string|max:1000',
        ]);

        // Exemple de traitement : tu pourrais enregistrer le message dans la base ou envoyer un email

        // Retour vers la page avec un message de succès
        return back()->with('success', 'Votre message a été envoyé avec succès.');
    }
}