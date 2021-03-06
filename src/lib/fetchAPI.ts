export type HeadersType = Record<string, string>;

export type RequestMeta = {
  headers?: HeadersType,
  params?: string | string[][] | Record<string, string> | URLSearchParams,
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

const defaultOptions = (): RequestInit => ({
  mode: 'cors',
  cache: 'no-cache',
  credentials: 'include',
  redirect: 'follow',
  referrerPolicy: 'no-referrer-when-downgrade',
});

const defaultHeaders = (): HeadersType => ({
  'Accept': 'application/json',
  'Content-Type': 'application/json; charset=utf-8',
});

export class FetchAPI {
  public baseUrl?: string;
  public defaultOptions: () => RequestInit;
  public defaultHeaders: () => HeadersType;
  public authHeaders: () => HeadersType;
  public onResponse: (res: Response) => void;

  constructor() {
    this.defaultOptions = defaultOptions;
    this.defaultHeaders = defaultHeaders;
    this.authHeaders = () => ({});
    this.onResponse = () => {};
  }

  public buildRequest(props: RequestProps): Request {
    const url = new URL(
      this.baseUrl && !props.url.startsWith('http') ?
      `${this.baseUrl}/${props.url}` : props.url
    );
    if (props.params) {
      const params = new URLSearchParams(props.params);
      url.search = params.toString();
    }
    const init = this.defaultOptions();
    init.method = props.method.toUpperCase();
    init.headers = {
        ...this.defaultHeaders(),
        ...this.authHeaders(),
        ...(props.headers ?? {}),
    };
    if (props.data) {
      init.body = props.data;
    }
    return new Request(url.toString(), init);
  }

  public async fetchJson<T>(request: Request): Promise<ResponseData<T>> {
    const res: Response = await fetch(request).catch(
      err => new Response(null, {status: 500, statusText: err.message})
    );
    this.onResponse(res);
    const body = await res.json().catch(_ => undefined);
    return {res, body};
  }

  public async get<T>(url: string, options: RequestMeta): Promise<ResponseData<T>> {
    const method = 'GET';
    const request = this.buildRequest({url, method, ...options});
    return await this.fetchJson<T>(request);
  }

  public async post<T>(url: string, options: RequestMeta): Promise<ResponseData<T>> {
    const method = 'POST';
    const request = this.buildRequest({url, method, ...options});
    return await this.fetchJson<T>(request);
  }

  public async put<T>(url: string, options: RequestMeta): Promise<ResponseData<T>> {
    const method = 'PUT';
    const request = this.buildRequest({url, method, ...options});
    return await this.fetchJson<T>(request);
  }

  public async patch<T>(url: string, options: RequestMeta): Promise<ResponseData<T>> {
    const method = 'PATCH';
    const request = this.buildRequest({url, method, ...options});
    return await this.fetchJson<T>(request);
  }

  public async delete<T>(url: string, options: RequestMeta): Promise<ResponseData<T>> {
    const method = 'DELETE';
    const request = this.buildRequest({url, method, ...options});
    return await this.fetchJson<T>(request);
  }
}

export default new FetchAPI();
