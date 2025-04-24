<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;
use App\Models\Group;
use App\Models\User;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        //
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        $this->registerPolicies();

        // تعريف Gates للمجموعات
        Gate::define('viewAny-group', function (User $user) {
            return in_array($user->role, ['admin', 'instructor']);
        });

        Gate::define('view-group', function (User $user, Group $group) {
            return $user->role === 'admin' || 
                   $user->id === $group->instructor_id || 
                   $group->students->contains($user->id);
        });

        Gate::define('create-group', function (User $user) {
            return in_array($user->role, ['admin', 'instructor']);
        });

        Gate::define('update-group', function (User $user, Group $group) {
            return $user->role === 'admin' || $user->id === $group->instructor_id;
        });

        Gate::define('delete-group', function (User $user, Group $group) {
            return $user->role === 'admin';
        });
    }
} 