import { render, screen } from "@testing-library/react";
import Arrow from "./Arrow";

describe("should the SVG icon Arrow", () => {
  test("should render the SVG icon Arrow", () => {
    render(<Arrow />);

    const arrow = screen.getByTestId("arrow-svg-test");
    expect(arrow.getAttribute("data-testid")).toBe("arrow-svg-test");
  });
});
