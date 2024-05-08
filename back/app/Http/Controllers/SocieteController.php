<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Societe;
///win nhot warini fama hedha w mta soc
class SocieteController extends Controller
{
    /**
     * Affiche la liste des sociétés.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $societes = Societe::all();
        return response()->json($societes);
    }

    /**
     * Enregistre une nouvelle société dans la base de données.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required',
            'address' => 'nullable',
            'city' => 'nullable',
            'country' => 'nullable',
            'phone' => 'nullable',
            'email' => 'nullable|email',
            'website' => 'nullable|url',
            'contact_person' => 'nullable',
            'contact_phone' => 'nullable',
            'contact_email' => 'nullable|email',
        ]);

        $societe = Societe::create($validatedData);

        return response()->json($societe, 201);
    }

    /**
     * Affiche les détails d'une société spécifique.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $societe = Societe::findOrFail($id);
        return response()->json($societe);
    }

    /**
     * Met à jour une société spécifique dans la base de données.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'name' => 'required',
            'address' => 'nullable',
            'city' => 'nullable',
            'country' => 'nullable',
            'phone' => 'nullable',
            'email' => 'nullable|email',
            'website' => 'nullable|url',
            'contact_person' => 'nullable',
            'contact_phone' => 'nullable',
            'contact_email' => 'nullable|email',
        ]);

        $societe = Societe::findOrFail($id);
        $societe->update($validatedData);

        return response()->json($societe, 200);
    }

    /**
     * Supprime une société spécifique de la base de données.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $societe = Societe::findOrFail($id);
        $societe->delete();

        return response()->json(null, 204);
    }
}
