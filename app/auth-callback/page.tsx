import { redirect } from 'next/navigation'
import React from 'react'
import { CreateUserIfNull } from './actions'

const page = async () => { 
  const { success } = await CreateUserIfNull()
  if (!success) {
    return <div> Something went wrong signing you in! Contact support</div>
  }
  redirect("/")
}

export default page