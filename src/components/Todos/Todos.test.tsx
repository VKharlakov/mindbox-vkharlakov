// Todos.test.js
import { render, fireEvent, screen } from "@testing-library/react";
import Todos from "./Todos";

test("renders Todos component", () => {
  render(<Todos />);

  // Check main item render
  const titleElement = screen.getByText(/todos/i);
  expect(titleElement).toBeInTheDocument();

  // Check add new deed
  const inputElement = screen.getByPlaceholderText(/что предстоит сделать?/i);
  fireEvent.change(inputElement, { target: { value: "Новая задача" } });
  fireEvent.submit(screen.getByRole("form"));

  // Check new deed render
  const newDeedElement = screen.getByText(/новая задача/i);
  expect(newDeedElement).toBeInTheDocument();

  // Check changing checkbox status
  const checkboxElement = screen.getByRole("checkbox");
  fireEvent.click(checkboxElement);

  // Check new checkbox status
  expect(checkboxElement).toBeChecked();
});
