<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Client extends Model implements HasMedia
{
    /** @use HasFactory<\Database\Factories\ClientFactory> */
    use HasFactory;
    use InteractsWithMedia;

    protected $fillable = [
        'name',
        'email',
        'phone',
    ];

    public function commandes()
    {
        return $this->hasMany(Commande::class);
    }

    public function factures()
    {
        return $this->hasMany(Facture::class);
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('clients');
    }
}
