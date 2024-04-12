// TODO: Why not using actions?

import { Handlers } from "$fresh/server.ts";
import { PORTAL_SUBDOMAIN } from "../../constants.tsx";
// Add here the scripts you want to proxy

export interface ConcactForm {
  nameUser: string;
  nameCompany: string;
  phoneNumber: string;
  email: string;
  message: string;
  commercial: boolean;
  partnership: boolean;
  others: boolean;
  loja: string;
}

export const handler: Handlers = {
  POST: async (req) => {
    const SUBDOMAIN = PORTAL_SUBDOMAIN;

    const data = await req.json();

    const response = await fetch(SUBDOMAIN + "/api/dataentities/NE/documents", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
        "accept": "application/json",
      },
    });

    const headers = new Headers(response.headers);
    headers.set("access-control-allow-origin", "*");

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  },
};
