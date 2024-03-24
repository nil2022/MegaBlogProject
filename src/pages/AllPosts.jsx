import { useEffect, useState } from 'react'
import { Container, PostCard } from '../components'
import appwriteService from '../appwrite/appwrite.config'
import { useSelector } from 'react-redux'

function AllPosts() {
    const [posts, setPosts] = useState([])

    const authSlice = useSelector((state) => state.auth.userData)
    // console.log('authSlice: (in AllPosts component): ', authSlice.$id || null)

    useEffect(() => {
        console.log('Loaded AllPosts.jsx')
        appwriteService.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents)
                // console.log('Posts fetched (in AllPosts component): ', posts)
            }
        })
            .catch((error) => {
                console.log(error)
            })

        return () => {
            // console.clear()
            console.log('unmounted from AllPosts.jsx')
        }
    }, [])

    if (authSlice && (posts.filter(post => post.userId === authSlice.$id).length === 0)) {
        return (
            <div className='w-full py-8 mt-4 text-center'>
                <Container>
                    <div className='flex flex-wrap'>
                        <div className='p-2 w-full'>
                            <h1 className='text-2xl font-bold hover:text-gray-500'>
                                No posts found
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return authSlice ? (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {/* {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))} */}
                    {posts.filter(post => post.userId === authSlice?.$id).map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    ) : null
}

export default AllPosts