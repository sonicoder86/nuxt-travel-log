import type { UserWithId } from "./auth";

declare module "h3" {
  // eslint-disable-next-line ts/consistent-type-definitions
  interface H3EventContext {
    user?: UserWithId;
  }
}

export type MapPoint = {
  id: number;
  label: string;
  lat: number;
  lng: number;
};
