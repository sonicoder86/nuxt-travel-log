import { authClient } from "~/lib/auth-client";

export default defineNuxtRouteMiddleware(async (to) => {
  if (to.path === "/dashboard") {
    const { data: sessionGet } = await authClient.getSession();
    const { data: sessionUse } = await authClient.useSession(useFetch);
    console.log("session", sessionGet, sessionUse.value);
    // if (!session) {
    //   return navigateTo("/");
    // }
  }
});
