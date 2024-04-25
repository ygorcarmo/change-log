import { Request } from "express"
import { UserClaims } from "../types.js"

export default class RequestContext {
  static _bindings = new WeakMap<Request, RequestContext>()

  public userClaims: UserClaims

  constructor(userClaims: UserClaims) {
    this.userClaims = userClaims
  }

  static bind(req: Request, useClaims: UserClaims): void {
    const ctx = new RequestContext(useClaims)
    RequestContext._bindings.set(req, ctx)
  }

  static get(req: Request): RequestContext | null {
    return RequestContext._bindings.get(req) || null
  }
}
