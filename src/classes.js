import { getQueryStringFromQueryList } from '@/components/Requester/QueryParamHelper.js';

export class History {
  constructor(response, title) {
    const { config, status } = response;
    const { method, url } = config;

    this.date = new Date();
    this.method = method;
    this.statusCode = status;
    this.fullUrl = url;
    this.title = title || '';
  }
}

export class RequestObj {
  constructor(queries) {
    const {
      title = '',
      url = '',
      method = '',
      params = '',
      headers = '',
      body = '',
    } = queries;

    console.log({ params });
    this.title = title;
    this.url = url;
    this.method = method.toLowerCase();
    this.params = this.arraySplitter(params);
    this.headers = this.arraySplitter(headers);
    this.body = this.jsonSplitter(body);

    this.update();
  }

  arraySplitter(str) {
    if (!str.includes(':')) return [];
    return str.split(',').map((el) => {
      const [key, value] = el.split(':');
      return { key, value };
    });
  }
  jsonSplitter(data) {
    try {
      return JSON.parse(data);
    } catch (error) {
      return data;
    }
  }

  getFullStr(encoded) {
    const arrToStr = (arr) =>
      arr.map((el) => `${el.key}:${el.value}`).join(',');
    const objToStr = (obj) => {
      if (typeof obj === 'object') return JSON.stringify(obj);
      return obj;
    };

    const url = this.url ? `url=${this.url}` : '';
    const title = this.title ? `title=${this.title}` : '';
    const method = this.method ? `method=${this.method}` : '';
    const params = this.params.length ? `params=${arrToStr(this.params)}` : '';
    const headers = this.headers.length
      ? `headers=${arrToStr(this.headers)}`
      : '';
    const body = this.body ? `body=${objToStr(this.body)}` : '';

    const fullStr = `?${url}&${title}&${method}&${params}&${headers}`;
    return encoded ? encodeURI(fullStr) : fullStr;
  }
  update() {
    this.qs = this.getFullStr();
    this.urlWithParams = this.url + getQueryStringFromQueryList(this.params);
    history.pushState({}, null, this.qs);
  }
}
