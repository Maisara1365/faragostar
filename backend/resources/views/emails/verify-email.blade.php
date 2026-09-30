@extends('emails.layouts.app')

@section('title')

{{ $user->language === 'fa'
    ? 'تأیید ایمیل'
    : 'Email Verification'
}}

@endsection

@section('content')

<h2>

@if($user->language === 'fa')

سلام {{ $user->name }} عزیز،

@else

Hello {{ $user->name }},

@endif

</h2>

<p>

@if($user->language === 'fa')

از ثبت‌نام شما در
<strong>{{ config('company.name') }}</strong>
سپاسگزاریم.

برای فعال‌سازی حساب کاربری، لطفاً کد زیر را در صفحه تأیید ایمیل وارد نمایید.

@else

Thank you for registering with
<strong>{{ config('company.name') }}</strong>.

Please use the verification code below to activate your account.

@endif

</p>

@include('emails.components.alert', [

'type' => 'info',

'title' => $user->language === 'fa'
    ? 'کد تأیید ایمیل'
    : 'Email Verification Code',

'message' => $user->language === 'fa'
    ? 'این کد فقط به مدت ۱۰ دقیقه معتبر است.'
    : 'This code will expire in 10 minutes.'

])

<div
style="
margin:40px 0;
text-align:center;
">

<div
style="
display:inline-block;
padding:18px 40px;
font-size:38px;
font-weight:bold;
letter-spacing:10px;
background:#183B73;
color:#ffffff;
border-radius:14px;
">

{{ $otp }}

</div>

</div>

<p
style="
text-align:center;
color:#6B7280;
font-size:14px;
">

@if($user->language === 'fa')

اگر شما این درخواست را ارسال نکرده‌اید،
می‌توانید این ایمیل را نادیده بگیرید.

@else

If you didn't create this account,
you can safely ignore this email.

@endif

</p>

@include('emails.components.divider')

@include('emails.components.signature')

@endsection
