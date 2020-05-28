import React from 'react';
import gql from "graphql-tag";
import { useQuery } from '@apollo/react-hooks';
import Button from "../components/button"
import Input from "../components/input"
import styled from 'styled-components'
import Container from '../components/container';
import useTextInput from "../hooks/input"
import { useApolloClient, useMutation } from "@apollo/react-hooks";
import Loading from '../components/loading';

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