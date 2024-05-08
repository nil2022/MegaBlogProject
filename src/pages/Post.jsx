import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/appwrite.config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import authService from "../appwrite/auth";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const authSlice = useSelector((state) => (state.auth.userData));

    const isAuthor = post && authSlice ? post.userId === authSlice?.$id : false;

    // console.log('Post: (in Post component): ', post);
    // console.log('User data: (in Post component): ', userData);

    const getPostOwner = async () => {
        const postOwner = await authService.getUserPreferences();
        console.log('Post owner: (in Post component): ', postOwner?.userData?.name);
        return postOwner;
    };

    useEffect(() => {
        getPostOwner();
        // console.log('Loaded Post.jsx')
        // console.log('Slug value: ', slug);
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");

        return () => {
            // console.clear();
        };
    }, [slug, navigate]);

    const deletePost = () => {
        // TODO: add a feature to delete images from appwrite bucket before deleting post
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={appwriteService.getFilePreview(
                            post.featuredImage,
                            500, // width
                            '',  // height
                            '',  // crop
                            90   // quality
                            )}
                        alt={post.title}
                        className="rounded-xl"
                    />
                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                </div>
                <div>
                    {post.$id && <p className="text-sm text-gray-700">Posted by: {post.userId}</p>}
                </div>
            </Container>
        </div>
    ) : null;
}