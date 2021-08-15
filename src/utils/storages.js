const preKey = 'reky_';
export const LStorage = {
  set(key, value) {
    localStorage.setItem(`${preKey}_${key}`, JSON.stringify(value));
  },
  get(key) {
    const dataStr = localStorage.getItem(`${preKey}_${key}`);
    try {
      return JSON.parse(dataStr);
    } catch (error) {
      return '';
    }
  },
};
