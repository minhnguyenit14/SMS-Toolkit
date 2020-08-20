export const homeStackRoutes = {
    home: 'Home'
}

export const mainStackRoutes = {
    main: 'Main',
    ...homeStackRoutes
}

export const modalStackRoutes = {
    popup: 'modal_popup',
    picker: 'modal_picker',
}

const appRoutes = {
    ...mainStackRoutes,
    ...modalStackRoutes
}

export default appRoutes;