﻿using MediatR;
using ErrorOr;
using Microsoft.AspNetCore.Identity;
using PlanningPoker.Application.Authentication.Common;
using PlanningPoker.Application.Common.Interfaces.Authentication;
using PlanningPoker.Domain.Common.Errors;
using PlanningPoker.Domain.Entities;

namespace PlanningPoker.Application.Authentication.Commands.ConfirmEmail;

public class ConfirmEmailCommandHandler
    : IRequestHandler<
          ConfirmEmailCommand,
          ErrorOr<AuthenticationResult>
      >
{
    private readonly UserManager<User> _userManager;
    private readonly IJwtGenerator _jwtGenerator;

    public ConfirmEmailCommandHandler(
        UserManager<User> userManager,
        IJwtGenerator jwtGenerator
    )
    {
        this._userManager = userManager;
        this._jwtGenerator = jwtGenerator;
    }

    public async Task<ErrorOr<AuthenticationResult>> Handle(
        ConfirmEmailCommand cmd,
        CancellationToken cancellationToken
    )
    {
        var user = await this._userManager.FindByEmailAsync(
            cmd.Email
        );

        if (user == null)
        {
            return Errors.Authentication.InvalidCredentials;
        }

        var result = await this._userManager.ConfirmEmailAsync(
            user,
            cmd.Token
        );

        if (!result.Succeeded)
        {
            return Errors.Authentication.InvalidCredentials;
        }

        var token = this._jwtGenerator.GenerateToken(user);

        return new AuthenticationResult(user, token);
    }
}
