import md5 from "md5"

export const PRIV_KEY = "";
export const PUBLIC_KEY = "";
export const ts = new Date().getTime();
export const hash = md5(ts+PRIV_KEY+PUBLIC_KEY);
