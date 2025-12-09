import Hero from "@/components/Hero/Hero";

export default async function Home() {
  return (
    <main className="min-h-screen container mx-auto m-2">
      <section className="shadow border rounded-md p-6">
        <Hero />
      </section>
    </main>
  );
}
