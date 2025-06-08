<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Plat extends Model implements HasMedia
{
    /** @use HasFactory<\Database\Factories\PlatFactory> */
    use HasFactory;
    use InteractsWithMedia;
    protected $fillable = [
        'name',
        'description',
        'price',
        'category_id',
        
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function lignes()
    {
        return $this->hasMany(LineCommande::class);
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('images');
    }

}
