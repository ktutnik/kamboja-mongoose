import { TypeChecker } from "./type-checker"
import * as Mongoose from "mongoose"
import { Core } from "kamboja"

export class TypeConverter {
    constructor(private pathResolver: Core.PathResolver) { }

    convert(type: string): any {
        let checker = new TypeChecker(type, this.pathResolver);
        let conversion;
        if (checker.isQualifiedName())
            conversion = {
                type: Mongoose.Schema.Types.ObjectId,
                ref: checker.getName()
            }
        else if (checker.getName() == "string")
            conversion = String
        else if (checker.getName() == "number")
            conversion = Number
        else if (checker.getName() == "boolean")
            conversion = Boolean
        else
            conversion = Date
        if (checker.isArray()) return [conversion]
        else return conversion
    }
}