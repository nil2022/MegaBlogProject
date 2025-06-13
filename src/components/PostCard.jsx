import appwriteService from '../appwrite/appwrite.config'
import { Link } from 'react-router-dom'

function PostCard({ $id, title, featuredImage, userId }) {
    // console.log(`(in PostCard component) userId: ${userId}`)

    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full bg-gray-100 rounded-xl p-8'>
                <div className='w-full justify-center mb-2'>
                    {/* <img src={appwriteService.getFilePreview(
                        featuredImage,
                        400, // width
                        '',  // height
                        '',  // crop
                        90   // quality
                        )} alt={title}
                        className='rounded-xl' /> */}
                    <img src={appwriteService.getFileView(
                        featuredImage,
                    )} alt={title}
                    className='rounded-xl w-full h-[200px] object-cover' />
                </div>
                <h2
                    className='text-xl text-center font-bold'>
                    {title}
                </h2>
                <p></p>
            </div>
        </Link>
    )
}

export default PostCard