"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard(){

const [user,setUser]=useState(null);
const router=useRouter();

const getUser=async()=>{

const token=localStorage.getItem("token");

const res=await fetch("/api/auth/getUserCo",{

headers:{
Authorization:`Bearer ${token}`
}

});

const data=await res.json();

setUser(data);

}

const logout=()=>{

localStorage.removeItem("token");

router.push("/");

}

return(

<main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-700 flex items-center justify-center">

<div className="bg-white p-10 rounded-2xl shadow-xl w-[500px]">

<h2 className="text-2xl font-bold mb-6 text-center">
Dashboard
</h2>

<div className="flex gap-4 justify-center mb-6">

<button
onClick={getUser}
className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
>
Get Current User
</button>

<button
onClick={logout}
className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
>
Logout
</button>

</div>

{user &&(

<div className="bg-gray-100 p-4 rounded-lg">

<pre className="text-sm">
{JSON.stringify(user,null,2)}
</pre>

</div>

)}

</div>

</main>

)

}