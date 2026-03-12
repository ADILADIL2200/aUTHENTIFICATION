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
        Schema::create('documents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('dossier_id')->constrained('dossiers')->cascadeOnDelete();
            $table->foreignId('avocat_id')->constrained('avocats')->cascadeOnDelete();
            $table->string('nom', 255);
            $table->string('nom_fichier', 255);
            $table->string('chemin_fichier', 500);
            $table->string('type_mime', 100);
            $table->unsignedBigInteger('taille');
            $table->enum('type_document', ['jugement','assignation','memoire','conclusions','pv_audience','contrat','requete','expertise','correspondance','piece_identite','autre'])->default('autre');
            $table->enum('visibilite', ['prive', 'client'])->default('prive');
            $table->string('disk', 50)->default('private');
            $table->text('description')->nullable();
            $table->timestamps();
            $table->softDeletes();
            $table->index(['dossier_id', 'visibilite']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('documents');
    }
};
