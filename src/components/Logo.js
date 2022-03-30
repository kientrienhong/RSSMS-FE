const Logo = (props) => (
  <img
    alt="Logo"
    src={process.env.PUBLIC_URL + "/img/logo.png"}
    {...props}
    width="120px"
    height="40px"
  />
);

export default Logo;
