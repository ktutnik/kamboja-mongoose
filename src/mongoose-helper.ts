import { Core } from "kamboja"
import * as Mongoose from "mongoose"
import { SchemaGenerator } from "./schema-generator"
import * as H from "./helper"

export class MongooseHelper {
    schemas: { [key: string]: Mongoose.Schema } = {}

    constructor(private pathResolver:Core.PathResolver, classes: Core.QualifiedClassMetaData[]) {
        this.init(classes)
    }

    createModel<T>(name: string, doc?: any) {
        return Mongoose.model<T & Mongoose.Document>(name, this.schemas[name])
    }

    private init(classes: Core.QualifiedClassMetaData[]) {
        let generator = new SchemaGenerator(this.pathResolver)
        classes.forEach(x => {
            let schema = generator.generate(x)
            this.schemas[H.getName(x.name)] = new Mongoose.Schema(schema)
        })
    }
}