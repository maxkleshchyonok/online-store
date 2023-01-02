const hash = window.location.hash.slice(1);

export const parameters = new URLSearchParams(hash.includes('?') ? hash.slice(hash.indexOf('?') + 1) : '');