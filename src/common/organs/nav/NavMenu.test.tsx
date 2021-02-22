import { render, screen } from "@testing-library/react";
import { useRouter } from "next/router";
import NavMenu from "./NavMenu";

jest.mock("next/router");

const mockUseRouter = useRouter as jest.Mock;

describe("NavMenu", () => {
  beforeEach(() => {});
  it("sets aria-current with useRouter", () => {
    mockUseRouter.mockReturnValueOnce({ pathname: "/" });
    const { rerender } = render(<NavMenu />);

    const link = screen.getByText("이슈");
    expect(link.getAttribute("aria-current")).toBe("true");

    mockUseRouter.mockReturnValueOnce({ pathname: "/books" });
    rerender(<NavMenu />);

    expect(screen.getByText("책").getAttribute("aria-current")).toBe("true");
  });
});
