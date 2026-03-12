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
        Schema::create('dossier_updates', function (Blueprint $table) {
            $table->id();
            $table->foreignId('dossier_id')->constrained('dossiers')->cascadeOnDelete();
            $table->foreignId('avocat_id')->constrained('avocats')->cascadeOnDelete();
            $table->text('contenu');
            $table->enum('type_update', ['note','changement_statut','audience','document','correspondance','autre'])->default('note');
            $table->string('ancien_statut', 50)->nullable();      // Si type = changement_statut
            $table->string('nouveau_statut', 50)->nullable();
            $table->boolean('is_visible_client')->default(false);
            $table->timestamps();
            $table->index(['dossier_id', 'is_visible_client']);
            $table->index(['dossier_id', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dossier_updates');
    }
};
