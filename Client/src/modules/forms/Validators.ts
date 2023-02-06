import ValidatorResult from "@/modules/forms/models/ValidatorResult";
import Validator from "@/modules/forms/models/Validator";

export default class Validators {
    static required(): Validator {
        return new Validator(
            (
                value: any,
                customMsg: string | null = null
            ): ValidatorResult => {
                const exists = value !== undefined && value !== null;

                const hasLength =
                    exists && value?.length !== undefined
                        ? value.length > 0
                        : true;

                const isValid = exists && hasLength;
                const msg = isValid
                    ? ""
                    : customMsg || "This field is required";

                return new ValidatorResult(isValid, msg);
            }
        );
    }

    static minLength(
        length: number,
        customMsg: string | null = null
    ): Validator {
        const min = length;

        return new Validator((value: string): ValidatorResult => {
            const isValid =
                value !== undefined && value.length >= min;
            const msg = isValid
                ? ""
                : customMsg ||
                  `This field must be at least ${min} characters`;

            return new ValidatorResult(isValid, msg);
        });
    }

    static maxLength(
        length: number,
        customMsg: string | null = null
    ): Validator {
        const max = length;

        return new Validator((value: string): ValidatorResult => {
            const isValid =
                value !== undefined && value.length <= max;
            const msg = isValid
                ? ""
                : customMsg ||
                  `This field must be no greater than ${max} characters`;

            return new ValidatorResult(isValid, msg);
        });
    }

    static email(): Validator {
        return new Validator(
            (
                value: string,
                customMsg: string | null = null
            ): ValidatorResult => {
                const isValid =
                    value !== undefined &&
                    /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);

                const msg = isValid
                    ? ""
                    : customMsg ||
                      "This field must contain a valid email address";

                return new ValidatorResult(isValid, msg);
            }
        );
    }

    static minNumber(
        min: number,
        customMsg: string | null = null
    ): Validator {
        return new Validator((value: string): ValidatorResult => {
            const exists = value !== undefined;
            const number = exists ? parseInt(value) : 0;

            const isValid = number >= min;
            const msg = isValid
                ? ""
                : customMsg || `Minimum value: ${min}`;

            return new ValidatorResult(isValid, msg);
        });
    }

    static maxNumber(
        max: number,
        customMsg: string | null = null
    ): Validator {
        return new Validator((value: string): ValidatorResult => {
            const exists = value !== undefined;
            const number = exists ? parseInt(value) : 0;

            const isValid = number <= max;
            const msg = isValid
                ? ""
                : customMsg || `Maximum value: ${max}`;

            return new ValidatorResult(isValid, msg);
        });
    }

    static pattern(
        regex: RegExp,
        customMsg: string | null = null
    ): Validator {
        return new Validator((value: string): ValidatorResult => {
            const exists = value !== undefined;
            const isValid = exists && regex.test(value);

            const msg = isValid
                ? ""
                : customMsg ||
                  "This field does not match the required pattern";

            return new ValidatorResult(isValid, msg);
        });
    }
}
