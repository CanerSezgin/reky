const colors = {
  default: '#78909C',
  success: '#4DB6AC',
  info: '#0097A7',
  error: '#FF7043',
};

export const getStatusCodeColor = (statusCode) => {
  if (!statusCode || isNaN(status)) return colors.default;

  if (statusCode >= 200 && statusCode < 300) return colors.success;
  else if (statusCode >= 300 && statusCode < 400) return colors.info;
  else if (statusCode >= 400) return colors.error;
  else return colors.default;
};
