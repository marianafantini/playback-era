<script setup lang="ts">

const {code} = defineProps(["code"])

localStorage.setItem("spotify_user_code", code)

const getToken = async (code) => {
  // stored in the previous step

  const codeVerifier = localStorage.getItem('code_verifier')
  console.log("codeVerifier", codeVerifier)
  const redirectUri = import.meta.env.VITE_SPOTIFY_REDIRECT_PLAY_URI;

  console.log("redirectUri", redirectUri)

  const queryParams = new URLSearchParams({
    client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: redirectUri,
    code_verifier: codeVerifier,
  });
  const payload = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    // body: queryParams
  }
  const url = "https://accounts.spotify.com/api/token?" + queryParams.toString();

  const body = await fetch(url, payload);
  const response = await body.json();

  localStorage.setItem('access_token', response.access_token);
}

getToken(code)

</script>

<template>

</template>

<style>

</style>
