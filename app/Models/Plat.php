<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Plat extends Model
{
    /** @use HasFactory<\Database\Factories\PlatFactory> */
    use HasFactory;

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

}
