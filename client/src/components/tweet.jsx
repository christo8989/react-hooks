import React from "react"
import styled from 'styled-components'
import { Link } from "@reach/router"

import Container from "./container"

const TweetContainer = styled(Container)`
  height: unset;
  padding: 1rem;
  box-sizing: border-box;
  align-items: flex-start;
`

const TextContainer = styled.div`
  margin-bottom: 0.5rem;
  color: white;
`

const RowContainer = styled(Container)`
  flex-flow: row;
`

const FooterContainer = styled(RowContainer)`
  font-size: 0.5rem;
`

const EditLink = styled(Link)`
  color: rosybrown;
`

const Spacer = styled.span`
  margin-left: auto;
`

function Tweet({ className, id, isOwner, owner, text, createdAt, updatedAt }) {
  return (
    <TweetContainer className={className}>
      <RowContainer>
        <span>Author: {owner.email}</span>
        <Spacer></Spacer>
        {isOwner && <EditLink to={`tweet/${id}/edit`}>edit</EditLink>}
      </RowContainer>
      <TextContainer>{text}</TextContainer>
      <FooterContainer>
        {
          createdAt !== updatedAt ? <span>edited!</span> : null
        }
        <Spacer>{(new Date(Number(createdAt))).toLocaleString()}</Spacer>
      </FooterContainer>
    </TweetContainer>
  )
}

export default Tweet