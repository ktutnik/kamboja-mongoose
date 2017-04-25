import { Core, HttpStatusError } from "kamboja"

const ActionWithIds = ["get", "delete", "modify", "replace"]
export class IdValidatorInterceptor implements Core.RequestInterceptor {
    intercept(i: Core.Invocation): Promise<Core.ActionResult> {
        if(i.hasController() 
            && i.classMetaData.baseClass == "ApiController"
            && ActionWithIds.some(x => x == i.methodName)){
            if(i.classMetaData.decorators.some(x => x.name == "shortid")){
                
            }
        }
        return i.execute()
    }
}