# playback-era

Log in with your spotify account and guess the timeline of your music!

This was created as a project to study and learn VueJS

### About the app

Please note: this is still on early stages and will contain bugs.g

This app is inspired on [HITSTER](https://hitstergame.com/) card game.

HITSTER is a game in which the goal is to guess correctly the timeline of a list of songs. On the HITSTER card game, there are cards with the songs, you should listen to the song and guess its place on your timeline. The main difference on this version is that you're able to login with spotify to play with your own playlists.

## What was implemented

- [X] Login with Spotify
- [X] List user's playlists
- [X] Click on a playlist and play with it
- [X] Can add the card to the selected place on timeline
- [X] Deploy with Vercel on [https://playback-era.vercel.app](https://playback-era.vercel.app)

## What's missing

### From the code perspective

- [ ] Better home screen, better styling, better call to action
- [ ] Animations to make it look nicer. Right now cards appear and disappear without even a CSS transition
- [ ] Win or lose the game actions (and animations, too)
- [ ] Better styling, better interfaces, better CSS
- [ ] Make it responsive to play on the phone
- [ ] Fix it on Brave browser (ps: I can't use spotify on Brave either, not sure if I'll be able to fix that)
- [ ] Improve the player of current music. At the moment we're unable to tell if it's loading, playing, paused, or something else
- [ ] Add tests, many tests

### From a product perspective:

- [ ] Play with a custom playlist, not just your saved playlists
- [ ] Misc mode: play with random music
- [ ] Enable multiplayer mode
  - [ ] Add friends, take turns, create games with different friends
- [ ] More game options: not just the timeline one
- [ ] Be able to play it on the phone
- [ ] Different ways to play: for example, an easy mode in which we show the album cover to help. Or a hard mode with just 30s of the song.

## Contribute

### Recommended IDE Setup

[WebStorm](https://www.jetbrains.com/pt-br/webstorm/)

### Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd) 
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

### Project Setup

```sh
npm install
```

#### Compile and Hot-Reload for Development

```sh
npm run dev
```

#### Type-Check, Compile and Minify for Production

```sh
npm run build
```

#### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

#### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e
```

#### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
