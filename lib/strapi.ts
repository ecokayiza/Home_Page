import qs from "qs";

const STRAPI_URL = process.env.STRAPI_URL || "http://admin.ecokayizasweb.xyz";
const API_TOKEN = "179ce356ed74f29fdafc500cecbad5d88085fb87fcf0434c59d82e099db79d26e6324421e398550010137c74bf9a7c6188f1d91567bbbef684dc2357c0809be3d50e88295735b06903d851f4c1812017186debac3db2478f23158e43d34aa491e9f6bdccaec0eae78a97efe1b765c2c7e91a5006917db906f2525750d44469d7"
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
export async function uploadMedia(file: File) {
    const formData = new FormData();
    formData.append('files', file);

    const res = await fetch('http://admin.ecokayizasweb.xyz/api/upload', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${API_TOKEN}`
        // 不要手动设置 Content-Type，fetch 会自动处理
      },
      body: formData
    });

    return res.json();
}

