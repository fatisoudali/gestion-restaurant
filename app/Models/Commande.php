<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Commande extends Model
{
    /** @use HasFactory<\Database\Factories\CommandeFactory> */
    use HasFactory;

    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    public function lignes()
    {
        return $this->hasMany(LineCommande::class);
    }

    public function paiements()
    {
        return $this->hasOne(Paiement::class);
    }

    public function facture()
    {
        return $this->hasOne(Facture::class);
    }
    
}
