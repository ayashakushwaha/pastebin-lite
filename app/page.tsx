import Header from "@/components/Header";
import { Form } from "@/components/ui/form";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-500 font-sans ">
      <main className="flex min-h-screen w-full flex-col items-center justify-between py-32 px-16 sm:items-start">
        <Header />
      </main>
    </div>
  );
}
