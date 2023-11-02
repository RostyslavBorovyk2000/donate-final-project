import { render, screen } from "@testing-library/react";
import LinkedIn from "./LinkedIn";

describe("should the SVG icon Linkedin", () => {

    test("should render the SVG icon Linkedin", () => {
    render (<LinkedIn />),

    const linkedin = screen.getByTestId("linkedin-svg-test");
    expect(linkedin.getAttribute("data-testid")).toBe("linkedin-svg-test");
    });
});