import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

export const LOGOUT = gql`
  mutation logout { 
    logout(logout: true) @client
  }
`

export function useLogout() {
  const logout = useMutation(LOGOUT)
  return logout
}