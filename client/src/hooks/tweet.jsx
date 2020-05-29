import gql from "graphql-tag";
import { useQuery, useMutation } from '@apollo/react-hooks';
import { navigate } from "@reach/router"
import { USER_TILE } from ".";

export const TWEET_TILE = gql`
  fragment TweetTile on Tweet {
    id
    text
    createdAt
    updatedAt
    isOwner
    owner {
      ...UserTile
    }
  }
  ${USER_TILE}
`;

export const GET_TWEET_BY_ID = gql`
  query tweet($id: ID!) {
    tweet(id: $id) {
      ...TweetTile
    }
  }
  ${TWEET_TILE}
`

export const UPSERT_TWEET = gql`
  mutation tweet($id: ID, $text: String!) {
    tweet(id: $id, text: $text) {
      success
      message
      tweet {
        ...TweetTile
      }
    }
  }
  ${TWEET_TILE}
`

export const GET_TWEETS = gql`
  query tweets($userId: ID) {
    tweets(userId: $userId) {
      ...TweetTile
    }
  }
  ${TWEET_TILE}
`

export function useGetTweet(tweetId) {
  const tweet = useQuery(GET_TWEET_BY_ID, {
    variables: { id: tweetId },
  });
  return tweet
}

export function useGetTweets(userId) {
  // Get all when userId is null
  const tweets = useQuery(GET_TWEETS, {
    variables: { userId },
  })
  return tweets
}

export function useUpsertTweet({ navigateTo }) {
  const tweet = useMutation(UPSERT_TWEET, {
    refetchQueries: [{
      query: GET_TWEETS,
    }],
    onCompleted() {
      if (!tweet.error) {
        setTimeout(() => {
          navigate(navigateTo)
        })
      }
    }
  })
  return tweet
}