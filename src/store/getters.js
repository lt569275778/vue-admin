const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  // token: state => state.user.token,
  // name: state => state.user.name,
  // roles: state => state.user.roles,
  personinfo: state => state.personinfo,
  subject: state => state.subject,
  platform: state => state.platform,
  pageform: state => state.pageform,
  menulist: state => state.menulist,
  gourplist: state => state.gourplist,
  pagelist: state => state.pagelist,
  pagestructure: state => state.pagestructure,
  getdatas: state => state.getdatas
}
export default getters
