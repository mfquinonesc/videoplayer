export class Utiliy {

    private _inputIds: string[] = [];

    generateGUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0;
            var v = c === 'x' ? r : (r & 0x3 | 0x8); // For UUID v4: set the 13th hex digit to 4
            return v.toString(16);
        });
    }

    generateIds(name: string, n: number) {
        this._inputIds = [];

        for (let i = 0; i < n; i++) {
            this._inputIds.push(`${name}_${this.generateGUID().replace('ng', '').slice(0, 10)}`);
        }
    }

    getId(index:number){
        return this._inputIds[index];
    }
}