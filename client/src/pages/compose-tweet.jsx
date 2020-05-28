import React from "react"
import useTextInput from "../hooks/input"
import { Textarea } from "../components/input"
import Form from "../components/form"
import styled from 'styled-components'
import Button from "../components/button"
import Container from "../components/container"
import { navigate } from "@reach/router"


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

export default function ComposeTweet() {
  const maxLength = 150
  const tweet = useTextInput()

  function submit(e) {
    e.preventDefault()
    navigate("/")
  }

  return (
    <Form onSubmit={submit}>
      <TweetTextarea
        required
        maxLength={maxLength}
        rows="5"
        {...tweet}
      />
      <BottomContainer>
        <Button type="submit">Submit</Button>
        <CharacterCount>{(tweet.value || "").length} / {maxLength}</CharacterCount>
      </BottomContainer>
    </Form>
  )
}