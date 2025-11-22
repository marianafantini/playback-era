export interface CustomTarget extends EventTarget {
  playVideo: () => {}
}

export interface CustomEvent extends Event {
  target: CustomTarget
}
