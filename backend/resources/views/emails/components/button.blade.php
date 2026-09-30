@props([
    'url',
    'text'
])

<table
    role="presentation"
    cellspacing="0"
    cellpadding="0"
    border="0"
    align="center"
    style="margin:35px auto;"
>
<tr>

<td
    align="center"
    bgcolor="{{ config('company.primary_color') }}"
    style="
        border-radius:12px;
    "
>

<a
    href="{{ $url }}"
    target="_blank"

    style="
        display:inline-block;
        padding:16px 36px;
        color:#ffffff;
        text-decoration:none;
        font-size:16px;
        font-weight:bold;
    "
>

{{ $text }}

</a>

</td>

</tr>
</table>
