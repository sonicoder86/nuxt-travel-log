export default defineNuxtRouteMiddleware(async (to) => {
  if (to.path === "/dashboard") {
    const result = await useFetch("/api/auth/get-session");

    if (!result.data.value) {
      return navigateTo("/");
    }
  }
});
