import styled from 'styled-components'

const Button = styled.button`
  margin: 0.5rem;
  padding: 0.5rem 1rem;
  border: 2px solid transparent;
  border-radius: 0.25rem;
  background-color: transparent;
  font-size: 1.25rem;
  font-weight: bold;
  cursor: pointer;
  user-select: none;
  color: white;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1)
  }
`

export default Button