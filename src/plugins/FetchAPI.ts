import * as lodash from 'lodash';

import {
  AuthHeadersFunc, HeadersType, RequestMeta, RequestProps, ResponseData,
  fetchErrorCode,
}from '../models/fetchAPI';


class FetchAPI {
  public baseUrl?: string;
  public options: RequestInit;
  public headers: HeadersType;
  private authHeaders: AuthHeadersFunc;

  constructor() {
    this.options = this.defaultOptions();
    this.headers = this.defaultHeaders();
    this.authHeaders = () => {};
  }

  public addAuthHeadersFunc(f: AuthHeadersFunc) {
    this.authHeaders = f;
  }

  public defaultHeaders(): HeadersType {
    return {
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
    }
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

  public buildRequest(props: RequestProps): Request {
    let newUrl = props.url;
    if (!!this.baseUrl && !props.url.startsWith('http')) {
      newUrl = `${this.baseUrl}/${props.url}`;
    }
    const url = new URL(newUrl);
    if (props.params) {
      const params = new URLSearchParams(props.params);
      url.search = params.toString();
    }
    const init = lodash.cloneDeep(props.options ?? this.options);
    init.method = props.method.toUpperCase();
    init.headers = lodash.cloneDeep(props.headers ?? this.headers);
    this.authHeaders(init.headers)
    if (props.data) {
      init.body = JSON.stringify(props.data);
    }
    return new Request(url.toString(), init);
  }

  public async fetchJson<T>(request: Request): Promise<ResponseData<T>> {
    const response = await fetch(request)
      .catch(err => {throw new Error(fetchErrorCode.FETCH_API_ERROR)});
    const body: T = await response.json()
      .catch(err => {throw new Error(fetchErrorCode.RESPONSE_PARSE_ERROR)});
    return {response, body};
  }

  public async get<T>(url: string, options: RequestMeta): Promise<ResponseData<T>> {
    const request = this.buildRequest({url, method: 'GET', ...options});
    const {response, body} = await this.fetchJson<T>(request);
    return {response, body};
  }

  public async post<T>(url: string, options: RequestMeta): Promise<ResponseData<T>> {
    const request = this.buildRequest({url, method: 'POST', ...options});
    const {response, body} = await this.fetchJson<T>(request);
    return {response, body};
  }

  public async put<T>(url: string, options: RequestMeta): Promise<ResponseData<T>> {
    const request = this.buildRequest({url, method: 'PUT', ...options});
    const {response, body} = await this.fetchJson<T>(request);
    return {response, body};
  }

  public async patch<T>(url: string, options: RequestMeta): Promise<ResponseData<T>> {
    const request = this.buildRequest({url, method: 'PATCH', ...options});
    const {response, body} = await this.fetchJson<T>(request);
    return {response, body};
  }

  public async delete<T>(url: string, options: RequestMeta): Promise<ResponseData<T>> {
    const request = this.buildRequest({url, method: 'DELETE', ...options});
    const {response, body} = await this.fetchJson<T>(request);
    return {response, body};
  }
}

const fetchAPI = new FetchAPI();

export default fetchAPI;
