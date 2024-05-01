"use client";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function Header() {
  const router = useRouter();
  const logout = async () => {
    try {
      await fetch("/api/users/logout/")
      .then(() => {
        toast.success("logout succesfully");
        router.push("/login");
      });
    } catch (error: any) {
      console.log(error.message);
      toast.success(error.message);
    }
  };
  return (
    <div className="box-border bg-white  flex  justify-between absolute top-0 left-0 w-screen p-3  shadow-md">
      <h1>Note App</h1>
      <div className="mx-4">
        <button
          className="bg-blue-500 text-white rounded p-2 font-bold mx-4"
          onClick={logout}
        >
          Logout
        </button>
        {/* <button className="bg-blue-500 text-white rounded p-2 font-bold mx-4">
          <Link href={"/signup"}>Signup</Link>
        </button> */}
        {/* <button className="bg-blue-500 text-white rounded p-2 font-bold mx-4">
          <Link href={"/login"}>Login</Link>
        </button> */}
      </div>
    </div>
  );
}
