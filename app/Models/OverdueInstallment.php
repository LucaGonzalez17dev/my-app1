<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OverdueInstallment extends Model
{
    protected $fillable = [
        'member_id',
        'period',
    ];

    protected function casts(): array
    {
        return [
            'period' => 'date',
        ];
    }

    public function member()
    {
        return $this->belongsTo(Member::class);
    }
}