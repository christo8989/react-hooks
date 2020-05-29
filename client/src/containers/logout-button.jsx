import React from "react"
import { Button } from "../components"
import { useLogout } from "../hooks"

function LogoutButton({ className }) {
  const [logout] = useLogout()

  function onClick(e) {
    e.stopPropagation()
    e.preventDefault()
    logout()
  }

  return (
    <Button className={className} onClick={onClick}>Logout</Button>
  )
}

export default LogoutButton