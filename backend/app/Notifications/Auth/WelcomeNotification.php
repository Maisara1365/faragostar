<?php

namespace App\Notifications\Auth;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class WelcomeNotification extends Notification
{
    use Queueable;

    /**
     * Delivery Channels
     */
    public function via(object $notifiable): array
    {
        return [
            'mail',
        ];
    }

    /**
     * Welcome Email
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject(
                $notifiable->language === 'fa'
                    ? 'به فراگستر خوش آمدید'
                    : 'Welcome to Faragostar'
            )
            ->view(
                'emails.welcome',
                [
                    'user' => $notifiable,
                ]
            );
    }
}
