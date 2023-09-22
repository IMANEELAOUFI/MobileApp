<?php

namespace App\Listeners;

use App\Events\VoiceCallStarted;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class VoiceCallStartedListener
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(VoiceCallStarted $event): void
    {
        //
    }
}
