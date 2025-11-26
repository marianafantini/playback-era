export type CustomHTMLElementEvent<T extends HTMLElement> = Event & {
  target: T;
}
