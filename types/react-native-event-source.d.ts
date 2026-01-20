declare module "react-native-event-source" {
  export default class EventSource {
    constructor(url: string, options?: any);

    addEventListener(
      type: string,
      listener: (event: { data: string }) => void
    ): void;

    removeEventListener(type: string, listener: Function): void;

    close(): void;

    onerror: ((event: any) => void) | null;
  }
}
