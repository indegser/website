import styled from "@emotion/styled";
import { COLORS } from "common/theme";
import Link from "next/link";
import { useRouter } from "next/router";

const MenuItem = styled.a`
  font-size: 0.925rem;
  cursor: pointer;

  &[aria-current="true"] {
    color: ${COLORS.textLightGrey};
    pointer-events: none;
  }
`;

const NavMenu = () => {
  const { pathname } = useRouter();

  const items = [
    { href: "/", name: "Issues" },
    { href: "/books", name: "Books" },
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
