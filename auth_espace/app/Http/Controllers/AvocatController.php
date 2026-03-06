<?php
namespace App\Http\Controllers;

use App\Http\Requests\RegisterAvocatRequest;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Events\Registered;

class AvocatController extends Controller
{
    public function register(RegisterAvocatRequest $request)
    {
        // Créer seulement le User
        $user = User::create([
            'name'      => $request->name,
            'email'     => $request->email,
            'password'  => Hash::make($request->password),
            'role'      => 'avocat',
            'is_active' => true,
        ]);

        // Envoyer l'email de vérification
        event(new Registered($user));

        // Générer le token
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Inscription réussie ! Vérifiez votre email.',
            'token'   => $token,
            'user'    => $user,
        ], 201);
    }
}
