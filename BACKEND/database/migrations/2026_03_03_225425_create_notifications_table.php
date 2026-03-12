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
        Schema::create('notifications', function (Blueprint $table) {
            $table->uuid('id')->primary();                         // UUID standard Laravel
            $table->string('type');                               // Classe PHP notification
            $table->morphs('notifiable');                         // notifiable_type + notifiable_id
            $table->text('data');                                 // Payload JSON
            $table->timestamp('read_at')->nullable();             // NULL = non lue
            $table->index(['notifiable_id', 'notifiable_type', 'read_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notifications');
    }
};
