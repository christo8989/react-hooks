import React from "react"
import styled from 'styled-components'

import { Container, Loading, Tweet } from "../components"
import { useGetTweets } from "../hooks";

const TweetsContainer = styled(Container)`
  max-width: 400px;
  justify-content: flex-start;
`

export default function Tweets({ className, userId }) {
  const { data, loading, error } = useGetTweets(userId)

  if (loading) {
    return <Loading />
  } 

  else if (error || !data || !Array.isArray(data.tweets)) {
    return <div>An error has occured</div>
  } 

  else if (data.tweets.length < 1) {
    return <div>No Tweets</div>
  } 

  else {
    return (
      <TweetsContainer className={className}>
        {
          data.tweets.map(tweet =>
            <Tweet key={tweet.id} {...tweet} />
          )
        }
      </TweetsContainer>
    )
  }
}