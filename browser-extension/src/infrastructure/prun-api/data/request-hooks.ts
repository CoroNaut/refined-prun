/* eslint-disable @typescript-eslint/no-unused-vars */

export const request = {
  production(siteId?: string | null): void {
    throw Error('Not implemented');
  },
  workforce(siteId?: string | null): void {
    throw Error('Not implemented');
  },
  cxos(): void {
    throw Error('Not implemented');
  },
  fxos(): void {
    throw Error('Not implemented');
  },
  blueprints(): void {
    throw Error('Not implemented');
  },
  shipyards(): void {
    throw Error('Not implemented');
  },
  shipyardProjects(): void {
    throw Error('Not implemented');
  },
};

export function createRequestGetter<T, K>(
  getter: (value?: K | null) => T | undefined,
  request: (value?: K | null) => void,
) {
  return (value?: K | null) => {
    const result = getter(value);
    if (result) {
      return result;
    }
    request(value);
    return undefined;
  };
}

type RequestStore<T> = T & { request(): void };

export function createRequestStore<T>(request: () => void, store: T): RequestStore<T> {
  const wrapped = {} as RequestStore<T>;
  for (const key in store) {
    Object.defineProperty(wrapped, key, {
      get: () => {
        request();
        return store[key];
      },
    });
  }
  wrapped.request = request;
  return wrapped;
}
