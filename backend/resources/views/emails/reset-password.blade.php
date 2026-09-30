@extends('emails.layouts.app')

@section('title')

{{ $user->language === 'fa'
    ? 'بازنشانی رمز عبور'
    : 'Reset Password'
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

درخواستی برای بازنشانی رمز عبور حساب شما دریافت شده است.

برای ادامه، لطفاً کد زیر را در صفحه بازنشانی رمز عبور وارد نمایید.

@else

We received a request to reset your account password.

Please enter the verification code below on the password reset page.

@endif

</p>

@include('emails.components.alert', [

'type' => 'warning',

'title' => $user->language === 'fa'
    ? 'کد بازنشانی رمز عبور'
    : 'Password Reset Code',

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
می‌توانید این ایمیل را نادیده بگیرید و امنیت حساب شما حفظ خواهد شد.

@else

If you did not request a password reset,
you can safely ignore this email and your password will remain unchanged.

@endif

</p>

@include('emails.components.divider')

@include('emails.components.signature')

@endsection
