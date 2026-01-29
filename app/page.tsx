import Header from "@/components/Header";
import { NewPasteForm } from "@/components/NewPasteForm";
import { Form } from "@/components/ui/form";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen font-sans">
      <main className="flex min-h-screen w-full flex-col py-16 px-16 sm:items-start">
        <NewPasteForm />
      </main>
    </div>
  );
}
