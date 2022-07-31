import { Card } from '../Card'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const mockData = {
    id: 4,
    name: "Felix",
    phone: "444-444-4444",
    email: "gather@hotmail.com",
    image: {
        url: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8Y2F0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
        alt: "beautiful cat",
    },
    favoured: false,
    color: "grey",
    gender: "male",
}

describe('Card Component', () => {

    it('should render a card with image', () => {
        render(<Card cat={mockData} />)
        expect(screen.getByRole('img')).toHaveAttribute('src', mockData.image.url)
    })

    it('Successfully renders a card with heading', () => {
        render(<Card cat={mockData} />)
        expect(screen.getByRole('heading', { name: /felix/i })).toBeInTheDocument()
    })

    it('Successfully renders a card with color', () => {
        render(<Card cat={mockData} />)
        expect(screen.getByText(/grey/i).textContent).toBe('grey')
    })

    it('Successfully renders a card with updated name', () => {
        render(<Card cat={{ ...mockData, name: 'pakura' }} />)
        expect(screen.getByRole('heading', { name: /pakura/i })).toBeInTheDocument()

    })

    it('Card should show outline heart', () => {
        render(<Card cat={mockData} />)
        expect(screen.getByRole('button')).toHaveClass('icon-heart-outline')
        expect(screen.getByRole('button')).not.toHaveClass('icon-heart-fill')

    })

    it('Card should show fill heart', () => {
        render(<Card cat={{ ...mockData, favoured: true }} />)
        expect(screen.getByRole('button')).toHaveClass('icon-heart-fill')
        expect(screen.getByRole('button')).not.toHaveClass('icon-heart-outline')

    })

    it('Should toggle heart status', () => {
        render(<Card cat={{ ...mockData, favoured: true }} />)
        expect(screen.getByRole('button')).toHaveClass('icon-heart-fill')
        expect(screen.getByRole('button')).not.toHaveClass('icon-heart-outline')
        userEvent.click(screen.getByRole('button'))
        expect(screen.getByRole('button')).toHaveClass('icon-heart-outline')
        expect(screen.getByRole('button')).not.toHaveClass('icon-heart-fill')
    })
})