<?php

namespace App\Observers;

use App\Models\User\SmsVerification;
use App\Models\User\User;

class EmailVerificationObserver
{
    /**
     * Handle the SmsVerification "created" event.
     *
     * @param  \App\Models\User\SmsVerification  $sms
     * @return void
     */
    public function created(SmsVerification $sms)
    {
        $user = User::where('email', $sms->email)->first();
        if ($user) {
            $user->sendEmailVerifyCode($sms->code);
        }
    }
}
