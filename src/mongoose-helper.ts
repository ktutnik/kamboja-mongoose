import { Core } from "kamboja"
import * as Mongoose from "mongoose"
import { SchemaGenerator } from "./schema-generator"
import * as H from "./helper"

export class MongooseHelper {
    schemas: { [key: string]: Mongoose.Schema } = {}

    constructor(storage:Core.MetaDataStorage) {
        this.init(storage.getClasses("Model"))
    }

    getModel<T extends Mongoose.Document>(name:string){
        return Mongoose.model<T>(name, this.schemas[name])
    }

    private init(classes: Core.QualifiedClassMetaData[]) {
        let generator = new SchemaGenerator()
        classes.forEach(x => {
            let schema = generator.generate(x)
            if(schema){
                this.schemas[H.getName(x.name)] = new Mongoose.Schema(schema)
            }
        })
    }
}