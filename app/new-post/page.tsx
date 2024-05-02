import createPost from "../createPost"


export default function CreateNewPost() {
    return (
        <div className="flex flex-col gap-5 h-fit w-full">
            <h1 className="text-xl">Create a New Post</h1>
            <form
                action={createPost}
                className="flex flex-col gap-5 w-full h-fit"
            >
                <p>
                    <input type="text" name="title" placeholder="Title..." className="w-full h-14 text-2xl placeholder-gray-500 focus:outline-none bg-slate-100 p-5 rounded-md" required />
                </p>
                <p>
                    <input type="file" name="image" accept="image/png, image/jpeg" required />
                </p>
                <p>
                    <textarea name="content" placeholder="Content..." className="resize-none w-full h-96 placeholder-gray-500 focus:outline-none bg-slate-100 p-5 rounded-md" required />
                </p>
                <button type="submit" className={`px-4 py-2 text-white rounded max-w-32 bg-blue-500 hover:bg-blue-400`}>Create Post</button>
            </form>
        </div>
    )
}
