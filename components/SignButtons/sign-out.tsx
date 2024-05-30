import { signOut } from "@/auth"
 
export function SignOut() {
    return (
        <form
            action={async () => {
                "use server"
                await signOut()
            }}
        >
            <button type="submit" className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-400">
                Sign Out
            </button>
        </form>
    )
}
