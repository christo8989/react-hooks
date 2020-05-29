import React, { Fragment } from "react"
import styled from 'styled-components'
import gql from "graphql-tag";
import { useQuery } from '@apollo/react-hooks';

import { Container, Loading, Tweet, FixedTweetButton } from "../components"

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
      <FixedTweetButton />
    </Fragment>
  );
}