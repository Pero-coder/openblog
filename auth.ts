import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"

import GitHub from "next-auth/providers/github"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [GitHub],
  callbacks: {
    async jwt({ token, user }) {
      if (user) { // User is available during sign-in
        const dbUser = await prisma.user.findUnique({
          where: {
            id: user.id
          }
        })

        token.userName = dbUser?.userName
        token.following = dbUser?.following || []
      }
      return token
    },
    session({ session, token }) {
      if (token && token.userName) {
        session.user.userName = token.userName
        session.user.following = token.following
      }
      return session
    },
  }
})