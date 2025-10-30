import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "Final Prototype" },
    { name: "description", content: "Something for a project" },
  ];
}

export default function Home() {
  return <Welcome />;
}
