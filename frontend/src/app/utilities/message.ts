export class Message {
    isActive: boolean = false;
    text: string = '';
    title: string = '';
    showConfirm: boolean = true;
    showCancel: boolean = true;

    closeDialog() {
        this.isActive = false;
    }

    openDialog(text: string, title: string) {
        this.text = text;
        this.title = title;
        this.isActive = true;
    }

    showMessage(text: string, title: string) {
        this.openDialog(text, title);
        this.showCancel = false;
    }

    showAction(text: string, title: string) {
        this.openDialog(text, title);
        this.showConfirm = false;
    }
    
    confirmDialog() {
        this.closeDialog();
    }

    get message():Message{
        return this;
    }
}
