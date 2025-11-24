<script setup lang="ts">
import { useRouter } from 'vue-router'; // For Composition API
const router = useRouter();

const {code} = defineProps(["code"])

const getToken = async (code: any) => {
  const codeVerifier = window.localStorage.getItem('code_verifier')
  console.log("codeVerifier", codeVerifier)
  const redirectUri = window.location.origin + "/loginSuccess";

  const queryParams = new URLSearchParams({
    client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID || "",
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: redirectUri,
    code_verifier: codeVerifier || "",
  });
  const payload = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: queryParams
  }
  const url = "https://accounts.spotify.com/api/token"

  const response = await fetch(url, payload).then((response) => {
    return response.json()
  });

  window.localStorage.setItem('spotify_access_token', response.access_token);
}

getToken(code).then(() => {
  router.push("/play")
})

</script>

<template>

</template>

<style>

</style>
