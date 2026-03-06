<?php
namespace App\Http\Controllers;

use App\Models\Avocat;
use Illuminate\Http\Request;

class ProfilAvocatController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'prenom'       => 'required|string|max:100',
            'nom'          => 'required|string|max:100',
            'telephone'    => 'nullable|string|max:20',
            'cabinet'      => 'nullable|string|max:255',
            'barreau'      => 'nullable|string|max:100',
            'numero_ordre' => 'nullable|string|max:50',
            'specialite'   => 'nullable|string|max:150',
            'ville'        => 'nullable|string|max:100',
        ]);

        $avocat = Avocat::create([
            'user_id'      => $request->user()->id,
            'prenom'       => $request->prenom,
            'nom'          => $request->nom,
            'telephone'    => $request->telephone,
            'cabinet'      => $request->cabinet,
            'barreau'      => $request->barreau,
            'numero_ordre' => $request->numero_ordre,
            'specialite'   => $request->specialite,
            'ville'        => $request->ville,
        ]);

        return response()->json([
            'message' => 'Profil complété avec succès !',
            'avocat'  => $avocat,
        ], 201);
    }
}
