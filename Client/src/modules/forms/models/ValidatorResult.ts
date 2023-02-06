export default class ValidatorResult {
    isValid: boolean = true;
    errorMessage: string = "";

    constructor(isValid: boolean, errorMessage: string) {
        this.isValid = isValid;
        this.errorMessage = errorMessage;
    }
}
