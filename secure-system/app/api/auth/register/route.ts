import {connectDB} from "@/lib/db";
import User from "@/models/users";
import {NextResponse} from "next/server";
import bcrypt from "bcryptjs";

//register new user
export async function POST(request: Request) {
    await connectDB();
    const body = await request.json();
    const {name, email, password} = body;
    
    //check if user already exists  
    const existingUser = await User.findOne({email});
    if (existingUser) {
        return NextResponse.json({message: "User already exists"}, {status: 400});
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    //create new user
    const user = await User.create({name, email, password: hashedPassword});
    return NextResponse.json({message: "User created successfully"}, {status: 201});
}