"use client"

import { useFormStatus } from "react-dom"

export default function SubmitButton({value, pendingMessage}: {value: string, pendingMessage: string}) {
    const { pending } = useFormStatus()

    return (
        <button type="submit" disabled={pending} className={`px-4 py-2 text-white rounded max-w-32 ${pending ? "bg-slate-500" : "bg-blue-500 hover:bg-blue-400"}`}>{pending ? pendingMessage : value}</button>
    )
}
