<?php

namespace App\Providers;

use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Event;
use App\Models\User\SmsVerification;
use App\Observers\EmailVerificationObserver;


class EventServiceProvider extends ServiceProvider
{
    /**
     * The event to listener mappings for the application.
     *
     * @var array<class-string, array<int, class-string>>
     */
    protected $listen = [
        Registered::class => [
            SendEmailVerificationNotification::class,
        ],
        VoiceCallStarted::class => [
            VoiceCallStartedListener::class,
        ],
        VoiceCallJoined::class => [
            VoiceCallJoinedListener::class,
        ],
        VoiceCallAccepted::class => [
            VoiceCallAcceptedListener::class,
        ],
        VoiceCallDeclined::class => [
            VoiceCallDeclinedListener::class,
        ],
        VoiceCallEnded::class => [
            VoiceCallEndedListener::class,
        ],
    ];

    /**
     * Register any events for your application.
     * 
     * @return void
     */
    public function boot()
    {
        SmsVerification::observe(EmailVerificationObserver::class);
    }

    /**
     * Determine if events and listeners should be automatically discovered.
     */
    public function shouldDiscoverEvents(): bool
    {
        return false;
    }
}
