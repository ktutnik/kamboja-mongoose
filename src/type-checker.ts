import { Resolver, Core } from "kamboja"

export class TypeChecker {
    private name: string;
    private qualified: boolean
    private array: boolean = false
    private valid: boolean = false;

    constructor(private type: string) {
        if (type) {
            let qualified = new Resolver.QualifiedName(type)
            this.qualified = qualified.isValid()
            if (this.qualified) {
                this.name = qualified.className;
                this.valid = true
                this.array = qualified.isArray()
            }
            else {
                if (type.indexOf("[]", type.length - 2) > -1) {
                    this.array = true
                    this.name = type.substr(0, type.length - 2).toLowerCase()
                }
                else this.name = type.toLowerCase();
                if (Core.ValidationTypesAccepted
                    .some(x => this.name.toLowerCase() == x)) {
                    this.valid = true
                }
            }
        }
    }

    isValid() { return this.valid }
    isArray() { return this.array }
    isQualifiedName() { return this.qualified }
    getName() { return this.name }
}