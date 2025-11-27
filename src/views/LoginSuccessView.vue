<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const { code } = defineProps(["code"]);

const getToken = async (code: any) => {
  const codeVerifier = window.localStorage.getItem("code_verifier");
  const redirectUri = window.location.origin + "/login-success";

  const queryParams = new URLSearchParams({
    client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID || "",
    grant_type: "authorization_code",
    code: code,
    redirect_uri: redirectUri,
    code_verifier: codeVerifier || "",
  });
  const payload = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: queryParams,
  };
  const url = "https://accounts.spotify.com/api/token";

  const response = await fetch(url, payload).then((response) => {
    return response.json();
  });

  const now = Date.now();
  const expirationDate = new Date(now + response.expires_in * 1000);
  window.localStorage.setItem(
    "spotify_expires_in",
    expirationDate.getTime().toString(),
  );
  window.localStorage.setItem("spotify_access_token", response.access_token);

  return response;
};

getToken(code).then((response) => {
  if (response.access_token) {
    router.push("/select-playlist");
  } else {
    router.push("/");
  }
});
</script>

<template></template>

<style></style>
