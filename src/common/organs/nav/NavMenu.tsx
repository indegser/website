import styled from "@emotion/styled";
import { colors } from "types/style.types";
import Link from "next/link";
import { useRouter } from "next/router";

const MenuItem = styled.a`
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;

  &[aria-current="true"] {
    color: ${colors.textLightGrey};
    pointer-events: none;
  }
`;

const NavMenu = () => {
  const { pathname } = useRouter();

  const items = [
    { href: "/", name: "이슈" },
    { href: "/books", name: "책" },
  ];

  return (
    <>
      {items.map((item) => (
        <Link key={item.name} href={item.href} passHref>
          <MenuItem aria-current={pathname === item.href}>{item.name}</MenuItem>
        </Link>
      ))}
    </>
  );
};

export default NavMenu;
