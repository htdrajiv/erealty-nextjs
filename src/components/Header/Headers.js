import { roles } from "../constants"

const HeaderJson = [
  {
    "index": 1,
    "exact": true,
    "to": "/search",
    "name": "search",
    "text": "Search",
    "position": "left",
    "className": "nav-item left-padding-1 right-padding-1",
    "roles": [
      roles.MEMBER,
      roles.GUEST
    ],
    "display": true,
    "isSecure": false,
    "render": null
  },
  {
    "index": 2,
    "to": "/member/properties",
    "name": "properties",
    "text": "Properties",
    "position": "left",
    "className": "nav-item left-padding-1 right-padding-1",
    "roles": [
      roles.MEMBER,
    ],
    "display": true,
    "isSecure": true,
    "render": null
  },
  {
    "index": 3,
    "to": "/member/profile",
    "name": "profile",
    "text": "Profile",
    "position": "left",
    "className": "nav-item left-padding-1 right-padding-1",
    "roles": [
      roles.MEMBER,
    ],
    "display": true,
    "isSecure": true,
    "render": null
  },
  {
    "index": 4,
    "to": "/login",
    "name": "login",
    "text": "Login",
    "position": "right",
    "className": "nav-item left-padding-1 right-padding-1",
    "roles": [
      roles.GUEST
    ],
    "display": true,
    "isSecure": false,
    "render": null
  },
  {
    "index": 5,
    "to": "/signUp",
    "name": "signUp",
    "text": "Sign Up",
    "position": "right",
    "className": "nav-item left-padding-1 right-padding-1",
    "roles": [
      roles.GUEST
    ],
    "display": true,
    "isSecure": false,
    "render": null
  },
  {
    "index": 6,
    "to": "/logout",
    "name": "logout",
    "text": "Logout",
    "position": "right",
    "className": "nav-item left-padding-1 right-padding-1",
    "roles": [
      roles.MEMBER,
    ],
    "display": true,
    "isSecure": true,
    "render": "getLogoutSection"
  }
]

export default HeaderJson;