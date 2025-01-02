import React from 'react'
import { Link } from 'react-router'
import { Button } from '~/components/ui/button'

export default function ManagePosts() {
  return (
    <div className="p-4">
      <Button asChild>
        <Link to={"new"}>New Post</Link>
      </Button>
    </div>
  )
}
