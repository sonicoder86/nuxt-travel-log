import { createAuthClient } from "better-auth/vue";

const authClient = createAuthClient();

export const useAuthStore = defineStore("authStore", () => {
  const session = authClient.useSession();
  const user = computed(() => session.value?.data?.user);
  const loading = computed(() => session.value?.isPending || session.value?.isRefetching);

  async function signIn() {
    const { csrf } = useCsrf();
    const headers = new Headers();
    headers.append("csrf-token", csrf);

    await authClient.signIn.social({
      provider: "github",
      callbackURL: "/dashboard",
      errorCallbackURL: "/error",
      fetchOptions: {
        headers,
      },
    });
  }

  async function signOut() {
    const { csrf } = useCsrf();
    const headers = new Headers();
    headers.append("csrf-token", csrf);

    await authClient.signOut({
      fetchOptions: {
        headers,
      },
    });
    navigateTo("/");
  }

  return { loading, signIn, signOut, user };
});
