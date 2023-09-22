<?php

namespace App\Listeners;

use App\Events\acceptCall;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class acceptCallListener
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
    public function handle(acceptCall $event): void
    {
        //
    }
}
