import { render, screen } from "@testing-library/react";
import AdminPage from "./AdminPage";

describe("AdminPage", () => {
  test("should render an h1 element with text 'Кабінет адміністратора'", () => {
    render(<AdminPage />);

    const h1 = screen.getByText("Кабінет адміністратора");
    expect(h1).toBeInTheDocument();
  });
});
