<template>
  <div class="navbar bg-primary">
    <div class="navbar-start text-primary-content">
      <NuxtLink to="/" class="btn btn-ghost text-xl">
        Travel Log
      </NuxtLink>
    </div>
    <div class="navbar-end">
      <AppThemeToggle class="text-primary-content" />
      <AuthButton />
    </div>
  </div>
</template>
