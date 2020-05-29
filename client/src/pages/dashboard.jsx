import React, { Fragment } from "react"
import { Link } from "@reach/router";
import styled from 'styled-components'
import gql from "graphql-tag";
import { useQuery } from '@apollo/react-hooks';

import { Button, Container, Loading, Tweet } from "../components"

const GET_ALL_TWEETS = gql`
  query tweets($userId: ID) {
    tweets(userId: $userId) {
      id
      userId
      text
      createdAt
      updatedAt
    }
  }
`

const TweetButton = styled(Button)`
  position: fixed;
  bottom: 0.5rem;
  right: 0.5rem;
  border: 2px solid white;
`

const Tweets = styled(Container)`
  max-width: 400px;
  justify-content: flex-start;
`

export default function Dashboard() {
  const { data, loading, error, fetchMore } = useQuery(GET_ALL_TWEETS, {
    variables: { userId: null }
  });

  return (
    <Fragment>
      <TweetButton as={Link} to="/compose/tweet">
        Tweet
      </TweetButton>
      {
        error ? <div>An error has occured</div> :
          <Tweets>
            {
              loading ? <Loading /> :
                !data || !data.tweets || data.tweets.length < 1 ? <div>No Tweets</div> :
                  data.tweets.map(tweet =>
                    <Tweet key={tweet.id} {...tweet} />
                  )
            }
          </Tweets>
      }
    </Fragment>
  );
}