"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { put } from "@vercel/blob";
import { redirect } from "next/navigation";
import { bioSchema, fileSchema, nameSchema } from "../schemas";

export default async function editProfile(formData: FormData) {
    const session = await auth();

    if (!session) {
        return "Unauthorized";
    }

    const user = await prisma.user.findUnique({
        where: {
            id: session.user.id,
        },
    });

    const image = fileSchema.safeParse(formData.get("image")).data;
    
    if (image) {
        const blob = await put(image.name, image, {
            access: "public",
            contentType: image.type
        });
        
        await prisma.user.update({
            where: {
                id: user?.id,
            },
            data: {
                image: blob.url,
            },
        });
    }

    await prisma.user.update({
        where: {
            id: user?.id,
        },
        data: {
            name: nameSchema.safeParse(formData.get("name")).data,
            bio: bioSchema.safeParse(formData.get("bio")).data,
        },
    });

    redirect(`/u/${user?.userName}`);
}
