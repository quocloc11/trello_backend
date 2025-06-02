export const inviteUserToBoardSocket = (socket) => {

  socket.on('FE_USER_INVITER_TO_BOARD', (invitation) => {
    socket.broadcast.emit('BE_USER_INVITER_TO_BOARD', invitation)
  })
}