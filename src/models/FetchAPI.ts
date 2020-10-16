export type RequestData = {
  [key: string]: any,
}

export type ResponseData<T> = {
  response: Response,
  body: T,
}

export type RequestProps = {
  url: string,
  method: string,
  options?: RequestInit,
  headers?: Headers,
  data?: RequestData,
}

export enum fetchErrorCode {
  FETCH_API_ERROR = 'FETCH_API_ERROR',
  RESPONSE_PARSE_ERROR = 'RESPONSE_PARSE_ERROR',
}

export const defaultHeaders = (): Headers => {
  const headers = new Headers();
  headers.append('Accept', 'application/json');
  headers.append('Content-Type', 'application/json; charset=utf-8');
  return headers;
}

export const defaultOptions = (): RequestInit => {
  return {
    cache: 'no-cache',
    credentials: 'omit',
    mode: 'cors',
    redirect: 'follow',
    referrerPolicy: 'no-referrer-when-downgrade',
  };
}

export const buildRequest = (props: RequestProps): Request => {
  const url = new URL(props.url);
  const options = props.options ?? defaultOptions();
  options.headers = props.headers ?? defaultHeaders();
  options.method = props.method.toUpperCase();
  if (props.data) {
    const data = props.data;
    if (options.method === 'GET') {
      const p = new URLSearchParams();
      Object.keys(data).forEach(k => {
        if (data[k] !== void 0) {
          p.append(k, data[k])
        }
      });
      url.search = p.toString();
    } else {
      options.body = JSON.stringify(data);
    }
  }
  return new Request(url.toString(), options);
}

export const wrapFetch = async <T>(request: Request): Promise<ResponseData<T>> => {
  const response = await fetch(request)
    .catch(err => {throw new Error(fetchErrorCode.FETCH_API_ERROR)});
  const body: T = await response.json()
    .catch(err => {throw new Error(fetchErrorCode.RESPONSE_PARSE_ERROR)});
  return {response, body};
}

export type FetchAPIProps = {
  baseUrl?: string,
  addAuthHeader?: (headers: Headers) => void,
}

export class FetchAPI {
  private baseUrl?: string;
  private addAuthHeader: (headers: Headers) => void;

  constructor(props: FetchAPIProps) {
    this.baseUrl = props.baseUrl;
    this.addAuthHeader = props.addAuthHeader ?? (() => {});
  }

  public async fetch<T>(props: RequestProps): Promise<ResponseData<T>> {
    const newProps = {...props};
    if (!!this.baseUrl && !props.url.startsWith('http')) {
      newProps.url = `${this.baseUrl}/${props.url}`;
    }
    newProps.headers = props.headers ?? defaultHeaders();
    this.addAuthHeader(newProps.headers);
    const request = buildRequest(newProps);
    const {response, body} = await wrapFetch(request);
    return {response, body};
  }

  public async get<T>(url: string, data?: RequestData): Promise<ResponseData<T>> {
    const {response, body} = await this.fetch<T>({url, data, method: 'GET'});
    return {response, body};
  }

  public async post<T>(url: string, data?: RequestData): Promise<ResponseData<T>> {
    const {response, body} = await this.fetch<T>({url, data, method: 'POST'});
    return {response, body};
  }

  public async put<T>(url: string, data?: RequestData): Promise<ResponseData<T>> {
    const {response, body} = await this.fetch<T>({url, data, method: 'PUT'});
    return {response, body};
  }

  public async patch<T>(url: string, data?: RequestData): Promise<ResponseData<T>> {
    const {response, body} = await this.fetch<T>({url, data, method: 'PATCH'});
    return {response, body};
  }

  public async delete<T>(url: string, data?: RequestData): Promise<ResponseData<T>> {
    const {response, body} = await this.fetch<T>({url, data, method: 'DELETE'});
    return {response, body};
  }
}

export default FetchAPI;
