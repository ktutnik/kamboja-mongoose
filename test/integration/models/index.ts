import { val } from "kamboja"
import { Document } from "mongoose"

export class UserModel  {
    @val.type("string")
    email: string

    @val.type("string")
    displayName: string

    @val.type("date")
    dateOfBirth: Date

    @val.type("number")
    rate:number
}

export class CategoryModel {
    @val.type("string")
    name:string
}

export class ItemModel {
    @val.type("string")
    barCode: string

    @val.type("string")
    name: string

    @val.type("CategoryModel, test/integration/models/index")
    category:CategoryModel

    @val.type("number")
    price: number

    @val.type("UserModel, test/integration/models/index")
    createdBy:UserModel

    @val.type("date")
    createdOn: Date
}