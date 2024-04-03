export default async function fetchData<T>(url: string): Promise<T | null> {
  try {
    const response = await fetch(url);
    const json = await response.json();
    // console.log(json);

    return json;
  } catch (error) {
    if (error instanceof Error) console.error("Erro no Fetch");
    return null;
  }
}
