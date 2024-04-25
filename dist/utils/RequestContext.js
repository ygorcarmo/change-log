export default class RequestContext {
    static _bindings = new WeakMap();
    userClaims;
    constructor(userClaims) {
        this.userClaims = userClaims;
    }
    static bind(req, useClaims) {
        const ctx = new RequestContext(useClaims);
        RequestContext._bindings.set(req, ctx);
    }
    static get(req) {
        return RequestContext._bindings.get(req) || null;
    }
}
//# sourceMappingURL=RequestContext.js.map