﻿using System;
using Microsoft.Extensions.Options;
using Moq;
using PlanningPoker.Application.Common.Interfaces.Services;
using PlanningPoker.Domain.Entities;
using PlanningPoker.Infrastructure.Authentication;
using Shouldly;
using Xunit;

namespace PlanningPoker.Application.Tests.Infrastructure.Tests.Authentication;

public class JwtGeneratorTests
{
    private readonly Mock<IDateTimeProvider> _dateTimeProviderMock;
    private readonly Mock<IOptions<JwtSettings>> _jwtSettingsMock;

    private readonly User _user1 =
        new()
        {
            FirstName = "test",
            LastName = "user1",
            Email = "test@user1.com"
        };

    public JwtGeneratorTests()
    {
        this._dateTimeProviderMock = new Mock<IDateTimeProvider>();
        this._dateTimeProviderMock
            .Setup(x => x.UtcNow)
            .Returns(new DateTime(2023, 1, 1));

        this._jwtSettingsMock = new Mock<IOptions<JwtSettings>>();
        this._jwtSettingsMock
            .Setup(x => x.Value)
            .Returns(
                new JwtSettings
                {
                    Secret = "super-secret-secret",
                    Issuer = "issuer",
                    Audience = "audience",
                    ExpiryMinutes = 60
                }
            );
    }

    [Fact]
    public void GenerateToken_GivenValidInput_ProvidesAToken()
    {
        // Arrange
        var generator = new JwtGenerator(
            this._dateTimeProviderMock.Object,
            this._jwtSettingsMock.Object
        );

        // Act
        var token1 = generator.GenerateToken(this._user1);

        // Assert
        token1.ShouldNotBeNull();
    }
}
