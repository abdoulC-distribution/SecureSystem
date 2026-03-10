import {connectDB} from "@/lib/db";
import User from "@/models/users";
import {NextResponse} from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//login user
export async function POST(request: Request) {
    await connectDB();
    const body = await request.json();
    const {email, password} = body;
    
    //check if user exists
    const user = await User.findOne({email});
    if (!user) {
        return NextResponse.json({message: "User not found"}, {status: 401});
    }

    //check if password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        return NextResponse.json({message: "Invalid credentials"}, {status: 401});
    }
    
    //create token
    const token = jwt.sign({
        id: user._id, 
        role: user.role
        }, 
        process.env.JWT_SECRET!, 
        {expiresIn: "1h"}
    );
    return NextResponse.json({message: "Login successful", token}, {status: 200});
}
