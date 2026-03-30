import {verifyToken} from "../auth.js";
import {connectDB} from "../db.js";
import User from "../../models/users.js";

export async function requireAuth(req) {
    await connectDB();
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        throw new Error("Authorization header missing");
    }
    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);
    if (!decoded) {
        throw new Error("Invalid token");
    }
    const user = await User.findById(decoded.id);
    if (!user) {
        throw new Error("User not found");
    }
    return user;

}

//admin middleware
export async function requireAdmin(req) {
    const user = await requireAuth(req);
    if (user.role !== "admin") {
        throw new Error("Admin access required");
    }
    return user;
}

