import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import HeaderJson from './Headers'
import ImageLoader from '../Misc/ImageLoader.jsx'
import { useSession, signOut } from 'next-auth/client'

function Header(props) {
    const [session, loading] = useSession()
    const [state, setState] = useState({ scrolled: false, scrolledClass: "" });
    var dynamic_functions = [];

    useEffect(() => {
        window.addEventListener('scroll', makeStickyHeader)
    }, []);

    let makeStickyHeader = () => {
        const offset = window.scrollY;
        if (offset > 175) {
            setState({
                ...state,
                scrolled: true,
                scrolledClass: "fixed-top"
            });
        }
        else {
            setState({
                ...state,
                scrolled: false,
                scrolledClass: ""
            });
        }
    };

    dynamic_functions
    ['getLogoutSection'] = () => {
        return (
            <div key='signout_section'>
                <Link href="/member/profile">
                    <a><img title={session.user.name} className="profile-pic right-margin-1" src={session.user.image} /></a>
                </Link>
                <button onClick={signOut}>
                    Logout
            </button>
            </div>
        )
    }

    let prepareHeaderComponents = () => {
        if (loading) return {}
        let headers = { leftHeaders: [], rightHeaders: [] };
        for (let item in HeaderJson) {
            let header = HeaderJson[item];
            if (header.display) {
                if (!loading && !session) {
                    if (!header.isSecure) {
                        if (header.render !== null) {
                            <li className={header.className} key={item}>
                                {headers[header.position + "Headers"].push(dynamic_functions[header.render]())};
                            </li>
                        } else {
                            headers[header.position + "Headers"].push(
                                <li className={header.className} key={item}>
                                    <a href={header.to} key={item} className="text-white">
                                        {header.text}
                                    </a>
                                </li>
                            );
                        }
                    }
                } else {
                    if (header.roles.indexOf(session.user.role) > -1) {
                        if (header.render !== null) {
                            <li className={header.className} key={item}>
                                {headers[header.position + "Headers"].push(dynamic_functions[header.render]())};
                            </li>
                        } else {
                            headers[header.position + "Headers"].push(
                                <li className={header.className} key={item}>
                                    <a href={header.to} key={item} className="text-white">
                                        {header.text}
                                    </a>
                                </li>
                            );
                        }
                    }
                }
            }
        }
        return headers;
    }

    let headers = prepareHeaderComponents();

    let { scrolled, scrolledClass } = state;

    return (
        <div className={"header"}>
            {scrolled && <div id="fillStickyScrolledArea" className={""} style={{ height: "7vh", width: "5vh" }} />}
            <nav className={"navbar navbar-expand-lg navbar-dark bg- rounded " + scrolledClass}>
                <a className="navbar-brand" href="/">
                    <ImageLoader name='logo1.png' alt='E-Realty' style={{ height: "4vh", width: "5vh" }} />
                </a>
                <ul className="navbar-nav">
                    {headers["leftHeaders"]}
                </ul>
                <ul className="navbar-nav ml-auto">
                    {headers["rightHeaders"]}
                </ul>
            </nav>
        </div>
    )
}

export default Header;