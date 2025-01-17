export class Utiliy {

    private _inputIds: string[] = [];
    private _count = 1;
    private _name = 'name';

    generateGUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0;
            var v = c === 'x' ? r : (r & 0x3 | 0x8); // For UUID v4: set the 13th hex digit to 4
            return v.toString(16);
        });
    }

    generateIds(name: string, count: number) {
        this._count = count;
        this._name = name;
        this._inputIds = [];

        for (let i = 0; i < this._count; i++) {
            this._inputIds.push(`${this._name}_${this.generateGUID().replace('ng', '').slice(0, 10)}`);
        }
    }

    getId(index: number) {
        return this._inputIds[index];
    }

    updateIds() {
        this.generateIds(this._name, this._count);
    }
}