import React from "react"
import { useParams } from "@reach/router"

import { useGetTweet } from "../hooks"
import { Loading } from "../components"
import ComposeTweet from "./compose-tweet"

export default function EditTweet() {
  const { tweetId } = useParams()
  const { data, loading, error } = useGetTweet(tweetId)

  return (
    loading ? <Loading /> :
      error || !data || !data.tweet ? <div>An error occured.</div> :
        !data.tweet.isOwner ? <div>You are not the owner.</div> :
          <ComposeTweet {...data.tweet} />
  )
}