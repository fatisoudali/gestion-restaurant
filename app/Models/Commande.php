<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Commande extends Model
{
    use HasFactory;

    protected $fillable = [
        'client_id',
        'status',         // Ex : 'en cours', 'terminée', 'annulée'
        'total',          // Total de la commande
        'notes',          // Notes optionnelles
    ];

    /**
     * La commande appartient à un client.
     */
    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    /**
     * Une commande contient plusieurs lignes de commande.
     */
    public function lignes()
    {
        return $this->hasMany(LineCommande::class);
    }

}
