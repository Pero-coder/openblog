import { auth } from "@/auth";
import SubmitButton from "@/components/Buttons/SubmitButton";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { redirect } from "next/navigation";

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
            action={async (formData) => {
                "use server";
                await prisma.user.update({
                    where: {
                        id: user.id,
                    },
                    data: {
                        name: (formData.get("name") as string) || undefined,
                        bio: (formData.get("bio") as string) || undefined,
                    },
                });
                redirect(`/u/${user.userName}`);
            }}
        >
            <div className="flex flex-col gap-3">
                <h1 className="text-xl">Edit profile</h1>
                <div className="flex flex-col gap-5">
                    <p>Image:</p>
                    <Image
                        src={user?.image as string}
                        alt=""
                        width={250}
                        height={250}
                        className="rounded-full justify-end"
                    />
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
                        className="resize-none w-full min-h-64 placeholder-gray-500 focus:outline-none bg-slate-50 p-5 rounded-md"
                    >
                        {user?.bio}
                    </textarea>
                </div>
                <SubmitButton
                    value="Edit profile"
                    pendingMessage="Editing profile..."
                />
            </div>
        </form>
    );
}
