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
        Schema::create('dossiers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('avocat_id')->constrained('avocats')->cascadeOnDelete();
            $table->foreignId('client_id')->constrained('clients')->cascadeOnDelete();
            $table->string('reference', 50)->unique();            // DOS-2024-0001
            $table->string('titre', 255);
            $table->enum('type_affaire', ['penal','civil','commercial','famille','administratif','immobilier','travail','social','autre']);
            $table->enum('juridiction', ['TPI','CA','CC','TA','TF','TC','Autre']);
            $table->string('tribunal', 200);
            $table->string('numero_parquet', 50)->nullable();
            $table->string('numero_dossier_tribunal', 50)->nullable();
            $table->enum('statut', ['ouvert','en_cours','en_attente','cloture','archive'])->default('ouvert');
            $table->text('description')->nullable();
            $table->decimal('honoraires_convenus', 10, 2)->nullable();
            $table->date('date_ouverture');
            $table->date('date_cloture')->nullable();
            $table->timestamps();
            $table->softDeletes();
            $table->index(['avocat_id', 'statut']);
            $table->index(['client_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dossiers');
    }
};
