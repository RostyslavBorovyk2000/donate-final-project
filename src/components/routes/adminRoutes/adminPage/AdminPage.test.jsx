import { render, screen } from "@testing-library/react";
import AdminPage from "./AdminPage";

describe("AdminPage", () => {
  test("should render element with the text 'Кабінет адміністратора'", () => {
    render(<AdminPage />);

    const text = screen.getByText("Кабінет адміністратора");
    expect(text).toBeInTheDocument;
  });
});
