import { Core } from "kamboja"
import * as Mongoose from "mongoose"
import { SchemaGenerator } from "./schema-generator"

export class MongooseHelper {
    schemas: { [key: string]: Mongoose.Schema } = {}

    constructor(storage:Core.MetaDataStorage) {
        this.init(storage.getClasses("Model"))
    }

    private init(classes: Core.QualifiedClassMetaData[]) {
        let generator = new SchemaGenerator()
        classes.forEach(x => {
            let schema = generator.generate(x)
            if(schema){
                this.schemas[x.name] = new Mongoose.Schema(schema)
            }
        })
    }
}