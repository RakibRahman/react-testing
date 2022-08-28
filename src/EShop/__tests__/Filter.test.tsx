import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Filter } from "../Filter";
import { EshopContext } from "../Eshop"
describe("Filter", () => {
  it("should be able to change value of gender filter", () => {
    render(<EshopContext.Provider value={{
      data: [], setData: () => [], loading: false, error: '', filterCat: {
        gender: 'any',
        favorite: 'any',
      }, setFilterCat: () => { }
    }}>
      <Filter />

    </EshopContext.Provider>);
    const select: HTMLSelectElement = screen.getByLabelText("filterByGender");
    expect(select.value).toBe("any");
    userEvent.selectOptions(select, "male");
    expect(select.value).toBe("male");
  });
});
