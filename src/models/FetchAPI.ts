export type HeadersType = Record<string, string>;

export type AuthHeadersFunc = (headers: HeadersType) => void;

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
  response: Response,
  body: T,
}

export enum fetchErrorCode {
  FETCH_API_ERROR = 'FETCH_API_ERROR',
  RESPONSE_PARSE_ERROR = 'RESPONSE_PARSE_ERROR',
}
