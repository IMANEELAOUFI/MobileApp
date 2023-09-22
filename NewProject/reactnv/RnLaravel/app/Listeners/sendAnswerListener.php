<?php

namespace App\Listeners;

use App\Events\sendIceCandidate;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class sendAnswerListener
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
    public function handle(sendIceCandidate $event): void
    {
        //
    }
}
