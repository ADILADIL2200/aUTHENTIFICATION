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
        Schema::create('clients', function (Blueprint $table) {
            $table->id();
            $table->foreignId('avocat_id')->constrained('avocats')->cascadeOnDelete();
            $table->foreignId('useer_id')->nullable()->constrained('useers')->nullOnDelete();
            $table->string('nom', 100);
            $table->string('prenom', 100);
            $table->string('cin', 10)->nullable();                // CIN marocaine : AB123456
            $table->string('passeport', 20)->nullable();          // Pour clients étrangers
            $table->date('date_naissance')->nullable();
            $table->string('nationalite', 50)->default('Marocaine');
            $table->string('telephone', 20)->nullable();
            $table->string('email', 150)->nullable();
            $table->text('adresse')->nullable();
            $table->string('ville', 100)->nullable();
            $table->boolean('compte_actif')->default(false);      // FALSE jusqu'à activation
            $table->text('notes')->nullable();
            $table->timestamps();
            $table->softDeletes();
            $table->index(['avocat_id']);
            $table->index(['avocat_id', 'compte_actif']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('clients');
    }
};
