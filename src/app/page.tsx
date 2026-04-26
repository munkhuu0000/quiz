import { Show } from "@clerk/nextjs";
import { HomeLanding } from "./_components/HomeLanding";
import { QuizWorkbench } from "./_components/QuizWorkbench";

export default function Home() {
  return (
    <>
      <Show when="signed-out">
        <HomeLanding />
      </Show>
      <Show when="signed-in">
        <QuizWorkbench />
      </Show>
    </>
  );
}
