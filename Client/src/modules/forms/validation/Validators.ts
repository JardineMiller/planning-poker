﻿import { ValidationFnResult } from "@/modules/forms/validation/ValidationFnResult";
import type { IValidator } from "@/modules/forms/validation/IValidator";
import { EMAIL_REGEX, hasLengthProperty } from "@/utils/utils";

export enum ValidatorType {
    required,
    email,
    minLength,
    maxLength,
    minNumber,
    maxNumber,
    pattern,
    custom,
}

export class Validators {
    private static exists<T>(val: T | undefined | null): boolean {
        return (
            val !== undefined &&
            val !== null &&
            this.hasLength(val, (len) => len > 0)
        );
    }

    private static hasLength<T>(
        val: T,
        predicate: (length: number) => boolean
    ): boolean {
        return hasLengthProperty(val) ? predicate(val.length) : false;
    }

    public static required<T>(
        customMsg: string | null = null
    ): IValidator<T> {
        return {
            type: ValidatorType.required,
            validate: (value: T): ValidationFnResult => {
                const isValid = this.exists(value);

                const msg = isValid
                    ? ""
                    : customMsg || "This field is required";

                return new ValidationFnResult(isValid, msg);
            },
        };
    }

    static minLength<T>(
        length: number,
        customMsg: string | null = null
    ): IValidator<T> {
        const min = length;

        return {
            type: ValidatorType.minLength,
            validate: (value: T): ValidationFnResult => {
                const isValid =
                    !this.exists(value) ||
                    this.hasLength(value, (length) => length >= min);

                const msg = isValid
                    ? ""
                    : customMsg ||
                      `This field must be at least ${min} characters`;

                return new ValidationFnResult(isValid, msg);
            },
        };
    }

    static maxLength<T>(
        length: number,
        customMsg: string | null = null
    ): IValidator<T> {
        const max = length;

        return {
            type: ValidatorType.maxLength,
            validate: (value: T): ValidationFnResult => {
                const isValid =
                    !this.exists(value) ||
                    this.hasLength(value, (length) => length <= max);

                const msg = isValid
                    ? ""
                    : customMsg ||
                      `This field must be no greater than ${max} characters`;

                return new ValidationFnResult(isValid, msg);
            },
        };
    }

    static email(
        customMsg: string | null = null
    ): IValidator<string> {
        return {
            type: ValidatorType.email,
            validate: (value: string): ValidationFnResult => {
                const isValid =
                    !this.exists(value) || EMAIL_REGEX.test(value);

                const msg = isValid
                    ? ""
                    : customMsg ||
                      "This field must contain a valid email address";

                return new ValidationFnResult(isValid, msg);
            },
        };
    }

    static minNumber(
        min: number,
        customMsg: string | null = null
    ): IValidator<number> {
        return {
            type: ValidatorType.minNumber,
            validate: (value: number): ValidationFnResult => {
                const isValid = !this.exists(value) || value >= min;

                const msg = isValid
                    ? ""
                    : customMsg || `Minimum value: ${min}`;

                return new ValidationFnResult(isValid, msg);
            },
        };
    }

    static maxNumber(
        max: number,
        customMsg: string | null = null
    ): IValidator<number> {
        return {
            type: ValidatorType.maxNumber,
            validate: (value: number): ValidationFnResult => {
                const isValid = !this.exists(value) || value <= max;

                const msg = isValid
                    ? ""
                    : customMsg || `Maximum value: ${max}`;

                return new ValidationFnResult(isValid, msg);
            },
        };
    }

    static pattern(
        regex: RegExp,
        customMsg: string | null = null
    ): IValidator<string> {
        return {
            type: ValidatorType.pattern,
            validate: (value: string): ValidationFnResult => {
                const isValid =
                    !this.exists(value) || regex.test(value);

                const msg = isValid
                    ? ""
                    : customMsg ||
                      "This field does not match the required pattern";

                return new ValidationFnResult(isValid, msg);
            },
        };
    }

    static custom<T>(
        isValidCallback: (input: T) => boolean,
        customMsg: string | null = null
    ): IValidator<T> {
        return {
            type: ValidatorType.custom,
            validate: (value: T): ValidationFnResult => {
                const isValid =
                    !this.exists(value) || isValidCallback(value);

                const msg = isValid
                    ? ""
                    : customMsg || "This field is invalid";

                return new ValidationFnResult(isValid, msg);
            },
        };
    }
}
