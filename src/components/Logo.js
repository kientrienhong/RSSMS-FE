const Logo = (props) => (
  <img
    alt="Logo"
    src={process.env.PUBLIC_URL + "/img/logo.png"}
    {...props}
    width="40px"
    height="40px"
  />
);

export default Logo;
