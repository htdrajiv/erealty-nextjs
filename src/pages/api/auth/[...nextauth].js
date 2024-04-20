import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { roles } from '../../../components/constants';
import axios from 'axios';

const options = {
    // Configure one or more authentication providers
    providers: [
        Providers.Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            params: {
                grant_type: "authorization_code",
                // redirect_uri: "https://erealty-nextjs.vercel.app/api/auth/callback/google",
            },
        })
    ],
    pages: {
        signIn: '/auth/login',
        signOut: '/auth/signout',
        error: '/auth/error', // Error code passed in query string as ?error=
        verifyRequest: '/auth/verifyRequest', // (used for check email message)
        newUser: null // If set, new users will be directed here on first sign in
    },
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
    database: {
        type: 'mysql',
        host: '127.0.0.1',
        port: 3306,
        username: 'root',
        password: 'root@123',
        database: 'erealty'
    }
}

export default (req, res) => NextAuth(req, res, options)