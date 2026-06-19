<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Collector extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'phone',
    ];


    public function members()
    {
        return $this->hasMany(Member::class);
    }
}