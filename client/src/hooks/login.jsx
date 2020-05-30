import gql from "graphql-tag";
import { useQuery } from '@apollo/react-hooks';
import { useMutation } from "@apollo/react-hooks";
import { GET_TWEETS } from ".";

export const USER_TILE = gql`
  fragment UserTile on User {
    id
    email
  }
`

export const IS_LOGGED_IN = gql`
  query isLoggedIn {
    isLoggedIn @client
  }
`

export const LOGIN = gql`
  mutation login($email: String!) {
    login(email: $email)
  }
`

export const SAVE_LOGIN_TOKEN = gql`
  mutation saveLoginToken($token: String!) {
    saveLoginToken(token: $token) @client
  }
`

export function useIsLoggedIn() {
  const { data } = useQuery(IS_LOGGED_IN)
  return data.isLoggedIn
}

export function useLogin() {
  const [saveLoginToken] = useMutation(SAVE_LOGIN_TOKEN, {
    refetchQueries: [
      { query: GET_TWEETS },
    ],
  })
  const loginMutation = useMutation(LOGIN, {
    onCompleted({ login }) {
      saveLoginToken({
        variables: { token: login },
      })
    }
  });
  return loginMutation
}
