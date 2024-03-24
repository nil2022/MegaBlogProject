// Appwrite configuration
import { useSelector } from "react-redux";
import urlConfig from "../config/url.config";
import { Client, ID, Databases, Storage, Query } from "appwrite";

// const authSlice = useSelector((state) => state.auth.userData);
// console.log('authSlice: (in appwrite.config.js): ', authSlice)

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(urlConfig.appwriteUrl)
            .setProject(urlConfig.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title, slug, content, featuredImage, status, userId}) {
        try {
            console.log('userId: ', userId);
            const createdPost = await this.databases.createDocument(
                urlConfig.appwriteDatabaseId,
                urlConfig.appwriteCollectionId,
                slug, // can also be ID.unique()
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
            console.log('Post created ! ✅');
            return createdPost;
        } catch (error) {
            console.log('Appwrite service :: createPost :: error: ', error);
            throw error;
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}) {
        try {
            const updatedPost = await this.databases.updateDocument(
                urlConfig.appwriteDatabaseId,
                urlConfig.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
            console.log('Post updated: (in appwrite.config.js)');
            return updatedPost;
        } catch (error) {
            console.log('Appwrite service :: updatePost :: error: ', error);
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                urlConfig.appwriteDatabaseId,
                urlConfig.appwriteCollectionId,
                slug
            )
            console.log('Post deleted: ', slug);
            return true;
        } catch (error) {
            console.log('Appwrite service :: deletePost :: error: ', error);
            return false;
        }
    }

    async getPost(slug) {
        try {
            const fetchOnePost = await this.databases.getDocument(
                urlConfig.appwriteDatabaseId,
                urlConfig.appwriteCollectionId,
                slug
            )
            // console.log('Post fetched: ', fetchOnePost);
            return fetchOnePost;
        } catch (error) {
            console.log('Appwrite service :: getDocument :: error: ', error);
            throw error;
        }
    }

    async getPosts(queries = [Query.equal('status', ['active'])]) {
        try {
            // console.log('props: ', props[0]);
            const fetchPosts = await this.databases.listDocuments(
                urlConfig.appwriteDatabaseId,
                urlConfig.appwriteCollectionId,
                queries,
                // TODO: Check for queries based on userId, where post shown by user who has created it
            // [Query.equal("status", "active")]
            )
            // console.log('Posts fetched (in getPosts): ', fetchPosts);
            return fetchPosts;
        } catch (error) {
            console.log('Appwrite service :: getPosts :: error: ', error);
            throw error;
            // return false;
        }
    }

    // file upload service

    async uploadFile(file) {
        try {
            const fileUploadResponse = await this.bucket.createFile(
                urlConfig.appwriteBucketId,
                ID.unique(),
                file
            )
            console.log('File uploaded: ', fileUploadResponse);
            return fileUploadResponse;
        } catch (error) {
            console.log('Appwrite service :: uploadFile :: error: ', error);
            return error;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                urlConfig.appwriteBucketId,
                fileId
            );
            console.log('File deleted: ', fileId);
            return true;
        } catch (error) {
            console.log('Appwrite service :: deleteFile :: error: ', error);
            return false;
        }
    }

    getFilePreview(fileId) {
        return this.bucket.getFilePreview(
            urlConfig.appwriteBucketId,
            fileId
        )
    }
}

const service = new Service();

export default service;
