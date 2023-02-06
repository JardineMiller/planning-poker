import type Validator from "@/modules/forms/models/Validator";

export default class FormInput<T> {
    propertyName: string;
    value?: T;
    validators: Array<Validator>;
    touched: boolean = false;

    constructor(
        propertyName: string,
        initialValue?: T,
        validators: Array<Validator> = []
    ) {
        this.propertyName = propertyName;
        this.value = initialValue;
        this.validators = validators;
    }

    get isValid(): boolean {
        return this.validators?.every(
            (x) => x.validate(this.value).isValid
        );
    }

    get errors(): Array<string> {
        return this.validators
            .filter((x) => !x.validate(this.value).isValid)
            .map((x) => x.validate(this.value).errorMessage);
    }

    update(value: T) {
        this.value = value;
        this.touched = true;
    }
}
