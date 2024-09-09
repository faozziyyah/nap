const base64urlDecode = (base64url: string): string => {
  const base64 = base64url.replace(/-/g, '+').replace(/_/g, '/');
  const padding =
    base64.length % 4 === 0 ? '' : '='.repeat(4 - (base64.length % 4));
  return decodeURIComponent(escape(window.atob(base64 + padding)));
};

export const parseJwt = (token: string): any => {
  const parts = token.split('.');
  if (parts.length !== 3) {
    throw new Error('Invalid token');
  }
  const payload = parts[1];
  return JSON.parse(base64urlDecode(payload));
};
