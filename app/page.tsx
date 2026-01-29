import Header from "@/components/Header";
import { NewPasteForm } from "@/components/NewPasteForm";
import { Form } from "@/components/ui/form";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex font-sans">
      <main className="flex w-full flex-col py-5 px-10 sm:items-start">
        <NewPasteForm />
      </main>
    </div>
  );
}
