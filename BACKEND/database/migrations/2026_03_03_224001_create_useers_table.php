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
        Schema::create('useers', function (Blueprint $table) {
            $table->id();
            $table->string('email', 150)->unique();
            $table->string('password', 255)->nullable();           // NULL si Google OAuth
            $table->string('google_id', 255)->nullable()->unique();// NULL si connexion classique
            $table->enum('role', ['avocat', 'client','admin'])->default('avocat');
            $table->boolean('is_active')->default(true);
            $table->timestamp('email_verified_at')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('useers');
    }
};
