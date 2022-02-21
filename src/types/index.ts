export * from './user';
export * from './channel';
export * from './message';
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
  createMessage,
}
export interface Action {
  type: ActionType;
  payload: any;
}
