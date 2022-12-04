﻿using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using PlanningPoker.Application.Common.Interfaces.Services;
using PlanningPoker.Domain.Entities;
using PlanningPoker.Infrastructure.Persistence;
using PlanningPoker.Infrastructure.Services;
using PlanningPoker.Infrastructure.Authentication;
using PlanningPoker.Infrastructure.Email;

namespace PlanningPoker.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(
        this IServiceCollection services,
        ConfigurationManager configuration
    )
    {
        services
            .AddSingleton<IDateTimeProvider, DateTimeProvider>()
            .AddAuth(configuration)
            .AddDatabase(configuration)
            .AddEmail(configuration)
            .AddIdentity();

        return services;
    }

    // ReSharper disable once UnusedMethodReturnValue.Local
    private static IServiceCollection AddIdentity(
        this IServiceCollection services
    )
    {
        services
            .AddIdentity<User, IdentityRole>(
                options =>
                {
                    options.Password.RequireDigit = true;
                    options.Password.RequiredLength = 6;
                    options.Password.RequireLowercase = false;
                    options.Password.RequireNonAlphanumeric = true;
                    options.Password.RequireUppercase = true;
                    options.Password.RequiredUniqueChars = 0;

                    options.SignIn.RequireConfirmedEmail = true;
                }
            )
            .AddTokenProvider<DataProtectorTokenProvider<User>>(
                TokenOptions.DefaultProvider
            )
            .AddEntityFrameworkStores<ApplicationDbContext>();

        return services;
    }
}
