import { Hero } from "@/components/sections/Hero";
import { Pour } from "@/components/sections/Pour";
import { Origin } from "@/components/sections/Origin";
import { Menu } from "@/components/sections/Menu";
import { Gallery } from "@/components/sections/Gallery";
import { Visit } from "@/components/sections/Visit";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="flex flex-col flex-1">
      <Hero />
      <Pour />
      <Origin />
      <Menu />
      <Gallery />
      <Visit />
      <Footer />
    </main>
  );
}
