import { MongooseHelper } from "./mongoose-helper"
import { Kamboja } from "kamboja"
import * as Mongoose from "mongoose"

export function getStorage(){
    return Kamboja.getOptions().metaDataStorage
}

export { MongooseHelper }