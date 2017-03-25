import * as Chai from "chai"
import { MongooseHelper } from "../../src"
import * as H from "../helper"
import * as Mongoose from "mongoose"
import { Core } from "kamboja"
import * as Kecubung from "kecubung"
import { UserModel, CategoryModel, ItemModel } from "./models"
import * as Util from "util"

describe("Integration Test", () => {
    let test: MongooseHelper
    before(async () => {
        require('mongoose').Promise = global.Promise
        await Mongoose.connect("mongodb://localhost/test")
        test = new MongooseHelper(H.fromFile("test/integration/models/index.js"))
    })

    after(async () => {
        await Mongoose.disconnect()
    })

    it("Should save/load simple object", async () => {
        let User = test.createModel<UserModel>("User")
        await User.remove(x => { })
        let dob = new Date()
        let user = new User({
            email: "nobita.nobi@gmail.com",
            displayName: "Nobita Nobi",
            dateOfBirth: dob,
            rate: 5
        })
        await user.save()
        let result = await User.find().exec()
        Chai.expect(result[0].email).eq("nobita.nobi@gmail.com")
        Chai.expect(result[0].displayName).eq("Nobita Nobi")
        Chai.expect(result[0].dateOfBirth.toDateString()).eq(dob.toDateString())
        Chai.expect(result[0].rate).eq(5)
        //cleanup
    })

    it("Should save/load object with reference", async () => {
        let Item = test.createModel<ItemModel & Mongoose.Document>("Item")
        let Category = test.createModel<CategoryModel & Mongoose.Document>("Category")
        let User = test.createModel<UserModel & Mongoose.Document>("User")

        await Promise.all([
            User.remove(x => { }),
            Category.remove(x => { }),
            Item.remove(x => { })
        ])

        let categoryModel = new Category(<CategoryModel>{
            name: "The Category"
        })
        let category = await categoryModel.save()
        let dob = new Date()
        let userModel = new User(<UserModel>{
            email: "nobita.nobi@gmail.com",
            displayName: "Nobita Nobi",
            dateOfBirth: dob,
            rate: 5
        })
        let user = await userModel.save()
        let itemModel = new Item(<ItemModel>{
            category: category._id,
            createdBy: user._id,
            name: "My Item"
        })
        let item = await itemModel.save()
        let result = <ItemModel[]>await Item.find()
            .populate("createdBy")
            .populate("category")
            .lean()
            .exec()
        Chai.expect(result[0].name).eq("My Item")
        let createdBy = result[0].createdBy;
        if (createdBy instanceof UserModel) {
            Chai.expect(createdBy.email).eq("nobita.nobi@gmail.com")
            Chai.expect(createdBy.displayName).eq("Nobita Nobi")
            Chai.expect(createdBy.dateOfBirth.toDateString()).eq(dob.toDateString())
            Chai.expect(createdBy.rate).eq(5)
        }
        let cat = result[0].category
        if(cat instanceof CategoryModel){
            Chai.expect(cat.name).eq("The Category")
        }
    })
})