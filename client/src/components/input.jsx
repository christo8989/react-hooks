import styled from 'styled-components'

const Input = styled.input`
  padding: 0.5rem;
  margin: 0.25rem;
  width: 100%;
  max-width: 300px;
  border-radius: 0.25rem;
  border: none;
`

export default Input

export const Textarea = styled(Input).attrs({
  as: "textarea"
})`
  resize: vertical;
`