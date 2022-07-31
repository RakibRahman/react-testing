import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Filter } from '../Filter'


describe('Filter', () => {

    it('should be able to change value of favorite filter', () => {

        render(<Filter />)
        const select: HTMLSelectElement = screen.getByLabelText('filterByGender')
        expect(select.value).toBe('male')
        userEvent.selectOptions(select, 'female')
        expect(select.value).toBe('female')

    })
})