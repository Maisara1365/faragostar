<?php

namespace App\Notifications\Auth;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class ResetPasswordNotification extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(
        protected string $otp
    ) {}

    /**
     * Notification channels.
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Build the mail representation.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject(
                $notifiable->language === 'fa'
                    ? 'بازنشانی رمز عبور'
                    : 'Reset Your Password'
            )
            ->view('emails.auth.reset-password', [
                'user' => $notifiable,
                'otp'  => $this->otp,
            ]);
    }
}
