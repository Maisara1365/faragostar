@php

$type = $type ?? 'info';

$colors = [

    'info' => [
        'background' => '#EFF6FF',
        'border' => '#3B82F6',
        'text' => '#1E40AF',
        'icon' => 'ℹ️',
    ],

    'success' => [
        'background' => '#ECFDF5',
        'border' => '#10B981',
        'text' => '#065F46',
        'icon' => '✅',
    ],

    'warning' => [
        'background' => '#FFFBEB',
        'border' => '#F59E0B',
        'text' => '#92400E',
        'icon' => '⚠️',
    ],

    'danger' => [
        'background' => '#FEF2F2',
        'border' => '#EF4444',
        'text' => '#991B1B',
        'icon' => '❌',
    ],

];

$style = $colors[$type];

@endphp

<div
    style="
        background:{{ $style['background'] }};
        border-right:5px solid {{ $style['border'] }};
        border-radius:12px;
        padding:18px 22px;
        margin:30px 0;
        color:{{ $style['text'] }};
        line-height:2;
    "
>

<div
    style="
        font-weight:bold;
        margin-bottom:8px;
    "
>

{{ $style['icon'] }}

{{ $title ?? '' }}

</div>

<div>

{{ $slot ?? $message ?? '' }}

</div>

</div>
