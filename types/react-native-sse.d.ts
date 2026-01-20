declare module "react-native-sse" {
  export default class EventSource {
    constructor(url: string, options?: any);

    onmessage: ((event: { data: string }) => void) | null;
    onerror: ((event: any) => void) | null;

    addEventListener(
      type: string,
      listener: (event: { data: string }) => void
    ): void;

    close(): void;
  }
}
