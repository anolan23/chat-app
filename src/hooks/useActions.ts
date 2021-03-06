import useStore from '../context';
import axios from 'axios';

import { Credentials } from '../types/user';
import { ActionType, Channel, Message, SidebarMode, User } from '../types';

export function useActions() {
  const [{ socket }, dispatch] = useStore();

  async function login(
    credentials: Credentials,
    callback: (user: User) => void
  ) {
    try {
      const response = await axios.post<User>('/api/login', credentials);
      dispatch({ type: ActionType.login, payload: response.data });
      callback(response.data);
    } catch (error) {
      throw error;
    }
  }

  async function updateUser(id: number, cols: any) {
    try {
      const response = await axios.patch<User>(`/api/users/${id}`, cols);
      dispatch({ type: ActionType.updateUser, payload: response.data });
    } catch (error) {
      throw error;
    }
  }

  async function updatePhoto(userId: number, photo: File) {
    try {
      const data = new FormData();
      data.append('photo', photo);
      const response = await axios.patch<User>(
        `/api/users/${userId}/photo`,
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      dispatch({ type: ActionType.updatePhoto, payload: response.data });
    } catch (error) {
      throw error;
    }
  }

  async function signup(credentials: Credentials) {
    try {
      const response = await axios.post<User>('/api/signup', credentials);
      dispatch({ type: ActionType.signup, payload: response.data });
    } catch (error) {
      throw error;
    }
  }

  async function logout() {
    try {
      const response = await axios.post('/api/logout');
      dispatch({ type: ActionType.logout, payload: response.data });
    } catch (error) {
      throw error;
    }
  }

  async function autoLogin() {
    try {
      const response = await axios.get<User>('/api/login');
      dispatch({ type: ActionType.autoLogin, payload: response.data });
    } catch (error) {
      throw error;
    }
  }

  function setChannel(channel: Channel): void {
    dispatch({ type: ActionType.setChannel, payload: channel });
  }

  function setShowAddChannelPopup(show: boolean): void {
    dispatch({ type: ActionType.setShowAddChannelPopup, payload: show });
  }

  function setShowSidebar(show: boolean): void {
    dispatch({ type: ActionType.setShowSidebar, payload: show });
  }

  async function createChannel(
    channel: Channel,
    callback: (channel: Channel) => void
  ) {
    try {
      const response = await axios.post<Channel>('/api/channels', channel);
      dispatch({ type: ActionType.createChannel, payload: response.data });
      callback(response.data);
    } catch (error) {
      throw error;
    }
  }

  async function fetchAllChannels() {
    try {
      const response = await axios.get('/api/channels');
      dispatch({ type: ActionType.fetchAllChannels, payload: response.data });
    } catch (error) {
      throw error;
    }
  }

  async function fetchChannel(id: number) {
    try {
      const response = await axios.get(`/api/channels/${id}`);
      dispatch({ type: ActionType.fetchChannel, payload: response.data });
    } catch (error) {
      throw error;
    }
  }

  async function createMessage(message: Message) {
    try {
      const response = await axios.post<Message>('/api/messages', message);
      dispatch({ type: ActionType.createMessage, payload: response.data });
    } catch (error) {
      throw error;
    }
  }

  function sendMessage(message: Message): void {
    socket.emit('sendMessage', message, (error) => {
      if (error) console.error(error);
      else console.log('Message sent');
    });
  }

  function addMessage(message: Message): void {
    dispatch({ type: ActionType.addMessage, payload: message });
  }

  function setMessages(messages: Message[]): void {
    dispatch({ type: ActionType.setMessages, payload: messages });
  }

  async function fetchMessagesByChannelId(channelId: number) {
    try {
      const response = await axios.get<Message[]>('/api/messages', {
        params: {
          channelId,
        },
      });
      dispatch({
        type: ActionType.fetchMessagesByChannelId,
        payload: response.data,
      });
    } catch (error) {
      throw error;
    }
  }

  function join(user: User, channelId: number): void {
    socket.emit('join', user, channelId, (error) => {
      if (error) console.error(error);
      console.log(`Successfully joined channel ${channelId}`);
    });
  }

  function setMembers(members: User[]): void {
    dispatch({ type: ActionType.setMembers, payload: members });
  }

  function setMode(mode: SidebarMode): void {
    dispatch({ type: ActionType.setMode, payload: mode });
  }
  return {
    autoLogin,
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
    fetchMessagesByChannelId,
    sendMessage,
    addMessage,
    setMessages,
    join,
    setMembers,
    fetchChannel,
    setMode,
    setShowSidebar,
  };
}
