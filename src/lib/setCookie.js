const setCookie = (
  name,
  value,
  { expireIn, sameSite = "none", secure = true }
) => {
  document.cookie =
    name +
    "=" +
    value +
    ";" +
    "expires=" +
    expireIn +
    ";" +
    `sameSite=${sameSite};path=/;secure=${secure};`;
};

export default setCookie;
