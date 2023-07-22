<?php
namespace App\Mail;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Models\User\User;



class EmailVerification extends Mailable
{
    use Queueable, SerializesModels;

    protected $user;
    public function __construct(User $user)
    {
        $this->user = $user;
    }


    public function build()
    {
        $verificationUrl = route('verification.verify', ['id' => $this->user->id , 'hash' => $this->user->email_verification_token ]);
        return $this->markdown('emails.verification')
            ->with([
                'user' => $this->user,
                'verificationUrl' => $verificationUrl,
            ]);
    }
}
