import { Form, redirect, useLoaderData, useNavigate } from "react-router";
import { Button } from "~/components/ui/button";
import type { Route } from "./+types/login";
import { useState, type FormEvent } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { getServerClient } from "server";


export async function loader({ request }: Route.LoaderArgs) {
  const sbServerClient = await getServerClient(request);
  sbServerClient.auth.signInWithPassword
  const userResponse = await sbServerClient.auth.getUser();
  if (userResponse?.data?.user) {
    throw redirect("/");
  }

  return {
    env: {
      SUPABASE_URL: process.env.SUPABASE_URL!,
      SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY!,
    }
  }
}

export default function Login() {
  const { env } = useLoaderData<typeof loader>();
  const [error, setError] = useState<string>();
  const navigate = useNavigate();

  const loginUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Login user")
    const formData = new FormData(e.currentTarget);
    const dataFields = Object.fromEntries(formData.entries());

    const supabase = createBrowserClient(
      env.SUPABASE_URL,
      env.SUPABASE_ANON_KEY
    );

    const { data, error } = await supabase.auth.signInWithPassword({
      email: dataFields.username as string,
      password: dataFields.password as string,
    });

    if (error) {
      console.error(error);
      setError(error.message);
      return;
    }

    if (data.session) {
      navigate("/");
    }
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <Form
        // method="post" 
        onSubmit={loginUser}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            name="username"
            type="text"
            placeholder="Username" />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            name="password"
            type="password"
            placeholder="******************" />
          {/* <p className="text-red-500 text-xs italic">Please choose a password.</p> */}
        </div>
        <div className="flex items-center justify-between">
          <Button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Sign In
          </Button>
          {/* <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
            Forgot Password?
          </a> */}
        </div>
        {error && <p className="text-red-500 text-xs italic">{error}</p>}
      </Form>
    </div>
  );
}
