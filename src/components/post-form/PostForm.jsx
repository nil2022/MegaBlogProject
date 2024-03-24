import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "../index.js";
import appwriteService from "../../appwrite/appwrite.config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active"
        }
    });

    const navigate = useNavigate();
    const userData = useSelector(state => state.auth.userData);
    console.log('userData: (in PostForm component) ', userData)

    const submit = async (data) => {
        if (post) {
            // console.log('Data: (in PostForm component) ', data)
            console.log('Post: (in PostForm component) ', post)
            try {
                const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null

                if (file) {
                    appwriteService.deleteFile(post.featuredImage)
                }

                const dbPost = await appwriteService.updatePost(post.$id, {
                    ...data,
                    featuredImage: file ? file.$id : undefined
                })
                // console.log('dbPost: (in PostForm component) ', dbPost)
                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            } catch (error) {
                console.log(error)
            }
        } else {
            const file = await appwriteService.uploadFile(data.image[0])
            // console.log('file: (in PostForm component) ', file)

            try {
                if (file) {
                    const fileId = file.$id
                    data.featuredImage = fileId
                    console.log('User data ID: ', userData.$id)
                    const dbPost = await appwriteService.createPost({
                        ...data,
                        userId: userData.$id
                    })
                    if (dbPost) {
                        navigate(`/post/${dbPost.$id}`);
                    }
                }
            } catch (error) {
                console.log(error)
                await appwriteService.deleteFile(file.$id)
                // throw error
            }
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-")

        return ""

    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            // console.log('new value : ', value)
            if (name === "title") {
                setValue("slug", slugTransform(value.title,
                    { shouldValidate: true }))
            }

        })
        // if(post) console.log('Post updated ! ')

        return () => {
            subscription.unsubscribe()
        }
    }, [watch, slugTransform, setValue])

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    disabled
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}

export default PostForm