import { and, eq } from "drizzle-orm";
import { customAlphabet } from "nanoid";
import { alphanumeric } from "nanoid-dictionary";

import type { InsertLocationType } from "~/lib/db/schema";

import db from "~/lib/db";
import { location } from "~/lib/db/schema";

export async function findLocationByName(existing: InsertLocationType, userId: number) {
  return db.query.location.findFirst({
    where: and(
      eq(location.name, existing.name),
      eq(location.userId, userId),
    ),
  });
}

export async function findLocationBySlug(slug: string) {
  return db.query.location.findFirst({
    where: eq(location.slug, slug),
  });
}

export async function findUniqueSlug(slug: string) {
  let existing = !!(await findLocationBySlug(slug));
  const nanoid = customAlphabet(alphanumeric, 5);

  while (existing) {
    const idSlug = `${slug}-${nanoid()}`;
    existing = !!(await findLocationBySlug(idSlug));
    if (!existing) {
      return idSlug;
    }
  }

  return slug;
}

export async function insertLocation(
  insertable: InsertLocationType,
  slug: string,
  userId: number,
) {
  const [created] = await db.insert(location).values({
    ...insertable,
    slug,
    userId,
  }).returning();
  return created;
}

export async function findLocations(userId: number) {
  return db.query.location.findMany({
    where: eq(location.userId, userId),
  });
}
