<?php

namespace App\Models;

use App\Enums\MembershipFrequency;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Member extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'full_name',
        'national_id',
        'phone',
        'collection_address',
        'membership_frequency',
        'collector_id',
    ];


    protected function casts(): array
    {
        return [
            'membership_frequency' => MembershipFrequency::class,
        ];
    }

    public function collector()
    {
        return $this->belongsTo(Collector::class);
    }

    public function loans()
    {
        return $this->hasMany(Loan::class);
    }
}