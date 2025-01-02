import { getServerClient } from "server";
import type { Route } from "./+types/dashboard";
import { redirect } from "react-router";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "Redball Admin Dashboard" },
    { name: "description", content: "Welcome to the Redball Admin page" },
  ];
}

export async function loader({request}: Route.LoaderArgs) {
  try {
    const sbServerClient = await getServerClient(request);
    const userResponse = await sbServerClient.auth.getUser();

    if (!userResponse?.data?.user) {
      throw redirect("/login");
    }

  } catch (error) {
    console.error(error);
    throw redirect("/login");
  }
}

export default function Dashboard() {
  return <div>Hello</div>;
}
