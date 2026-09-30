<!DOCTYPE html>
<html lang="fa" dir="rtl">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>@yield('title')</title>

    <style>

        body{

            margin:0;

            padding:30px;

            background:#f4f7fb;

            font-family:Tahoma,Arial,sans-serif;

            direction:rtl;

        }

        .container{

            max-width:650px;

            margin:auto;

            background:#ffffff;

            border-radius:16px;

            overflow:hidden;

            box-shadow:0 8px 30px rgba(0,0,0,.08);

        }

        .content{

            padding:40px;

            color:#374151;

            line-height:2;

            font-size:15px;

        }

        h2{

            margin-top:0;

            color:{{ config('company.primary_color') }};

        }

        p{

            margin:18px 0;

        }

    </style>

</head>

<body>

<div class="container">

    @include('emails.components.banner')

    <div class="content">

        @yield('content')

    </div>

    @include('emails.components.footer')

</div>

</body>

</html>
