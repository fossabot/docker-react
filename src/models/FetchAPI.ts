export type RequestBuilds = {
  url: string,
  method: string,
  options?: RequestInit,
  headers?: Headers,
  data?: any,
}

export enum fetchErrorCode {
  REQUEST_NOT_DEFINED = 'REQUEST_NOT_DEFINED',
  FETCH_API_ERROR = 'FETCH_API_ERROR',
  RESPONSE_PARSE_ERROR = 'RESPONSE_PARSE_ERROR',
}

export class FetchAPI {
  public debug: boolean;
  public request?: Request;
  public response?: Response;

  constructor() {
    // TODO
    this.debug = true;
  }

  private authorization(url: URL, options: RequestInit): void {
    // TODO Authorization
  }

  public defaultHeaders(): Headers {
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json; charset=utf-8');
    return headers;
  }

  public defaultOptions(): RequestInit {
    return {
      cache: 'no-cache',
      credentials: 'omit',
      mode: 'cors',
      redirect: 'follow',
      referrerPolicy: 'no-referrer-when-downgrade',
    };
  }

  public build(params: RequestBuilds): Request {
    const url = new URL(params.url);
    const options = params.options ?? this.defaultOptions();
    options.headers = params.headers ?? this.defaultHeaders();
    options.method = params.method.toUpperCase();
    if (params.data) {
      const data = params.data;
      if (options.method === 'GET') {
        const p = new URLSearchParams();
        Object.keys(data).forEach(k => {
          if (data[k] !== void 0) {
            p.append(k, data[k])
          }
        });
        url.search = p.toString();
      } else {
        options.body = data;
      }
    }
    this.authorization(url, options);
    this.request = new Request(url.toString(), options);
    return this.request;
  }

  public async fetch<T>(): Promise<T> {
    if (!this.request) {
      throw new Error(fetchErrorCode.REQUEST_NOT_DEFINED);
    }
    this.response = await fetch(this.request!)
      .catch(err => {throw new Error(fetchErrorCode.FETCH_API_ERROR)});
    const body: T = await this.response.json()
      .catch(err => {throw new Error(fetchErrorCode.RESPONSE_PARSE_ERROR)});
    return body;
  }
}

export default FetchAPI;
