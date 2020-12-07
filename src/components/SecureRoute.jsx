import React, { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import DefaultErrorPage from 'next/error'
import { useSession, getSession } from 'next-auth/client'
import { routes } from './constants'

function SecureRoute(props) {
    const [session, loading] = useSession();

    const router = useRouter();
    let getRoute = () => {
        let route = routes[router.pathname]
        try {
            if (typeof route !== "undefined" && route !== null) {
                if (!route.isPrivate) {
                    return (props.children);
                } else {
                    if (typeof window !== 'undefined' && loading)
                        return null
                    if (!loading && !session)
                        return <DefaultErrorPage statusCode={404} />
                    return (props.children)
                }
            } else {
                return <DefaultErrorPage statusCode={404} />
            }
        } catch (exception) {
            return <DefaultErrorPage statusCode={404} error={exception} />
        }
    }

    return (getRoute());
}

export async function getServerSideProps(context) {
    const session = await getSession(context)
    return {
        props: { session }
    }
}

export default SecureRoute;