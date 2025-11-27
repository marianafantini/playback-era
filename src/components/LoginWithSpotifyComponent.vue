<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()

const generateRandomString = (length: number) => {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const values = crypto.getRandomValues(new Uint8Array(length))
  return values.reduce((acc, x) => acc + possible[x % possible.length], '')
}

const sha256 = async (plain: string) => {
  const encoder = new TextEncoder()
  const data = encoder.encode(plain)
  return window.crypto.subtle.digest('SHA-256', data)
}

const base64encode = (input: any) => {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
}

const startLogin = async () => {
  const accessToken = window.localStorage.getItem('spotify_access_token')
  const expiresIn = window.localStorage.getItem('spotify_expires_in')
  if (accessToken && expiresIn && parseInt(expiresIn) > Date.now()) {
    return router.push('/select-playlist')
  }

  const codeVerifier = generateRandomString(64)
  console.log('code verifier saved on local storage', codeVerifier)
  window.localStorage.setItem('code_verifier', codeVerifier)

  const hashed = await sha256(codeVerifier)
  const codeChallenge = base64encode(hashed)

  const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID
  const redirectUri = window.location.origin + '/login-success'

  const scope = 'user-read-private user-read-email'
  const authUrl = new URL('https://accounts.spotify.com/authorize')

  const params = {
    response_type: 'code',
    client_id: clientId,
    scope: scope,
    code_challenge_method: 'S256',
    code_challenge: codeChallenge,
    redirect_uri: redirectUri,
  }

  authUrl.search = new URLSearchParams(params).toString()
  window.location.href = authUrl.toString()
}
</script>

<template>
  <div>
    <button @click="startLogin" size="large" class="spotify-button">
      <img src="/2024_Spotify_logo_without_text_(black).svg" />
      Começar com Spotify
    </button>
  </div>
</template>

<style>
.spotify-button {
  border-radius: 3rem;
  font-size: 1.2rem;
  font-weight: 600;
  width: 100%;
  height: 4rem;
  background: var(--spotify-green);
  border-color: var(--spotify-green);
  display: flex;
  align-items: center;
  justify-content: center;
}

.spotify-button:hover {
  background: var(--spotify-green);
  border-color: var(--spotify-green) !important;
  color: black !important;
  transform: scale(1.1);
}

.spotify-button img {
  height: 1.5rem;
  margin-right: 1rem;
}

.spotify-button span {
  font-weight: bold;
}
</style>
