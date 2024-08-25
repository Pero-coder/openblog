import { auth } from "@/auth";
import SubmitButton from "@/components/Buttons/SubmitButton";
import SelectImage from "@/components/SelectImage";
import editProfile from "@/components/ServerActions/editProfile";
import { prisma } from "@/lib/prisma";

export default async function EditUserPage({
    params,
}: {
    params: { userName: string };
}) {
    const user = await prisma.user.findUnique({
        where: {
            userName: params.userName,
        },
    });

    if (!user) {
        return <div>User not found</div>;
    }

    const session = await auth();

    if (session?.user.id !== user.id) {
        return <div>Unauthorized</div>;
    }

    return (
        <form
            className="w-full"
            action={editProfile}
        >
            <div className="flex flex-col gap-3">
                <h1 className="text-xl">Edit profile</h1>
                <div className="flex flex-col gap-5">
                    <p>Image:</p>
                    <SelectImage image={user.image as string}/>
                </div>
                <div className="flex flex-col gap-5">
                    <label htmlFor="name">Name:</label>
                    <input
                        name="name"
                        type="text"
                        defaultValue={user?.name as string}
                        placeholder="Name..."
                        className="justify-end w-full h-14 text-lg placeholder-gray-500 focus:outline-none bg-slate-50 p-5 rounded-md"
                    />
                </div>
                <div className="flex flex-col gap-5">
                    <label htmlFor="bio">Bio:</label>
                    <textarea
                        name="bio"
                        placeholder="Bio..."
                        defaultValue={user?.bio as string}
                        className="resize-none w-full min-h-64 placeholder-gray-500 focus:outline-none bg-slate-50 p-5 rounded-md"
                    />
                </div>
                <SubmitButton
                    value="Edit profile"
                    pendingMessage="Editing profile..."
                />
            </div>
        </form>
    );
}
