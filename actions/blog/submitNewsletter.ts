import { AppContext } from "site/apps/site.ts";
import { PORTAL_SUBDOMAIN } from "site/constants.tsx";

export interface Props {
  name: string;
  email: string;
}

/**
 * @title Newsletter Subscription
 * @description Handles newsletter form submissions
 */
const action = async (
  props: Props,
  _req: Request,
  _ctx: AppContext,
): Promise<void> => {
  const { name, email } = props;

  const response = await fetch(
    `${PORTAL_SUBDOMAIN[0]}/api/dataentities/NE/documents`,
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
    throw new Error(`Failed to submit newsletter: ${response.statusText}`);
  }
};

export default action;
