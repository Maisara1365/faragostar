<?php

namespace App\Mail;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class VerificationOtpMail extends Mailable
{
    use Queueable, SerializesModels;

    /*
    |--------------------------------------------------------------------------
    | Properties
    |--------------------------------------------------------------------------
    */

    public User $user;

    public string $otp;

    /*
    |--------------------------------------------------------------------------
    | Constructor
    |--------------------------------------------------------------------------
    */

    public function __construct(
        User $user,
        string $otp
    ) {
        $this->user = $user;
        $this->otp = $otp;
    }

    /*
    |--------------------------------------------------------------------------
    | Build Mail
    |--------------------------------------------------------------------------
    */

    public function build()
    {
        $subject = $this->user->language === 'fa'
            ? 'کد تأیید ایمیل'
            : 'Email Verification Code';

        return $this
            ->subject($subject)
            ->view('emails.auth.verification-otp');
    }
}
