import ReduxConstants  from '../ReduxConstants.jsx';

function UserReducer(state, action) {
    switch (action.type) {
        case ReduxConstants.LOGIN:
            return {
                loggedIn: true,
                authProvider: action.authProvider,
                userId: action.userId,
                userName: action.userName,
                softRole: ReduxConstants.AUTH_ROLE_USER,
                image: action.image
            };
        case ReduxConstants.LOGOUT:
            return {
                loggedIn: false,
                authProvider: "",
                userId: "",
                userName: "",
                softRole: ReduxConstants.AUTH_ROLE_GUEST,
                image: ""
            };
        default:
            return {
                loggedIn: false,
                authProvider: "",
                userId: "",
                userName: "",
                softRole: ReduxConstants.AUTH_ROLE_GUEST,
                image: ""
            };
    }
}

export default UserReducer;