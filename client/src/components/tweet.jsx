import React from "react"
import styled from 'styled-components'
import Container from "./container"

const TweetContainer = styled(Container)`
  height: unset;
  padding: 1rem;
  box-sizing: border-box;
  align-items: flex-start;
`

const TextContainer = styled.div`
  margin-bottom: 0.5rem;
`

function Tweet({ className, userId, text, createdAt, updatedAt }) {
  return (
    <TweetContainer className={className}>
      <TextContainer>{text}</TextContainer>
      <div>{createdAt}</div>
      <div>{updatedAt}</div>
    </TweetContainer>
  )
}

export default Tweet