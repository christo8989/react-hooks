import gql from "graphql-tag";
import { useQuery } from '@apollo/react-hooks';
import { useMutation } from "@apollo/react-hooks";

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
    login(email: $email) {
      ...UserTile
    }
  }
  ${USER_TILE}
`

export const SAVE_LOGIN_TOKEN = gql`
  mutation saveLoginToken($user: User!) {
    saveLoginToken(user: $user) @client
  }
`

export function useIsLoggedIn() {
  const { data } = useQuery(IS_LOGGED_IN)
  return data.isLoggedIn
}

export function useLoginMutation() {
  const [saveLoginToken] = useMutation(SAVE_LOGIN_TOKEN)
  const loginMutation = useMutation(LOGIN, {
    onCompleted({ login }) {
      saveLoginToken({
        variables: { user: login },
      })
    }
  });
  return loginMutation
}