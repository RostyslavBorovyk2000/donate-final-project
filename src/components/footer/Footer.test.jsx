import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../redux/store";
import Footer from "./Footer";


jest.mock("axios", () => ({
  post: jest.fn(),
}));


describe("should the Footer", () => {
  test("should render the Footer", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Footer />
        </BrowserRouter>
      </Provider>,
    );
    const footer = screen.getByTestId("footer-svg-test");
    expect(footer.getAttribute("data-testid")).toBe("footer-svg-test");
  });
});
