<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Loan extends Model
{
    use SoftDeletes;


    protected $fillable = [
        'member_id',
        'collection_address',
        'item_name',
        'quantity',
        'loan_date',
    ];


    protected $casts = [
        'loan_date' => 'date',
    ];


    public function member()
    {
        return $this->belongsTo(Member::class);
    }
}