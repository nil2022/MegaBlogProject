import React, { useEffect } from 'react'
import {Container, PostForm} from '../components'

function AddPost() {
  useEffect(() => {
    console.log('Loaded AddPost.jsx')

    return () => {
      console.clear()
    }
  })
  return (
    <div className='py-8'>
        <Container>
            <PostForm />
        </Container>
    </div>
  )
}

export default AddPost