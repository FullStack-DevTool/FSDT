import { IncomingMessage } from "http";

/**
 * @description Get request url if the req.url is relative.
 */
export const getRequestUrl = (req: IncomingMessage) => {
  if (req.url.includes("http://") || req.url.includes("https://")) {
    return req.url;
  }
  return `http://${req.headers.host}${req.url}`;
};
