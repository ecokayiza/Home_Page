import qs from "qs";

const STRAPI_URL = process.env.STRAPI_URL || "http://localhost:1337";

export async function fetchFromStrapi(path: string, params: any = {}) {
  const queryString = qs.stringify(params, { encodeValuesOnly: true });
  const response = await fetch(`${STRAPI_URL}/api/${path}?${queryString}`);
  await new Promise(resolve => setTimeout(resolve, 100)); // Add a short delay
  const data = await response.json();
  if (data.data) {
    return data;
  }
  return { data: data };
}
