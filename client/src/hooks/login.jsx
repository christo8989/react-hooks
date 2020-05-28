import gql from "graphql-tag";
import { useQuery } from '@apollo/react-hooks';
import { useMutation } from "@apollo/react-hooks";

export const IS_LOGGED_IN = gql`
  query isLoggedIn {
    isLoggedIn @client
  }
`

export const MUTATION_LOGIN = gql`
  mutation login($email: String!) {
    login(email: $email)
  }
`

export const SAVE_TOKEN = gql`
  mutation saveToken($token: String!) {
    saveToken(token: $token) @client
  }
`

export function useIsLoggedIn() {
  const { data } = useQuery(IS_LOGGED_IN)
  return data.isLoggedIn
}

export function useLoginMutation() {
  const [saveToken] = useMutation(SAVE_TOKEN)
  const loginMutation = useMutation(MUTATION_LOGIN, {
    onCompleted({ login }) {
      saveToken({
        variables: { token: login }
      })
    }
  });
  return loginMutation
}