const setCookie = (name, value, options = {}) => {
  const { expires, path = "/", domain, secure, httpOnly, sameSite } = options;

  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  if (expires) {
    // Convert expiration time to a valid string
    const expirationDate = new Date(expires).toUTCString();
    cookieString += `;expires=${expirationDate}`;
  }

  if (path) {
    cookieString += `;path=${path}`;
  }

  if (domain) {
    cookieString += `;domain=${domain}`;
  }

  if (secure) {
    cookieString += ";secure";
  }

  if (httpOnly) {
    cookieString += ";httpOnly";
  }

  if (sameSite) {
    cookieString += `;sameSite=${sameSite}`;
  }

  document.cookie = cookieString;
};

export default setCookie;
