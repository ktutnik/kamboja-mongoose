import * as Chai from "chai"
import { TypeConverter } from "../src/type-converter"
import * as Mongoose from "mongoose"
import {Resolver} from "kamboja"

describe("TypeConverter", () => {
    it("Should convert 'string'", () => {
        let test = new TypeConverter(new Resolver.DefaultPathResolver(__dirname))
        Chai.expect(test.convert("string")).eq(String)
    })

    it("Should convert 'boolean'", () => {
        let test = new TypeConverter(new Resolver.DefaultPathResolver(__dirname))
        Chai.expect(test.convert("boolean")).eq(Boolean)
    })

    it("Should convert 'number'", () => {
        let test = new TypeConverter(new Resolver.DefaultPathResolver(__dirname))
        Chai.expect(test.convert("number")).eq(Number)
    })

    it("Should convert 'date'", () => {
        let test = new TypeConverter(new Resolver.DefaultPathResolver(__dirname))
        Chai.expect(test.convert("date")).eq(Date)
    })

    it("Should convert 'string[]'", () => {
        let test = new TypeConverter(new Resolver.DefaultPathResolver(__dirname))
        Chai.expect(test.convert("string[]")).deep.eq([String])
    })

    it("Should convert 'boolean[]'", () => {
        let test = new TypeConverter(new Resolver.DefaultPathResolver(__dirname))
        Chai.expect(test.convert("boolean[]")).deep.eq([Boolean])
    })

    it("Should convert 'number[]'", () => {
        let test = new TypeConverter(new Resolver.DefaultPathResolver(__dirname))
        Chai.expect(test.convert("number[]")).deep.eq([Number])
    })

    it("Should convert 'date[]'", () => {
        let test = new TypeConverter(new Resolver.DefaultPathResolver(__dirname))
        Chai.expect(test.convert("date[]")).deep.eq([Date])
    })

    it("Should provide qualified class name", () => {
        let test = new TypeConverter(new Resolver.DefaultPathResolver(__dirname))
        Chai.expect(test.convert("MyClass, class/path")).deep.eq({
            type: Mongoose.Schema.Types.ObjectId,
            ref: "MyClass"
        })
    })

    it("Should provide qualified class name array", () => {
        let test = new TypeConverter(new Resolver.DefaultPathResolver(__dirname))
        Chai.expect(test.convert("MyClass[], class/path")).deep.eq([{
            type: Mongoose.Schema.Types.ObjectId,
            ref: "MyClass"
        }])
    })
})