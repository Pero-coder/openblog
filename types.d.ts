import NextAuth, { type DefaultSession } from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
    interface JWT {
        userName?: string | null
        following: string[]
    }
}

declare module "next-auth" {
    /**
     * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: {
            userName?: string | null
            following: string[]
        } & DefaultSession["user"]
    }
}
  