export * from './user';
export * from './channel';
export enum SidebarMode {
  memberList,
  channelList,
}
export enum ActionType {
  autoLogin,
  fetchUser,
  updateUser,
  updatePhoto,
  signup,
  login,
  logout,
}
export interface Action {
  type: ActionType;
  payload: any;
}
