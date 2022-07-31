import { Eshop } from '../Eshop'
import { render, screen } from '@testing-library/react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
const cats = [
    {
        id: 1,
        name: "Sydney",
        phone: "111-111-1111",
        email: "jamal@hotmail.com",
        image: {
            url: "https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGNhdHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
            alt: "beautiful cat",
        },
        favoured: false,
        color: "grey",
        gender: "female",
    },
    {
        id: 2,
        name: "Ethan",
        phone: "222-222-2222",
        email: "ethan@hotmail.com",
        image: {
            url: "https://images.unsplash.com/photo-1536590158209-e9d615d525e4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fGNhdHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
            alt: "beautiful cat",
        },
        favoured: false,
        color: "grey",
        gender: "male",
    },
    {
        id: 3,
        name: "Lily",
        phone: "333-333-3333",
        email: "laith@hotmail.com",
        image: {
            url: "https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fGNhdHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
            alt: "beautiful cat",
        },
        favoured: false,
        color: "grey",
        gender: "female",
    },
    {
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
    },
    {
        id: 5,
        name: "Holly",
        phone: "555-555-5555",
        email: "laith@hotmail.com",
        image: {
            url: "https://images.unsplash.com/photo-1561948955-570b270e7c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y2F0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
            alt: "beautiful cat",
        },
        favoured: false,
        color: "grey",
        gender: "female",
    },
    {
        id: 6,
        name: "Sakura",
        phone: "666-666-6666",
        email: "sakura@hotmail.com",
        image: {
            url: "https://images.unsplash.com/photo-1561948955-570b270e7c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y2F0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
            alt: "beautiful cat",
        },
        favoured: false,
        color: "brown",
        gender: "female",
    },
];
const server = setupServer(
    rest.get('http://localhost:4000/cats', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(cats)
        )
    })
)

beforeAll(() => {
    server.listen()
})
afterEach(() => {
    server.resetHandlers()
})

afterAll(() => {
    server.close()
})
describe('EShop', () => {

    it('displays the loading state', async () => {
        server.use(
            rest.get('localhost:4000/cats', (req, res, ctx) => {
                return res(ctx.delay(300),
                    // ctx.json(cats)
                    // ctx.status(100)
                )
            })
        )

        render(<Eshop />)
        // ...assert the loading state of the UI.
        expect(await screen.findByText('Cats are loading...')).toBeInTheDocument()
    })

    it('should render the page with correct amount of cards', async () => {
        render(<Eshop />)
        const cards = await screen.findAllByTestId('card')
        expect(cards.length).toBe(6)
    })
    it('should show error message if data fetching failed', async () => {
        server.use(
            rest.get("http://localhost:4000/cats", (req, res, ctx) => {
                return res.once(
                    ctx.status(500),
                    ctx.json({
                        error: "error happened"
                    })
                );
            })
        );
        render(<Eshop />)
        expect(
            // Expect the mocked error response to be present in the DOM.
            await screen.findByText("Axios Error with Message: Request failed with status code 500")
        ).toBeInTheDocument();
    })
})