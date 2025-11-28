import { description, title } from "@/lib/metadata";
import { generateMetadata } from "@/lib/farcaster-embed";
import QuizApp from "@/components/quiz-app";

export { generateMetadata };

export default function Home() {
  // NEVER write anything here, only use this page to import components
  return <QuizApp />;
}
