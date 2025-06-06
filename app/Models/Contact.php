<?php

namespace App\Http\Controllers;

use Inertia\Inertia;


class ContactController extends Controller
{
    public function index()
    {
        // Renvoie la vue Inertia 'frontend/contact' qui correspond à resources/js/pages/frontend/contact.tsx
        return Inertia::render('frontend/contact');
    }
}

