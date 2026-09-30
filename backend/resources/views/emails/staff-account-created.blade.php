<!DOCTYPE html>
<html lang="fa" dir="rtl">

<head>

<meta charset="UTF-8">

<title>ایجاد حساب کاربری</title>

</head>

<body style="margin:0;padding:0;background:#f4f4f4;font-family:tahoma,Arial,sans-serif;">

<div style="max-width:700px;margin:40px auto;background:#ffffff;border-radius:10px;overflow:hidden;border:1px solid #e5e5e5;">

    <div style="background:#0F5132;padding:35px;text-align:center;">

        <img
            src="{{ asset('images/company/logo.png') }}"
            alt="Faragostar"
            style="width:120px;height:120px;border-radius:50%;background:#ffffff;padding:10px;"
        >

    </div>

    <div style="padding:40px;line-height:2;color:#333;">

        <h2 style="margin-top:0;color:#0F5132;">
            سلام {{ $user->name }}
        </h2>

        <p>

            حساب کاربری شما در سیستم
            <strong>فراگستر</strong>
            با موفقیت ایجاد شد.

        </p>

        <p>

            لطفاً ابتدا ایمیل خود را تأیید کرده و سپس با اطلاعات زیر وارد سامانه شوید.

        </p>

        <table
            cellpadding="10"
            cellspacing="0"
            width="100%"
            style="border-collapse:collapse;margin:25px 0;border:1px solid #ddd;"
        >

            <tr>

                <td
                    style="background:#f8f8f8;font-weight:bold;width:180px;"
                >

                    ایمیل

                </td>

                <td>

                    {{ $user->email }}

                </td>

            </tr>

            <tr>

                <td
                    style="background:#f8f8f8;font-weight:bold;"
                >

                    رمز عبور موقت

                </td>

                <td>

                    {{ $temporaryPassword }}

                </td>

            </tr>

        </table>

        <div
            style="
                background:#fff8e1;
                border:1px solid #f5d66d;
                padding:20px;
                border-radius:8px;
                margin:30px 0;
            "
        >

            <strong>

                توجه:

            </strong>

            پس از اولین ورود، باید رمز عبور خود را تغییر دهید.

        </div>

        <div style="text-align:center;margin-top:40px;">

            <a
                href="{{ config('app.frontend_url') }}/login"
                style="
                    display:inline-block;
                    padding:15px 40px;
                    background:#0F5132;
                    color:#ffffff;
                    text-decoration:none;
                    border-radius:8px;
                    font-size:16px;
                "
            >

                ورود به پنل

            </a>

        </div>

    </div>

    <div
        style="
            background:#f8f8f8;
            padding:30px;
            text-align:center;
            color:#666;
            font-size:14px;
            line-height:2;
        "
    >

        شرکت فراگستر

        <br>

        خدمات چاپ، تبلیغات و طراحی

        <br><br>

        این ایمیل به صورت خودکار ارسال شده است.

    </div>

</div>

</body>

</html>