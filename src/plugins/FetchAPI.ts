import {
  HeadersType, RequestMeta, RequestProps, ResponseData,
  AuthHeaders, OnResponse, OnError,
}from '../models/fetchAPI';


class FetchAPI {
  public baseUrl?: string;
  public authHeaders: AuthHeaders;
  public onResponse: OnResponse;
  public onError: OnError;

  constructor() {
    this.authHeaders = () => ({});
    this.onResponse = () => {};
    this.onError = () => {};
  }

  public defaultOptions(): RequestInit {
    return {
      cache: 'no-cache',
      credentials: 'omit',
      mode: 'cors',
      redirect: 'follow',
      referrerPolicy: 'no-referrer-when-downgrade',
    }
  }

  defaultHeaders(): HeadersType {
    return {
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      ...this.authHeaders(),
    }
  }

  public buildRequest(props: RequestProps): Request {
    const url = new URL(
      this.baseUrl && !props.url.startsWith('http') ? (
        `${this.baseUrl}/${props.url}`
      ) : (
        props.url
      )
    );
    if (props.params) {
      const params = new URLSearchParams(props.params);
      url.search = params.toString();
    }

    const init = props.options ?? this.defaultOptions();
    init.method = props.method.toUpperCase();
    init.headers = props.headers ?? this.defaultHeaders();
    if (props.data) {
      init.body = JSON.stringify(props.data);
    }

    return new Request(url.toString(), init);
  }

  public async fetchJson<T>(request: Request): Promise<ResponseData<T>> {
    return await fetch(request).then((res: Response) => {
      this.onResponse(res);
      return res.json().then((body: T) => ({res, body}));
    }).catch(err => {
      this.onError(err);
      return {res: new Response(null, {status: 500, statusText: 'fetchAPI'})}
    });
  }

  public async get<T>(url: string, options: RequestMeta): Promise<ResponseData<T>> {
    const request = this.buildRequest({url, method: 'GET', ...options});
    const {res, body} = await this.fetchJson<T>(request);
    return {res, body};
  }

  public async post<T>(url: string, options: RequestMeta): Promise<ResponseData<T>> {
    const request = this.buildRequest({url, method: 'POST', ...options});
    const {res, body} = await this.fetchJson<T>(request);
    return {res, body};
  }

  public async put<T>(url: string, options: RequestMeta): Promise<ResponseData<T>> {
    const request = this.buildRequest({url, method: 'PUT', ...options});
    const {res, body} = await this.fetchJson<T>(request);
    return {res, body};
  }

  public async patch<T>(url: string, options: RequestMeta): Promise<ResponseData<T>> {
    const request = this.buildRequest({url, method: 'PATCH', ...options});
    const {res, body} = await this.fetchJson<T>(request);
    return {res, body};
  }

  public async delete<T>(url: string, options: RequestMeta): Promise<ResponseData<T>> {
    const request = this.buildRequest({url, method: 'DELETE', ...options});
    const {res, body} = await this.fetchJson<T>(request);
    return {res, body};
  }
}

export default new FetchAPI();
