export default async function Page(props: PageProps<"/blogs/[id]">) {
  const { id } = await props.params;
  return <h1>Blog post: {id}</h1>;
}
