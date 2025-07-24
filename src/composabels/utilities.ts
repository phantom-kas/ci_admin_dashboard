import axios from "axios";

export const base64ToBlob = (base64: string, mime: string | null) => {
  // Remove the data URL prefix (if present)
  const byteString = atob(base64.split(",")[1]);
  const arrayBuffer = new Uint8Array(byteString.length);

  for (let i = 0; i < byteString.length; i++) {
    arrayBuffer[i] = byteString.charCodeAt(i);
  }
  if (mime) return new Blob([arrayBuffer], { type: mime });
};


export const isDev = () => import.meta.env.MODE === 'development'

export const getImageUrl = (name: string) => {
  if(!name)return '';
  if (isDev() && !name.includes('http')) {
    const base = new URL(axios.defaults.baseURL as string).origin
    return base + name
  }
  return name
}