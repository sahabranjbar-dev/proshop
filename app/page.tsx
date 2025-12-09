import Hero from "@/components/Hero/Hero";

export default async function Home() {
  return (
    <section className="container mx-auto m-2">
      <div className="shadow border rounded-md p-6">
        <Hero />
      </div>
    </section>
  );
}
