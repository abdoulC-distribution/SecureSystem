import {connectDB} from "@/lib/db";
import {NextResponse} from "next/server";
import User from "@/models/users";
import {verifyToken} from "@/lib/auth";
import {requireAdmin} from "@/lib/middleware/auth";

//get user by id
export async function GET(_: Request, {params}: {params: {id: string}}) {
    await connectDB();
    const user = await User.findById(params.id).select("-password"); //-password for exclude password from the response
    return NextResponse.json(user);
}

//delete user
export async function DELETE(req: Request, {params}: {params: {id: string}}) {
    // await connectDB();
    try{
        // //get header authorization
        // const authHeader = req.headers.get("authorization");
        // if (!authHeader) {
        //     return NextResponse.json({message: "no token provided"}, {status: 401});
        // }
        // //get token from header
        // const token = authHeader.split(" ")[1];

        // //check out token
        // const decoded = verifyToken(token) as {id: string} | null;

        // if (!decoded) {
        //     return NextResponse.json({message: "invalid token"}, {status: 401});
        // }
        
        // //get current user
        // const currentUser = await User.findById(decoded.id);

        // if (!currentUser) {
        //     return NextResponse.json({message: "user not found"}, {status: 404});
        // }

        // //check out role of user
        // if (currentUser.role !== "admin") {
        //     return NextResponse.json({message: "not authorized"}, {status: 403});
        // }

        // //delete user
        // await User.findByIdAndDelete(params.id);

        // return NextResponse.json({message: "User deleted successfully"});
        await requireAdmin(req);
        await connectDB();
        await User.findByIdAndDelete(params.id);
        return NextResponse.json({message: "User deleted successfully"});

    } catch(error) {
        return NextResponse.json({message: "An error occurred"}, {status: 403});
    }

}

//update user
export async function PUT(request: Request, {params}: {params: {id: string}}) {
    await connectDB();
    const body = await request.json();
    const user = await User.findByIdAndUpdate(params.id, body, {new: true}).select("-password");
    return NextResponse.json(user);
}