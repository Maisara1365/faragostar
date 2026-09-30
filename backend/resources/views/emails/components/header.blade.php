<div
    style="
        background: linear-gradient(
            135deg,
            {{ config('company.primary_color') }},
            {{ config('company.secondary_color') }}
        );
        padding:40px;
        text-align:center;
    ">

    <img
        src="{{ asset(config('company.logo')) }}"
        alt="{{ config('company.name') }}"
        width="120"
        height="120"
        style="
            border-radius:50%;
            background:white;
            padding:10px;
            object-fit:cover;
        "
    >

    <h1
        style="
            color:white;
            margin:20px 0 5px;
            font-size:30px;
        ">

        {{ config('company.name') }}

    </h1>

    <div
        style="
            color:#dbeafe;
            font-size:18px;
        ">

        {{ config('company.english_name') }}

    </div>

</div>
