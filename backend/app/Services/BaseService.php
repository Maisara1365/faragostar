<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;
use Throwable;

abstract class BaseService
{
    /**
     * Execute a callback within a database transaction.
     */
    protected function transaction(callable $callback): mixed
    {
        return DB::transaction($callback);
    }

    /**
     * Execute a callback and rethrow any exception.
     * This gives us one place to enhance logging later.
     */
    protected function execute(callable $callback): mixed
    {
        try {
            return $callback();
        } catch (Throwable $exception) {
            throw $exception;
        }
    }
}
