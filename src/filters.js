import Vue from 'vue';

Vue.filter('formatDate', (d) => {
  if (!d) return '';
  const date = new Date(d);
  const opts = { year: 'numeric', month: 'long', day: 'numeric' };
  const tz = 'en-US';
  const dateStr = date.toLocaleDateString(tz, opts);
  const timeStr = date.toLocaleTimeString(tz);
  return `${dateStr} | ${timeStr}`;
});
