import * as Chai from "chai"
import { MongooseHelper } from "../../src"
import * as H from "../helper"
import * as Mongoose from "mongoose"
import { Core } from "kamboja"
import * as Kecubung from "kecubung"
import { UserModel, CategoryModel, ItemModel } from "./models"

class LocalStorage implements Core.MetaDataStorage {
    get(classId: string): Core.QualifiedClassMetaData {
        return
    }

    getFiles(category: Core.MetaDataLoaderCategory): Kecubung.ParentMetaData[] {
        return
    }

    getClasses(category: Core.MetaDataLoaderCategory): Core.QualifiedClassMetaData[] {
        return H.fromFile("test/integration/models/index.js")
    }
}

describe("Integration Test", () => {
    let test:MongooseHelper;

    before(async () => {
        require('mongoose').Promise = global.Promise
        await Mongoose.connect("mongodb://localhost/test")
    })

    after(async () => {
        await Mongoose.disconnect()
    })

    beforeEach(async () => {
        test = new MongooseHelper(new LocalStorage())
    })


    it("Should save/load simple object", async () => {
        let test = new MongooseHelper(new LocalStorage())
        let UserModel = test.getModel<UserModel & Mongoose.Document>("User")
        
        let user = new UserModel({
            email: "nobita.nobi@gmail.com",
            displayName: "Nobita Nobi",
            dateOfBirth: new Date(),
            rate: 5
        })
        await user.save()
        let result = await UserModel.find()
        console.log(result)
        Chai.expect(result[0].email).eq("nobita.nobi@gmail.com")
        Chai.expect(result[0].displayName).eq("Nobita Nobi")
        //cleanup
        await UserModel.remove(x => {})
    })


})