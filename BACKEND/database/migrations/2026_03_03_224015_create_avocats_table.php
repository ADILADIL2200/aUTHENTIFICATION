<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('avocats', function (Blueprint $table) {
            $table->id();
            $table->foreignId('useer_id')->constrained('useers')->cascadeOnDelete();
            $table->string('nom', 100);
            $table->string('prenom', 100);
            $table->string('telephone', 20)->nullable();
            $table->enum('barreau', ['Casablanca','Rabat','Marrakech','Fes','Agadir','Tanger','Meknes','Oujda','Kenitra','Autre']);                                                    // Barreau d'inscription — obligatoire au Maroc
            $table->string('numero_ordre', 50)->unique();          // N° Ordre des Avocats
            $table->date('date_inscription_barreau')->nullable();
            $table->enum('grade', ['stagiaire', 'titulaire'])->default('titulaire');
            $table->string('specialite', 150)->nullable();
            $table->string('nom_cabinet', 200)->nullable();
            $table->text('adresse_cabinet')->nullable();
            $table->string('ville', 100)->nullable();
            $table->string('photo', 255)->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('avocats');
    }
};
