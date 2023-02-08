import MenuItem from "../contextless/menu/MenuItem"

const Header = () => {
  return (
    <>
      <MenuItem url="/" name="Home (with indexedDb)" />
      <MenuItem url="/posts" name="Posts (with object cache)" />
      <MenuItem url="/simple" name="Simple page (no cache)" />
    </>
  )
};

export default Header;
