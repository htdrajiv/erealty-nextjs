import Login from "../../components/Login/Login"
import { providers, csrfToken } from 'next-auth/client'

export default function LoginPg({ providers, csrfToken }) {
    return (
        <div>
            <Login providers={providers} csrfToken={csrfToken} />
        </div>
    )
}

LoginPg.getInitialProps = async (context) => {
    return {
        providers: await providers(context),
        csrfToken: await csrfToken(context)
    }
}