<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class PanierController extends Controller
{
    public function index()
    {
        return Inertia::render('Panier/Index');
    }
}
  