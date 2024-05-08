import { useEffect, useState } from 'react'
import appwriteService from "../appwrite/appwrite.config";
import { Container, PostCard } from '../components'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { AuroraBackground } from '../components/ui/aurora-background';

function Home() {
    const [posts, setPosts] = useState([])

    const userAuth = useSelector((state) => state.auth)
    // console.log('userAuth: (in /pages/Home.jsx) ', userAuth)
    const navigate = useNavigate()

    useEffect(() => {
        if (userAuth.status === true) {
            // console.log('executed')
            appwriteService.getPosts([]).then((posts) => {
                if (posts) {
                    setPosts(posts.documents)
                }
            })
        } else navigate('/')

        return () => {
            // console.clear()
            // console.log('unmounted from Home.jsx')
        }
    }, [])

    if (posts.length === 0 && userAuth.status === true) {
        return (
            <AuroraBackground>
                <motion.dev
                    initial={{ opacity: 0.0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 0.3,
                        duration: 0.8,
                        ease: "easeInOut",
                    }}
                // className="relative flex flex-col gap-4 items-center justify-center px-4"
                >
                    <div className="w-full py-8 mt-4 text-center">
                        <Container>
                            <div className="flex flex-wrap">
                                <div className="p-2 w-full">
                                    <h1 className="text-2xl font-bold hover:text-gray-500">
                                        Welcome to Dashboard. Create a Post to get started
                                    </h1>
                                </div>
                            </div>
                        </Container>
                    </div>
                </motion.dev>
            </AuroraBackground>
        )
    }
    if (posts.length === 0 && userAuth.status === false) {
        return (
            <AuroraBackground className={'bg-gray-900'}>
                <motion.dev
                    initial={{ opacity: 0.0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 0.3,
                        duration: 0.8,
                        ease: "easeInOut",
                    }}
                >
                    <div className="relative w-full py-8 mt-4 text-center">
                        <Container>
                            <div className="flex flex-wrap">
                                <div className="p-2 w-full">
                                    <h1 className="text-4xl text-white font-bold hover:text-gray-500 transition-all duration-500">
                                        Welcome, Login to get started
                                    </h1>
                                </div>
                            </div>
                        </Container>
                    </div>
                </motion.dev>
            </AuroraBackground>

        )
    }
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-col sm:flex-row sm:gap-y-4 flex-wrap min-h-[500px] justify-center'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 sm:max-w-[350px] sm:max-h-[400px]'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home