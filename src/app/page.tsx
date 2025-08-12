import { TodoContainer } from "@/components/TodoContainer";
import { Metadata } from "next";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Testes com Vitest e Playwrigth'
}

export default function Home() {
  return <TodoContainer />
}
