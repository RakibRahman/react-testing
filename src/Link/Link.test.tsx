import { screen, render } from '@testing-library/react'
import Link from './Link'


describe('Link', () => {
  it('should render Link', () => {
    render(<Link page='www.google.com'>
      Hello
    </Link>)
    expect(screen.getByTestId('link')).toBeInTheDocument()
    expect(screen.getByTestId('link').textContent).toMatch('Hello')
  })
})