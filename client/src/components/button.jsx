import styled from 'styled-components'

const Button = styled.button.attrs(props => ({
  color: props.color || "white",
  backgroundColor: props.backgroundColor || "transparent",
  border: props.border ? props.border : false,
  zIndex: 0,
  borderRadius: "0.25rem",
}))`
  position: relative;
  margin: 0.5rem;
  padding: 0.5rem 1rem;
  border: 2px solid ${props => props.border ? props.color : props.backgroundColor};
  border-radius: ${props => props.borderRadius};
  background-color: ${props => props.backgroundColor};
  font-size: 1.25rem;
  font-weight: bold;
  cursor: pointer;
  user-select: none;
  color: ${props => props.color};
  text-decoration: none;
  z-index: ${props => props.zIndex};

  &::before {
    content: "";
    position: absolute;
    top: 0; 
    left: 0;
    width: 100%; 
    height: 100%;  
    border-radius: ${props => props.borderRadius};
    opacity: 0; 
    z-index: ${props => props.zIndex - 1};
    background-color: black;
  }

  &:hover {
    &::before {
      opacity: 0.1;
    }
  }
`

export default Button