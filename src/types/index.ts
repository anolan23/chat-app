export * from './user';
export * from './channel';
export enum SidebarMode {
  memberList,
  channelList,
}
export enum ActionType {
  autoLogin,
  fetchUser,
  setUser,
  updateUser,
  updatePhoto,
  signup,
  login,
  logout,
  setChannel,
  setShowAddChannelPopup,
  createChannel,
  fetchAllChannels,
}
export interface Action {
  type: ActionType;
  payload: any;
}
