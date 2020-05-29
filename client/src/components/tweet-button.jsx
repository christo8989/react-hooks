import React from "react"
import styled from 'styled-components'
import { Link } from "@reach/router"

import { Button } from "."

export default function TweetButton({ className }) {
  return (
    <Button
      className={className}
      border
      as={Link}
      to="/compose/tweet"
    >
      Tweet
    </Button>
  )
}

export const FixedTweetButton = styled(TweetButton)`
  position: fixed;
  bottom: 0.5rem;
  right: 0.5rem;
`