import type FormInput from "@/modules/forms/models/FormInput";

export default class FormModel {
    inputs: Array<FormInput<any>>;

    constructor(inputs: Array<FormInput<any>> = []) {
        this.inputs = inputs;
    }

    get(inputName: string) {
        return this.inputs.find((x) => x.propertyName === inputName);
    }

    get isValid(): boolean {
        return this.inputs.every((x) => x.isValid);
    }

    get values(): { [key: string]: any } {
        return this.inputs.reduce(
            (acc: { [index: string]: any }, x) => {
                acc[x.propertyName] =
                    x.value !== undefined ? x.value : null;
                return acc;
            },
            {}
        );
    }
}
