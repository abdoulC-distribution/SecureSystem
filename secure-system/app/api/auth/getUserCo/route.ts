import  {connectDB} from "@/lib/db";
import {NextResponse} from "next/server";
import {requireAuth} from "@/lib/middleware/auth";

export async function GET(req: Request) {
    try {
        console.log("try it"); 
        await connectDB();
        const user = await requireAuth(req);
        return NextResponse.json({
            id: user,
            name: user.name,
            email: user.email,
            role: user.role 
            }, 
            {status: 200});
    } catch (error) {
        return NextResponse.json({message: "An error occurred"}, {status: 401});
    }
}