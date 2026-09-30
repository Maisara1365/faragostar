<div
    style="
        background:#F8FAFC;
        border-top:1px solid #E5E7EB;
        padding:35px;
        text-align:center;
        font-size:14px;
        color:#6B7280;
    "
>

<div style="margin-bottom:12px;">

🌐

<a
href="{{ config('company.website') }}"
style="
color:{{ config('company.primary_color') }};
text-decoration:none;
">

{{ config('company.website') }}

</a>

</div>

@foreach(config('company.phone') as $phone)

<div style="margin-bottom:8px;">

☎ {{ $phone }}

</div>

@endforeach

<div
style="
margin:18px 0;
line-height:2;
">

{{ config('company.address') }}

</div>

<div
style="
margin-top:25px;
font-size:13px;
color:#9CA3AF;
">

© {{ now()->year }}

{{ config('company.english_name') }}

</div>

</div>
