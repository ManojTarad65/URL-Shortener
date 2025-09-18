// app/dashboard/page.tsx
import { auth } from "@/lib/auth";

export default async function Dashboard() {
  const session = await auth();

  if (!session) {
    return <p>You must be signed in</p>;
  }

  return <h1>Welcome {session.user?.name}</h1>;
}
