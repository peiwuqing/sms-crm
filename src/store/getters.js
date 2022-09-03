const getters = {
    token:state => state.user.token,
    sidebar: state => state.app.sidebar,
    device: state => state.app.device,
    avatar: state => state.user.avatar,
    name: state => state.user.name,
    roles: state => state.user.roles,
    user: state => state.user.userData,
    menus: state => state.user.menus,
    addRouters: state => state.permission.addRouters,
    visitedViews: state => state.tagsView.visitedViews,
    cachedViews: state => state.tagsView.cachedViews,
    agentState: state => state.chat.agentState,
    recordSrc:state=>state.app.recordSrc,
}
export default getters
