export async function getData() {
  const res = await fetch("https://sombobaeb.cheat.casa/food-items");
  const data = await res.json();
  return data;
}