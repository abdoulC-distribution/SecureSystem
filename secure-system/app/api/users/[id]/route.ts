import {connectDB} from "@/lib/db";
import {NextResponse} from "next/server";
import User from "@/models/users";

//get user by id
export async function GET(_: Request, {params}: {params: {id: string}}) {
    await connectDB();
    const user = await User.findById(params.id).select("-password"); //-password for exclude password from the response
    return NextResponse.json(user);
}

//delete user
export async function DELETE(_: Request, {params}: {params: {id: string}}) {
    await connectDB();
    await User.findByIdAndDelete(params.id);
    return NextResponse.json({message: "User deleted successfully"});
}

//update user
export async function PUT(request: Request, {params}: {params: {id: string}}) {
    await connectDB();
    const body = await request.json();
    const user = await User.findByIdAndUpdate(params.id, body, {new: true}).select("-password");
    return NextResponse.json(user);
}