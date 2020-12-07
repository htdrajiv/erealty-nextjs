export const roles = {
    "GUEST": "GUEST", "MEMBER": "MEMBER"
};

export const path = {
    "SECURE": "SECURE", "PUBLIC": "PUBLIC"
}

export const routes = {
    '/': { isPrivate: false, redirectPath: "/", name: 'home', roles: [roles.GUEST, roles.MEMBER] },
    '/member/properties': { isPrivate: true, redirectPath: "/", name: 'myProperty', roles: [roles.MEMBER] },
    '/member/profile': { isPrivate: true, redirectPath: "/", name: 'profile', roles: [roles.MEMBER] },
    '/search': { isPrivate: false, redirectPath: "/", name: 'search', roles: [roles.GUEST, roles.MEMBER] },
    '/search/:searchText': { isPrivate: false, redirectPath: "/", name: 'searchWithParams', roles: [roles.GUEST, roles.MEMBER] },
    '/login': { isPrivate: false, redirectPath: "/", name: 'login', roles: [roles.GUEST] },
    '/signUp': { isPrivate: false, redirectPath: "/", name: 'signUp', roles: [roles.GUEST] }
}

// export default { routes, path };