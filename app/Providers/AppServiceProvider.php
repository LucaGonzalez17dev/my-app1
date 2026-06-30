<?php

namespace App\Providers;

use Carbon\CarbonImmutable;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\ServiceProvider;
use Illuminate\Validation\Rules\Password;
use App\Repositories\CollectorRepository;
use App\Repositories\Interfaces\CollectorRepositoryInterface;
use App\Repositories\MemberRepository;
use App\Repositories\Interfaces\MemberRepositoryInterface;
use App\Repositories\LoanRepository;
use App\Repositories\Interfaces\LoanRepositoryInterface;
use App\Repositories\OverdueInstallmentRepository;
use App\Repositories\Interfaces\OverdueInstallmentRepositoryInterface;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(
            CollectorRepositoryInterface::class,
            CollectorRepository::class
        );

        $this->app->bind(
            MemberRepositoryInterface::class,
            MemberRepository::class
        );

        $this->app->bind(
            LoanRepositoryInterface::class,
            LoanRepository::class
        );

        $this->app->bind(
            OverdueInstallmentRepositoryInterface::class,
            OverdueInstallmentRepository::class
        );
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->configureDefaults();
    }

    /**
     * Configure default behaviors for production-ready applications.
     */
    protected function configureDefaults(): void
    {
        Date::use(CarbonImmutable::class);

        DB::prohibitDestructiveCommands(
            app()->isProduction(),
        );

        Password::defaults(fn (): ?Password => app()->isProduction()
            ? Password::min(12)
                ->mixedCase()
                ->letters()
                ->numbers()
                ->symbols()
                ->uncompromised()
            : null,
        );
    }
}
