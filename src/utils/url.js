export const isValidImgURL = (url) => {
  if (typeof url !== 'string') return false;
  const isValid = url.match(/\.(jpeg|jpg|gif|png)$/) != null;
  console.log({ url, isValid });
  return isValid;
};
