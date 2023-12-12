import type {PostsType} from "@/types/Types";

export async function fetchPosts(): Promise<PostsType[]> {

    const response = await fetch('https://jsonplaceholder.typicode.com/posts');

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
}
