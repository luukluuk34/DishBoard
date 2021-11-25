export abstract class Entity {
    readonly _id: number | string | undefined;
    readonly userid?: number | undefined;

    constructor(values: any){
        this._id = values ? values._id : undefined
        this.userid = values ? values.userid : undefined
    }
}