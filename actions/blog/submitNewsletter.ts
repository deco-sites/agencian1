import { AppContext } from "site/apps/site.ts";
import { validateEmail } from "site/sdk/validation.ts";
import { N1_VTEX_DOMAIN } from "site/sdk/contants.tsx";

export interface Props {
  name: string;
  email: string;
}

interface Error {
  message: string;
}

/**
 * @title Newsletter Subscription
 * @description Handles newsletter form submissions
 */
const action = async (
  props: Props,
  _req: Request,
  _ctx: AppContext,
): Promise<Error | void> => {
  const { name, email } = props;

  if (typeof name !== "string" || name.trim().length < 3) {
    return {
      message: "O nome deve ter pelo menos 3 caracteres",
    };
  }

  if (typeof email !== "string" || !validateEmail(email.trim())) {
    return {
      message: "Por favor, insira um endereço de e-mail válido",
    };
  }

  const response = await fetch(
    `${N1_VTEX_DOMAIN}/api/dataentities/NE/documents`,
    {
      method: "POST",
      body: JSON.stringify({ name, email }),
      headers: {
        "content-type": "application/json",
        "accept": "application/json",
      },
    },
  );

  if (!response.ok) {
    throw new Error(`Falha ao enviar newsletter: ${response.statusText}`);
  }
};

export default action;
