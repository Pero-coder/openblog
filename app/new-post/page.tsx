import createPost from "../createPost"

export default function CreateNewPost() {
    return (
            <div className="flex flex-col gap-5 h-fit w-5/6">
                <h1 className="text-xl">Create a New Post</h1>
                <form
                    action={createPost}
                >
                    <p>
                        <input type="text" name="title" placeholder="Title..." className="w-full h-14 text-2xl placeholder-gray-500 focus:outline-none" required />
                    </p>
                    <p>
                        <input type="file" name="image" accept="image/png, image/jpeg" required />
                    </p>
                    <p>
                        <textarea name="content" placeholder="Content..." className="resize-none w-full h-96 placeholder-gray-500 focus:outline-none" required />
                    </p>
                    <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-400">Create Post</button>
                </form>
            </div>
        )
}
