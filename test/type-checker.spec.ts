import * as Chai from "chai"
import {TypeChecker} from "../src/type-checker"

describe("TypeChecker", () => {
    it("Should identify 'string'", () => {
        let test = new TypeChecker("string")
        Chai.expect(test.getName()).eq("string")
        Chai.expect(test.isArray()).eq(false)
        Chai.expect(test.isQualifiedName()).eq(false)
        Chai.expect(test.isValid()).eq(true)
    })

    it("Should identify 'boolean'", () => {
        let test = new TypeChecker("boolean")
        Chai.expect(test.getName()).eq("boolean")
        Chai.expect(test.isArray()).eq(false)
        Chai.expect(test.isQualifiedName()).eq(false)
        Chai.expect(test.isValid()).eq(true)
    })

    it("Should identify 'number'", () => {
        let test = new TypeChecker("number")
        Chai.expect(test.getName()).eq("number")
        Chai.expect(test.isArray()).eq(false)
        Chai.expect(test.isQualifiedName()).eq(false)
        Chai.expect(test.isValid()).eq(true)
    })

    it("Should identify 'date'", () => {
        let test = new TypeChecker("date")
        Chai.expect(test.getName()).eq("date")
        Chai.expect(test.isArray()).eq(false)
        Chai.expect(test.isQualifiedName()).eq(false)
        Chai.expect(test.isValid()).eq(true)
    })

    it("Should identify 'string[]'", () => {
        let test = new TypeChecker("string[]")
        Chai.expect(test.getName()).eq("string")
        Chai.expect(test.isArray()).eq(true)
        Chai.expect(test.isQualifiedName()).eq(false)
        Chai.expect(test.isValid()).eq(true)
    })

    it("Should identify 'boolean[]'", () => {
        let test = new TypeChecker("boolean[]")
        Chai.expect(test.getName()).eq("boolean")
        Chai.expect(test.isArray()).eq(true)
        Chai.expect(test.isQualifiedName()).eq(false)
        Chai.expect(test.isValid()).eq(true)
    })

    it("Should identify 'number[]'", () => {
        let test = new TypeChecker("number[]")
        Chai.expect(test.getName()).eq("number")
        Chai.expect(test.isArray()).eq(true)
        Chai.expect(test.isQualifiedName()).eq(false)
        Chai.expect(test.isValid()).eq(true)
    })

    it("Should identify 'date[]'", () => {
        let test = new TypeChecker("date[]")
        Chai.expect(test.getName()).eq("date")
        Chai.expect(test.isArray()).eq(true)
        Chai.expect(test.isQualifiedName()).eq(false)
        Chai.expect(test.isValid()).eq(true)
    })

    it("Should identify 'String'", () => {
        let test = new TypeChecker("String")
        Chai.expect(test.getName()).eq("string")
        Chai.expect(test.isArray()).eq(false)
        Chai.expect(test.isQualifiedName()).eq(false)
        Chai.expect(test.isValid()).eq(true)
    })

    it("Should identify 'Boolean'", () => {
        let test = new TypeChecker("Boolean")
        Chai.expect(test.getName()).eq("boolean")
        Chai.expect(test.isArray()).eq(false)
        Chai.expect(test.isQualifiedName()).eq(false)
        Chai.expect(test.isValid()).eq(true)
    })

    it("Should identify 'Number'", () => {
        let test = new TypeChecker("Number")
        Chai.expect(test.getName()).eq("number")
        Chai.expect(test.isArray()).eq(false)
        Chai.expect(test.isQualifiedName()).eq(false)
        Chai.expect(test.isValid()).eq(true)
    })

    it("Should identify 'Date'", () => {
        let test = new TypeChecker("Date")
        Chai.expect(test.getName()).eq("date")
        Chai.expect(test.isArray()).eq(false)
        Chai.expect(test.isQualifiedName()).eq(false)
        Chai.expect(test.isValid()).eq(true)
    })

    it("Should not valid if provided undefined", () => {
        let test = new TypeChecker(undefined)
        Chai.expect(test.isValid()).eq(false)
    })

    it("Should identify qualified class name", () => {
        let test = new TypeChecker("MyClass, class/path")
        Chai.expect(test.getName()).eq("MyClass")
        Chai.expect(test.isArray()).eq(false)
        Chai.expect(test.isQualifiedName()).eq(true)
        Chai.expect(test.isValid()).eq(true)
    })

    it("Should identify qualified class name array", () => {
        let test = new TypeChecker("MyClass[], class/path")
        Chai.expect(test.getName()).eq("MyClass")
        Chai.expect(test.isArray()).eq(true)
        Chai.expect(test.isQualifiedName()).eq(true)
        Chai.expect(test.isValid()).eq(true)
    })

    it("Should identify non qualified class name", () => {
        let test = new TypeChecker("MyClass")
        Chai.expect(test.isValid()).eq(false)
    })
})