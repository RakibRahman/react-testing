import { render } from '@testing-library/react'
import { rest } from 'msw'
import * as React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export const handlers = [
    rest.get(
        '*/react-query',
        (req, res, ctx) => {
            return res(
                ctx.status(200),
                ctx.json({
                    name: 'mocked-react-query'
                })
            )
        }
    ),
    rest.post(
        'https://jsonplaceholder.typicode.com/posts',
        (req, res, ctx) => {
            return res(
                ctx.status(200),
                ctx.json({
                    title: 'foo',
                    body: 'bar',
                    userId: 1,
                })
            )
        }
    )
]

const createTestQueryClient = () => new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
        },
    },
    logger: {
        log: console.log,
        warn: console.warn,
        error: () => { },
    }
})

export function renderWithClient(ui: React.ReactElement) {
    const testQueryClient = createTestQueryClient()
    const { rerender, ...result } = render(
        <QueryClientProvider client={testQueryClient}>{ui}</QueryClientProvider>
    )
    return {
        ...result,
        rerender: (rerenderUi: React.ReactElement) =>
            rerender(
                <QueryClientProvider client={testQueryClient}>{rerenderUi}</QueryClientProvider>
            ),
    }
}

export function createWrapper() {
    const testQueryClient = createTestQueryClient()
    return ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={testQueryClient}>{children}</QueryClientProvider>
    )
}