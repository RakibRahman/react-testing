import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PostData } from './PostData'
import { renderWithClient } from './utils'

import { rest } from 'msw'
import { handlers } from './utils'

import { setupServer } from 'msw/node'
// import { setLogger } from '@tanstack/react-query'

export const server = setupServer(...handlers)
// Establish API mocking before all tests.
beforeAll(() => server.listen())
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers())
// Clean up after the tests are finished.
afterAll(() => server.close())
describe('PostData', () => {

    it('should show loading indicator while fetching user', async () => {
        server.use(rest.get('https://randomuser.me/api/', (req, res, ctx) => {
            ctx.delay(400)
        }))
        renderWithClient(<PostData />)
        expect(await screen.findByText(/Loading USer/i)).toBeInTheDocument()
    })
    it('should show user name', async () => {
        renderWithClient(<PostData />)
        expect(await screen.findByText(/Rakib/i)).toBeInTheDocument()
    })

    it('Shows error message if fetching user failed', async () => {
        server.use(rest.get('https://randomuser.me/api/', (req, res, ctx) => {
            return (res(ctx.status(500), ctx.json({
                error: { message: 'error occurred while fetching user' }
            })))
        }))
        renderWithClient(<PostData />)
        expect(await screen.findByText(/error fetching user/i)).toBeInTheDocument()
    })
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