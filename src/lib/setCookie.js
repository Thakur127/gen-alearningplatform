// const setCookie = (name, value, options = {}) => {
//   const { expires, path = "/", domain, secure, httpOnly, sameSite } = options;

//   let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

//   if (expires) {
//     // Convert expiration time to a valid string
//     const expirationDate = new Date(expires).toUTCString();
//     cookieString += `;expires=${expirationDate}`;
//   }

//   if (path) {
//     cookieString += `;path=${path}`;
//   }

//   if (domain) {
//     cookieString += `;domain=${domain}`;
//   }

//   if (secure) {
//     cookieString += ";secure";
//   }

//   if (httpOnly) {
//     cookieString += ";httpOnly";
//   }

//   if (sameSite) {
//     cookieString += `;sameSite=${sameSite}`;
//   }

//   document.cookie = cookieString;
// };

// export default setCookie;

const setCookie = (name, value, options = {}) => {
  let cookieString = `${name}=${value}; path=/;`;

  if (options.expires) {
    cookieString += `expires=${options.expires};`;
  }

  if (options.maxAge) {
    cookieString += `max-age=${options.maxAge};`;
  }

  if (options.domain) {
    cookieString += `domain=${options.domain};`;
  }

  if (options.secure) {
    cookieString += "secure;";
  }

  if (options.sameSite) {
    cookieString += `samesite=${options.sameSite};`;
  }

  document.cookie = cookieString;
};

export default setCookie;
