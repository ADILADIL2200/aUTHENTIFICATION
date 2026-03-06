<?php
namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable implements MustVerifyEmail
// ↑ MustVerifyEmail active la verification d'email
{
    use HasApiTokens, SoftDeletes;

    protected $fillable = [
        'name', 'email', 'password',
        'google_id', 'avatar', 'role', 'is_active',
    ];

    protected $hidden = ['password', 'remember_token'];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'is_active'         => 'boolean',
    ];

    public function avocat()
    {
        return $this->hasOne(Avocat::class);
    }
}
