import { render } from '@testing-library/react'
import { rest } from 'msw'
import * as React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export const handlers = [
    rest.get(
        'https://randomuser.me/api/',
        (req, res, ctx) => {
            return res(
                ctx.status(200),
                ctx.json({
                    "results": [
                        {
                            "gender": "female",
                            "name": {
                                "title": "Mr",
                                "first": "Rakib",
                                "last": "Laurent"
                            },
                            "location": {
                                "street": {
                                    "number": 7174,
                                    "name": "Rue des Écoles"
                                },
                                "city": "Brest",
                                "state": "Haute-Marne",
                                "country": "France",
                                "postcode": 32564,
                                "coordinates": {
                                    "latitude": "-15.9535",
                                    "longitude": "112.4608"
                                },
                                "timezone": {
                                    "offset": "-10:00",
                                    "description": "Hawaii"
                                }
                            },
                            "email": "oceane.laurent@example.com",
                            "login": {
                                "uuid": "d721bb36-49db-4905-bfcb-1b1bc8575343",
                                "username": "sadbutterfly750",
                                "password": "saleen",
                                "salt": "J1TLbuD7",
                                "md5": "5e0a28391b91cdd5e10e74457338d65f",
                                "sha1": "c8ff65528f7f43ff15fe10b8a67e63c741c59598",
                                "sha256": "7387a68f6222b58de460034ef17cfe9bd3f27b179dd9f8f84cf7c906f2748436"
                            },
                            "dob": {
                                "date": "1951-09-28T16:56:57.401Z",
                                "age": 70
                            },
                            "registered": {
                                "date": "2017-01-01T22:13:12.798Z",
                                "age": 5
                            },
                            "phone": "03-34-32-22-70",
                            "cell": "06-07-49-18-13",
                            "id": {
                                "name": "INSEE",
                                "value": "2510818497585 75"
                            },
                            "picture": {
                                "large": "https://randomuser.me/api/portraits/women/77.jpg",
                                "medium": "https://randomuser.me/api/portraits/med/women/77.jpg",
                                "thumbnail": "https://randomuser.me/api/portraits/thumb/women/77.jpg"
                            },
                            "nat": "FR"
                        }
                    ],
                    "info": {
                        "seed": "908fa0511e5af5d1",
                        "results": 1,
                        "page": 1,
                        "version": "1.4"
                    }
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