import qs from "qs";

const STRAPI_URL = process.env.STRAPI_URL || "http://admin.ecokayizasweb.xyz";

export async function fetchFromStrapi(path: string, params: any = {}) {
  const queryString = qs.stringify(params, { encodeValuesOnly: true });
  try {
    const response = await fetch(`${STRAPI_URL}/api/${path}?${queryString}`);
    await new Promise(resolve => setTimeout(resolve, 100)); // Add a short delay
    const data = await response.json();
    if (data.data) {
      return data;
    }
    return { data: data };
  } catch (err) {
    console.error('fetchFromStrapi error:', err);
    return null;
  }
}
