import { auth } from "~/lib/auth";

export default defineEventHandler(async (event) => {
  if (event.path.includes("locations")) {
    const session = await auth.api.getSession(event);

    if (!session) {
      throw createError({
        statusCode: 401,
        statusMessage: "Unauthorized",
      });
    }

    event.context.user = session.user;
  }
});
