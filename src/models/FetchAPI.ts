export type HeadersType = Record<string, string>;

export type RequestMeta = {
  params?: string | string[][] | Record<string, string> | URLSearchParams,
  options?: RequestInit,
  headers?: HeadersType,
  data?: BodyInit,
}

export type RequestProps = RequestMeta & {
  url: string,
  method: string,
}

export type ResponseData<T> = {
  res: Response,
  body?: T,
}

export type AuthHeaders = () => HeadersType;

export type OnResponse = (res: Response) => void;

export type OnError = (err: Error) => void;
