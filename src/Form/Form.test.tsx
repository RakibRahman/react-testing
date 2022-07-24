import { Form } from "./Form";
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

describe("Form", () => {

    // Test 1
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

    //Test 2
    it("should be able to type an user name & email", () => {
        render(<Form />)
        const userName: HTMLInputElement = screen.getByRole('textbox', { name: /user/i })
        expect(userName.value).toBe('')
        userEvent.type(userName, 'rakib')
        expect(userName.value).toBe('rakib')

        const emailElement: HTMLInputElement = screen.getByLabelText('email')
        expect(emailElement.value).toBe('');
        userEvent.type(emailElement, 'rakib@gmail.com')
        expect(emailElement.value).toBe('rakib@gmail.com')

    })

    //Test 3
    it('should match password and confirm password', () => {
        render(<Form />)
        const passwordElement: HTMLInputElement = screen.getByLabelText('password')
        const repeatPassword: HTMLInputElement = screen.getByPlaceholderText('Repeat Password');
        userEvent.type(passwordElement, '458458rt')
        expect(passwordElement.value).toBe('458458rt')
        userEvent.type(repeatPassword, '458458rt')
        expect(repeatPassword.value).toBe('458458rt')
        expect(passwordElement.value).toEqual(repeatPassword.value)
    })

    //Test 4
    it('Checkbox should work properly', () => {
        render(<Form />)
        const checkElement: HTMLInputElement = screen.getByRole('checkbox', { name: 'Subscribe?' })
        expect(checkElement).not.toBeChecked()
        userEvent.click(checkElement)
        expect(checkElement).toBeChecked()

    })

})