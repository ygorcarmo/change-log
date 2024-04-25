import jwt from "jsonwebtoken";
import RequestContext from "../utils/RequestContext.js";
import bcrypt from "bcrypt";
const secret = process.env.JWT_SECRET || "";
export const createJWT = (user) => {
    const token = jwt.sign({ id: user.id, username: user.username }, secret);
    return token;
};
export const protect = (req, res, next) => {
    const bearer = req.headers.authorization;
    if (!bearer)
        return res.status(401).json({ message: "Not Authorized" });
    const [, token] = bearer.split(" ");
    if (!token)
        return res.status(401).json({ message: "Not Authorized" });
    try {
        const user = jwt.verify(token, secret);
        RequestContext.bind(req, user);
        next();
    }
    catch (error) {
        console.error(error);
        return res.status(401).json({ message: "Not Authorized" });
    }
};
export const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
};
export const comparePasswords = async (password, hash) => {
    return await bcrypt.compare(password, hash);
};
//# sourceMappingURL=auth.js.map