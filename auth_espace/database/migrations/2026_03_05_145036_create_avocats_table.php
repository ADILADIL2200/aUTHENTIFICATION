<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('avocats', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('prenom', 100);
            $table->string('nom', 100);
            $table->string('telephone', 20)->nullable();
            $table->string('cabinet')->nullable();
            $table->string('barreau', 100)->nullable();
            $table->string('numero_ordre', 50)->nullable();
            $table->string('specialite', 150)->nullable();
            $table->text('adresse_cabinet')->nullable();
            $table->string('ville', 100)->nullable();
            $table->string('photo')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('avocats');
    }
};
