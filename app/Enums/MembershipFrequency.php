<?php

namespace App\Enums;

enum MembershipFrequency: string
{
    case MONTHLY = 'MONTHLY';
    case SEMIANNUAL = 'SEMIANNUAL';
    case ANNUAL = 'ANNUAL';
}