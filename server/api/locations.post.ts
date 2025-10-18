import db from "~/lib/db";
import { InsertLocation, location } from "~/lib/db/schema";
import sendZodError from "~/lib/send-zod-error";

export default defineEventHandler(async (event) => {
  if (!event.context.user) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
  }

  const result = await readValidatedBody(event, InsertLocation.safeParse);

  if (!result.success) {
    return sendZodError(event, result.error);
  }

  const [created] = await db.insert(location).values({
    ...result.data,
    slug: result.data.name.replaceAll(" ", "-").toLowerCase(),
    userId: event.context.user.id,
  }).returning();

  return created;
});
