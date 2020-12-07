import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { roles } from '../../../components/constants';

const options = {
    // Configure one or more authentication providers
    providers: [
        Providers.Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
        // ...add more providers here
    ],
    callbacks: {
        signIn: async (user, account, profile) => {
            return Promise.resolve(true)
        },
        redirect: async (url, baseUrl) => {
            return Promise.resolve(baseUrl)
        },
        session: async (session, user) => {
            if (!session.user.role)
                session.user.role = roles.MEMBER
            return Promise.resolve(session)
        },
        jwt: async (token, user, account, profile, isNewUser) => {
            return Promise.resolve(token)
        }
    },
    events: {
        signIn: async (message) => {
            /* on successful sign in */
        },
        signOut: async (message) => { /* on signout */ },
        createUser: async (message) => { /* user created */ },
        linkAccount: async (message) => { /* account linked to a user */ },
        session: async (message) => {
            /* session is active */
        },
        error: async (message) => { /* error in authentication flow */ }
    },

    // A database is optional, but required to persist accounts in a database
    database: process.env.DATABASE_URL,
}

export default (req, res) => NextAuth(req, res, options)