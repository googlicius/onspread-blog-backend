'use strict';
const { EventEmitter } = require('events');
const { postCommentedEventSchema } = require('../utils/validation-schemas');

const notificationEvent = new EventEmitter();

const CHANNEL = {
  PostCommented: 'PostCommented',
  UserRegistered: 'UserRegistered',
  UserRegistrationFailed: 'UserRegistrationFailed',
};

notificationEvent.on(CHANNEL.PostCommented, async (data) => {
  await postCommentedEventSchema.validateAsync(data);

  // Don't send notification on own post.
  if (data.post.user === data.user.id) {
    return;
  }

  const notificationData = {
    title: `<strong>${data.user.username}</strong> đã bình luận bài viết của bạn.`,
    isVisible: true,
    channel: CHANNEL.PostCommented,
    url: `/posts/${data.post.slug}?display-comments=1&comment-highlighted=${data.id}`,
    user: data.post.user,
    message: data.content,
  };

  const notification = await strapi.services.notification.create(notificationData);

  strapi.io.to(data.post.user).emit('notification', notification);
});

module.exports = {
  CHANNEL,
  notificationEvent,
};
