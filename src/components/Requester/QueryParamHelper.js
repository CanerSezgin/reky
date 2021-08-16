export const getQueryListFromQueryString = (qs) => {
  if (!qs) return [];
  if (qs.length === 1 && qs[0] === '?') return [{ key: '', value: '' }];

  const questionMarkedRemoved = qs.substring(1);
  return questionMarkedRemoved.split('&').map((query) => {
    const [key, value] = query.split('=');
    return { key, value };
  });
};

export const getQueryStringFromQueryList = (queryList) => {
  if (!queryList.length) return '';
  const paramsStr = queryList.reduce((str, param) => {
    // if QS not include = param.value returns undefined
    if (param.key && param.value !== undefined) {
      return str + `&${param.key}=${param.value}`;
    } else {
      return str + `&${param.key}`;
    }
  }, '');

  return paramsStr.replace('&', '?');
};
