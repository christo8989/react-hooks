import React from 'react';
import Button from "../components/button"
import Input from "../components/input"
import styled from 'styled-components'
import useTextInput from "../hooks/input"
import Loading from '../components/loading';
import { useLoginMutation } from '../hooks/login';
import Form from '../components/form';

const EmailInput = styled(Input)`
  padding: 1rem;
  font-size: 1.5rem;
  max-width: 350px;
`

export default function Login() {
  const email = useTextInput()
  const [login, { loading, error }] = useLoginMutation()

  function submit(e) {
    e.preventDefault()
    login({ 
      variables: { email: email.value } 
    })
  }

  return (
    <React.Fragment>
      <div>{error ? "An error occured" : null}</div>
      {
        loading ? <Loading /> : <Form onSubmit={submit}>
          <EmailInput required type="email" placeholder="Email" {...email} />
          <Button type="submit">Login</Button>
        </Form>
      }
    </React.Fragment>
  )
}

