import type { UserWithId } from "~/lib/auth";

import { auth } from "~/lib/auth";

export default defineEventHandler(async (event) => {
  const protectedPaths = ["locations", "search"];
  // eslint-disable-next-line regexp/no-unused-capturing-group
  const pathRegex = new RegExp(`/(${protectedPaths.join("|")})`);
  if (pathRegex.test(event.path)) {
    const session = await auth.api.getSession(event);

    if (!session) {
      throw createError({
        statusCode: 401,
        statusMessage: "Unauthorized",
      });
    }

    event.context.user = session.user as unknown as UserWithId;
  }
});
