export const getQueryListFromQueryString = (qs) => {
  if (!qs || qs[0] !== "?") return [];
  const questionMarkedRemoved = qs.substring(1);
  return questionMarkedRemoved.split("&").map((query) => {
    const [key, value] = query.split("=");
    return { key, value };
  });
};

export const getQueryStringFromQueryList = (queryList) => {
  console.log("hey");
  if (!queryList.length) return "";
  const queryListCopy = JSON.parse(JSON.stringify(queryList));
  const firstParam = queryListCopy.shift();
  const otherParams = queryListCopy.reduce((str, param) => {
    // if QS not include = param.value returns undefined
    // otherwise string (empty)
    if (param.key && param.value !== undefined) {
      return str + `&${param.key}=${param.value}`;
    } else {
      return str + `&${param.key}`;
    }
  }, "");
  return `?${firstParam.key}=${firstParam.value}` + otherParams;
};
