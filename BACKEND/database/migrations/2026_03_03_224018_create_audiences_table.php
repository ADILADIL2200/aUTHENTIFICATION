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
        Schema::create('audiences', function (Blueprint $table) {
            $table->id();
            $table->foreignId('dossier_id')->constrained('dossiers')->cascadeOnDelete();
            $table->foreignId('avocat_id')->constrained('avocats')->cascadeOnDelete();
            $table->dateTime('date_heure');
            $table->string('tribunal', 200);
            $table->string('salle', 50)->nullable();
            $table->enum('type_audience', [
                'mise_en_etat','plaidoirie','delibere','jugement',
                'appel','cassation','expertise','conciliation','jonction','autre'
            ]);
            $table->enum('statut', ['prevue','realisee','reportee','annulee'])->default('prevue');
            $table->dateTime('date_report')->nullable();
            $table->string('motif_report', 255)->nullable();
            $table->text('resultat')->nullable();
            $table->text('notes')->nullable();
            $table->boolean('is_visible_client')->default(false);
            $table->boolean('rappel_envoye')->default(false);     // Scheduler J-3/J-1
            $table->timestamps();
            $table->softDeletes();
            $table->index(['dossier_id', 'date_heure']);
            $table->index(['avocat_id', 'statut']);
            $table->index(['date_heure', 'rappel_envoye']);       // Job rappels
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('audiences');
    }
};
