const memberList = [];

function addMember(user, channelId) {
  if (!user || !channelId) return { error: 'User and channelId are required' };

  const userExists = memberList.find((member) => {
    return member.socketId === user.socketId;
  });
  if (userExists) return { error: 'User already exists' };
  const member = { ...user, channelId };
  memberList.push(member);
  return member;
}

function removeMember(socketId) {
  const index = memberList.findIndex((member) => member.socketId === socketId);
  if (index !== -1) return memberList.splice(index, 1)[0];
}

function getMember(socketId) {
  return memberList.find((member) => member.socketId === socketId);
}

function getMembersByChannelId(id) {
  return memberList.filter((member) => member.channelId === id);
}

function leaveChannel(io, socket) {
  const member = removeMember(socket.id);
  if (member) {
    io.to(member.channelId).emit(
      'action',
      `${member.name} has left channel ${member.channelId}`
    );
    io.to(member.channelId).emit(
      'members',
      getMembersByChannelId(member.channelId)
    );
    socket.leave(member.channelId);
  }
}

module.exports = {
  addMember,
  removeMember,
  getMember,
  getMembersByChannelId,
  leaveChannel,
};

// const user = { socketId: 22, name: 'Aaron' };
// const user2 = { socketId: 23, name: 'Sean' };
// const user3 = { socketId: 24, name: 'Caroline' };

// addMember(user, 7);
// addMember(user2, 7);
// addMember(user3, 7);
// removeMember(24);
// const members = getMembersByChannelId(7);
// console.log(members);
