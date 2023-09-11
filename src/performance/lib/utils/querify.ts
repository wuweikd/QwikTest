// @ts-ignore
export default function jsonToQueryString(json): string {
  const resp = []
  for (const key in json) {
    const kv = `${encodeURIComponent(key)}=${encodeURIComponent(json[key])}`;
    resp.push(kv)
  }
  return resp.join("&");
}
