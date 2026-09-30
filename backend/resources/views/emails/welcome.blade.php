@extends('emails.layouts.app')

@section('title')

{{ $user->language === 'fa'
    ? 'به فراگستر خوش آمدید'
    : 'Welcome to Faragostar'
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

@include('emails.components.alert', [

'type' => 'success',

'title' => $user->language === 'fa'
    ? 'حساب کاربری شما با موفقیت فعال شد.'
    : 'Your account has been successfully activated.',

'message' => $user->language === 'fa'
    ? 'ثبت‌نام شما با موفقیت تکمیل شد و اکنون می‌توانید از تمامی خدمات شرکت تبلیغاتی فراگستر استفاده نمایید.'
    : 'Your registration is complete. You can now access all Faragostar Advertising Company services.'

])

<p>

@if($user->language === 'fa')

از اینکه
<strong>{{ config('company.name') }}</strong>
را برای خدمات تبلیغاتی خود انتخاب کرده‌اید،
صمیمانه سپاسگزاریم.

@else

Thank you for choosing
<strong>{{ config('company.name') }}</strong>
for your advertising and digital marketing needs.

@endif

</p>

<p>

@if($user->language === 'fa')

اکنون می‌توانید:

@else

You can now:

@endif

</p>

<div
style="
background:#F8FAFC;
border:1px solid #E5E7EB;
border-radius:12px;
padding:20px;
margin:25px 0;
line-height:2.2;
">

@if($user->language === 'fa')

✅ ثبت سفارش خدمات تبلیغاتی

<br>

✅ مشاهده وضعیت سفارش‌ها

<br>

✅ ارسال پیام به تیم پشتیبانی

<br>

✅ مدیریت اطلاعات حساب کاربری

@else

✅ Submit advertising service orders

<br>

✅ Track your order progress

<br>

✅ Contact our support team

<br>

✅ Manage your account settings

@endif

</div>

<p>

@if($user->language === 'fa')

تیم فراگستر همواره آماده است تا بهترین خدمات تبلیغاتی را با بالاترین کیفیت به شما ارائه دهد.

@else

Our team is committed to delivering creative, high-quality advertising solutions to help your business grow.

@endif

</p>

@include('emails.components.button', [

'url' => config('company.website'),

'text' => $user->language === 'fa'
    ? 'ورود به وب‌سایت'
    : 'Visit Website'

])

@include('emails.components.divider')

@include('emails.components.signature')

@endsection
