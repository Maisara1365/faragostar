<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use App\Traits\ApiResponseTrait;

abstract class Controller
{
    use AuthorizesRequests, ValidatesRequests, ApiResponseTrait;
}
