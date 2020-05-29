import React from "react"
import styled from 'styled-components'

import { useTextInput, useUpsertTweet } from "../hooks"
import { Button, Container, Textarea, Form, Loading } from "../components"

const maxWidth = "400px"

const TweetTextarea = styled(Textarea)`
  padding: 1rem;
  font-size: 1.5rem;
  max-width: ${maxWidth};
`

const BottomContainer = styled(Container)`
  height: unset;
  max-width: ${maxWidth};
  flex-flow: row;
`

const CharacterCount = styled.span`
  margin-left: auto;
  color: #121212;
`

export default function ComposeTweet({ id, text }) {
  const maxLength = 150
  const tweet = useTextInput(text)
  const [ submitTweet, { loading, error } ] = useUpsertTweet({ navigateTo: "/" })

  function submit(e) {
    e.preventDefault()
    submitTweet({ 
      variables: { 
        text: tweet.value,
        id,
      },
    })
  }

  return (
    <Form onSubmit={submit}>
      {error && <div>An error has occured.</div>}
      <TweetTextarea
        required
        maxLength={maxLength}
        rows="5"
        {...tweet}
      />
      <BottomContainer>
        {
          loading ? <Loading /> : <Button type="submit">Submit</Button>
        }
        <CharacterCount>{(tweet.value || "").length} / {maxLength}</CharacterCount>
      </BottomContainer>
    </Form>
  )
}