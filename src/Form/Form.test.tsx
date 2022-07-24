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

    // Test 5
    it('Should show error on invalid email', () => {
        render(<Form />)
        const errorElement = screen.queryByText(/Please enter a valid email/i)
        const emailElement: HTMLInputElement = screen.getByLabelText('email')
        const submitButton: HTMLButtonElement = screen.getByRole('button', { name: 'Sign Up' })
        expect(errorElement).not.toBeInTheDocument()
        userEvent.type(emailElement, 'rakib@')
        userEvent.click(submitButton)
        const errorElementVisible = screen.queryByText(/Please enter a valid email/i)

        expect(errorElementVisible).toBeInTheDocument()
    })

    //Test 6
    it('Should show error if password is less than 6 characters', () => {
        render(<Form />)
        const emailElement: HTMLInputElement = screen.getByLabelText('email')

        const passError = screen.queryByText(/Please enter a password more than 6 characters/i)
        const passwordElement: HTMLInputElement = screen.getByLabelText('password')
        const submitButton: HTMLButtonElement = screen.getByRole('button', { name: 'Sign Up' })
        userEvent.type(emailElement, 'rakib@gmail.com')
        expect(passError).not.toBeInTheDocument()
        userEvent.type(passwordElement, '1123')
        userEvent.click(submitButton)
        const passErrorVisible = screen.queryByText(/Please enter a password more than 6 characters/i)
        expect(passErrorVisible).toBeInTheDocument()

    })
    //Test 7
    it('Should show error if passwords does not match', () => {
        render(<Form />)
        const emailElement: HTMLInputElement = screen.getByLabelText('email')
        const passwordElement: HTMLInputElement = screen.getByLabelText('password')
        const repeatPassword: HTMLInputElement = screen.getByPlaceholderText('Repeat Password');
        const submitButton: HTMLButtonElement = screen.getByRole('button', { name: 'Sign Up' })
        const matchError = screen.queryByText(/Password does not match/i)
        expect(matchError).not.toBeInTheDocument()
        userEvent.type(emailElement, 'rakib@gmail.com')
        userEvent.type(passwordElement, '456456w')
        userEvent.type(repeatPassword, 'rkddas')
        userEvent.click(submitButton)
        const matchErrorVisible = screen.queryByText(/Password does not match/i)
        expect(matchErrorVisible).toBeInTheDocument()


    })

})