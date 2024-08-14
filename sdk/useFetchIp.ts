export interface Data {
  as: string;
  city: string;
  country: string;
  countryCode: string;
  isp: string;
  lat: string;
  lon: string;
  org: string;
  query: string;
  region: string;
  regionName: string;
  status: string;
  timezone: string;
  zip: string;
}

async function getIp() {
  const url = "http://ip-api.com/json";
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Response status: ${response.status}`);

    const json: Data = await response.json();
    console.log("json ---> ", json);
    return json;
  } catch (error) {
    console.error(error.message);
  }
}

const apiIp = await getIp();

export default apiIp;
