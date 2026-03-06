<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Avocat extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'user_id',
        'prenom',
        'nom',
        'telephone',
        'cabinet',
        'barreau',
        'numero_ordre',
        'specialite',
        'adresse_cabinet',
        'ville',
        'photo',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
