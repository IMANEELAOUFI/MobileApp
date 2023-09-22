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
        Schema::create('calls', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('initiator_id');
            $table->unsignedBigInteger('recipient_id');
            $table->string('status')->default('en_attente'); 
            $table->timestamp('start_time')->nullable();
            $table->timestamp('end_time')->nullable();
            $table->timestamp('accepted_at')->nullable(); 
            $table->string('type')->default('video'); 
            $table->string('record_status')->default('non_enregistré'); 
            $table->text('decline_reason')->nullable(); 
            $table->timestamps();
             $table->text('offer_sdp')->nullable();
            $table->text('answer_sdp')->nullable();
            $table->text('ice_candidates')->nullable();
            $table->text('initiator_signal')->nullable();
            $table->text('recipient_signal')->nullable();
            $table->integer('call_duration')->nullable();
            $table->foreign('initiator_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('recipient_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('calls');
    }
};
