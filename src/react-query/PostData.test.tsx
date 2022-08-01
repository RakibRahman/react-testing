import { render, renderHook, act, waitFor, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PostData } from './PostData'
import { renderWithClient } from './utils'
import { server } from '../setupTests'
import { rest } from 'msw'
describe('PostData', () => {

    it('renders the post component', async () => {
        renderWithClient(<PostData />)
        const button = (screen.getByRole('button'))
        userEvent.click(button)

        expect(await screen.findByText(/Successfully posted/i)).toBeInTheDocument()
    })

    it('shows error message', async () => {
        server.use(
            rest.post('*', (req, res, ctx) => {
                return res(ctx.status(500), ctx.json({
                    name: 'error',
                }))
            })
        )

        renderWithClient(<PostData />)
        const button = (screen.getByRole('button'))
        userEvent.click(button)
        expect(await screen.findByText(/An error has occurred/i)).toBeInTheDocument()


    })
})