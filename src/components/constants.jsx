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
    '/auth/login': { isPrivate: false, redirectPath: "/", name: 'login', roles: [roles.GUEST] },
    '/auth/signUp': { isPrivate: false, redirectPath: "/", name: 'signUp', roles: [roles.GUEST] }
}

export const featureCodes = {
    'bedroom': 10001,
    'bathroom': 10002,
    'kitchen': 10003,
    'sittingRoom': 10004,
    'furnished': 10005,
    'garage': 10006,
    'waterTank': 10007,
    'road': 10008,
    'storeRoom': 10009,
}

export const cardViewTypes = { "DECK": "DECK", "ROW": "ROW" }

// export default { routes, path };