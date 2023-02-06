import type ValidatorResult from "@/modules/forms/models/ValidatorResult";

export default class Validator {
    validate: (value: any) => ValidatorResult;

    constructor(fn: (value: any) => ValidatorResult) {
        this.validate = fn;
    }
}
