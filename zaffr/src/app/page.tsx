import { HydrateClient } from "~/trpc/server";
import { TodoView } from "~/app/_components/todo";

export default function Home() {
  return (
    <HydrateClient>
      <section className="w-full" aria-label="Todo list">
        <TodoView />
      </section>
    </HydrateClient>
  );
}
