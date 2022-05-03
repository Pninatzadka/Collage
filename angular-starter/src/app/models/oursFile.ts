export class OursFile {
    public file: File;
    public isSuccess: boolean;
    public isCancel: boolean;
    public isError: boolean;
    public progress: number;
    public sending: boolean;

    constructor() {

        this.isSuccess = false;
        this.isCancel = false;
        this.isError = false;
        this.progress = 0;
        this.sending = false;

    }

}