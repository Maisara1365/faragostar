<div
    style="
        background: linear-gradient(135deg,
            {{ config('company.primary_color') }} 0%,
            {{ config('company.secondary_color') }} 100%);
        padding:35px;
        text-align:center;
    "
>

    <img
        src="{{ asset(config('company.logo')) }}"
        alt="{{ config('company.name') }}"
        width="110"
        height="110"
        style="
            border-radius:50%;
            background:#ffffff;
            padding:8px;
            object-fit:cover;
            box-shadow:0 6px 18px rgba(0,0,0,.15);
        "
    >

    <h1
        style="
            color:#ffffff;
            margin:20px 0 8px;
            font-size:28px;
            font-weight:bold;
        "
    >
        {{ config('company.name') }}
    </h1>

    <div
        style="
            color:#EAF6FF;
            font-size:18px;
        "
    >
        {{ config('company.english_name') }}
    </div>

</div>
