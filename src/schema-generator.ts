import { Core } from "kamboja"
import { TypeConverter } from "./type-converter"
import { TypeChecker } from "./type-checker"
import * as Kecubung from "kecubung"
import * as Shortid from "shortid"

export class SchemaGenerator {
    constructor(private pathResolver: Core.PathResolver) { }

    generate(clazz: Core.QualifiedClassMetaData) {
        let schema: any = {}
        if (!clazz.properties) return
        //shortid
        if (clazz.decorators && clazz.decorators.some(x => x.name == "shortid")) {
            schema._id = {
                type: String,
                'default': Shortid.generate
            }
        }
        let converter = new TypeConverter(this.pathResolver)
        clazz.properties.forEach(x => {
            let type = this.getType(x, clazz.name)
            schema[x.name] = converter.convert(type)
        })
        return schema;
    }

    private getType(property: Kecubung.PropertyMetaData, typeName: string) {
        let decorators = property.decorators.filter(x => x.name == "type");
        if (decorators.length > 1) throw new Error(`Multiple @val.type found in [${typeName}]`)
        let decorator = decorators[0]
        let parameter = <Kecubung.PrimitiveValueMetaData>decorator.parameters[0]
        let type: string = parameter.value;
        let checker = new TypeChecker(type, this.pathResolver)
        if (!checker.isValid()) throw new Error(`Invalid type found in @val.type in [${typeName}]`)
        return type
    }
}