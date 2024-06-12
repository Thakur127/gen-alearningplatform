import React from "react";
import SocialLogin from "react-social-login";

const SocialButton = ({ children, triggerLogin, ...props }) => {
  return (
    <div onClick={triggerLogin} {...props}>
      {children}
    </div>
  );
};

export default SocialLogin(SocialButton);
