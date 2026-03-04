import {connectDB} from "@/lib/db";
import User from "@/models/users";
import {NextResponse} from "next/server";

//get all users
export async function GET() {
    await connectDB();
    const users = await User.find().select("-password"); //-password for exclude password from the response
    return NextResponse.json(users);
}

//create new user
// export async function POST(request: Request) {
//     await connectDB();
//     const body = await request.json();
//     const user = await User.create(body);
//     return NextResponse.json(user, {status: 201});
// }