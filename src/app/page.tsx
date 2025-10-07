import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { QUIZ_CATEGORIES } from "@/lib/categories";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
      <div>
        <h1>Welcome {session.user.name || session.user.email}!</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(QUIZ_CATEGORIES).map(([id, category]) => (
              <Link href={`/quiz/${id}`} key={id}>
                <div className="card">
                  <span>{category.icon}</span>
                  <h3>{category.name}</h3>
                </div>
              </Link>
          ))}
        </div>
      </div>
  );
}