type Arrayable<X> = X | X[];

type DeepPartial<T> = T extends object ? { [P in keyof T]?: DeepPartial<T[P]> } : T;

interface SignalAsOptions {
  signal?: AbortSignal;
}
