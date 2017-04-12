import { val } from "kamboja"
import { Document, Schema } from "mongoose"

export class UserModel  {
    @val.type("string")
    email: string

    @val.type("string")
    displayName: string

    @val.type("date")
    dateOfBirth: Date

    @val.type("number")
    rate:number

    @val.type("date")
    createdAt:Date
}

export class CategoryModel {
    @val.type("string")
    name:string
}

export class ItemModel {
    @val.type("string")
    name: string

    @val.type("CategoryModel, models/index")
    category:CategoryModel | Schema.Types.ObjectId

    @val.type("UserModel, models/index")
    createdBy:UserModel | Schema.Types.ObjectId
}