import { render, screen } from "@testing-library/react";
import EyeOpen from "./EyeOpen";

describe("should the SVG icon EyeOpen", () => {
  test("should render the SVG icon EyeOpen", () => {
    render(<EyeOpen />);

    const eyeOpen = screen.getByTestId("eyeOpen-svg-test-adminLogin");
    expect(eyeOpen.getAttribute("data-testid")).toBe("eyeOpen-svg-test-adminLogin");
  });
});
