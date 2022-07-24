import { Form } from "./Form";
import { render, screen } from "@testing-library/react"


describe("Form", () => {

    it("should render the inputs with empty values", () => {
        render(<Form />)

        const userName: HTMLInputElement = screen.getByRole('textbox', { name: /user/i })
        const emailElement: HTMLInputElement = screen.getByLabelText('email')
        const passwordElement: HTMLInputElement = screen.getByLabelText('password')
        const repeatPassword: HTMLInputElement = screen.getByPlaceholderText('Repeat Password');


        const elements = [userName, emailElement, passwordElement, repeatPassword]

        elements.forEach((element) => {
            expect(element.value).toBe('');
        })


    })
})