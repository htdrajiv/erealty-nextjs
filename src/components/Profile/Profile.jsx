import { CardColumns, Card, Form, Button } from 'react-bootstrap'
import { useSession } from 'next-auth/client'

export default function Profile(props) {
    const [session, loading] = useSession()
    if (loading) return <div> loading... </div>
    if (!loading && !session) return <div> loading... </div>
    return (
        <div>
            <Card bg={'light'} border="success" className="bm-3">
                <Card.Body>
                    <Card.Title>User Profile</Card.Title>
                    <Card.Text>
                        <img title={session.user.name} className="profile-pic right-margin-1" src={session.user.image} />
                        {session.user.name}
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <small className="text-muted">Last updated 3 mins ago</small>
                </Card.Footer>
            </Card>
        </div>
    )
}