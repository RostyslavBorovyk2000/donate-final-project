// import AdminPage from "./AdminPage";
// import { render, screen } from '@testing-library/react'

// describe("AdminPage", () => {
//   test("should render an h1 element with the text 'Hello, world!'", () => {
//     render(<AdminPage />);

//     const h1 = screen.getByText("Кабінет адміністратора");
//     expect(h1).toBeInTheDocument();
//   });
// });

import { render, screen } from "@testing-library/react";
import AdminPage from "./AdminPage";

describe("AdminPage", () => {
  test("should render an h1 element with the text 'Кабінет адміністратора'", () => {
    render(<AdminPage />);

    const h1 = screen.getByText("Кабінет адміністратора");
    expect(h1).toBeInTheDocument();
  });
});
