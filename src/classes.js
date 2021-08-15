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
