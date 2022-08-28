import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Filter } from "../Filter";
import { FilterByCategory } from "../Eshop";
const defaultProps = {
  filterCat: {
    gender: "any",
    favorite: "any",
  },
  setFilterCat: jest.fn(),
};

describe("Filter", () => {
  it("should be able to change value of gender filter", () => {
    render(<Filter {...defaultProps} />);
    const select: HTMLSelectElement = screen.getByLabelText("filterByGender");
    expect(select.value).toBe("any");
    userEvent.selectOptions(select, "male");
    expect(select.value).toBe("male");
  });
});
