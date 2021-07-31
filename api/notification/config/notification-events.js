'use strict';
const { EventEmitter } = require('events');
const { postCommentedEventSchema } = require('../utils/validation-schemas');

const notificationEvent = new EventEmitter();

/**
 * WARN: If you add new channel, update here and field `channel` in notification collection.
 */
const CHANNEL = {
  PostCommented: 'PostCommented',
  PostUpdated: 'PostUpdated',
  UserRegistered: 'UserRegistered',
  UserRegistrationFailed: 'UserRegistrationFailed',
};

/**
 * Send notification to post owner whenever new comment.
 */
notificationEvent.on(CHANNEL.PostCommented, async (comment) => {
  await postCommentedEventSchema.validateAsync(comment);

  // Don't send notification on own post.
  if (comment.post.user === comment.user.id) {
    return;
  }

  const notificationData = {
    title: `<strong>${comment.user.username}</strong> đã bình luận bài viết của bạn.`,
    isVisible: true,
    channel: CHANNEL.PostCommented,
    url: `/posts/${comment.post.slug}?display-comments=1&comment-highlighted=${comment.id}`,
    user: comment.post.user,
    message: comment.content,
  };

  const notification = await strapi.services.notification.create(notificationData);

  strapi.io.to(comment.post.user).emit('notification', notification);
});

/**
 * Send notification to users who follwing story whenevery new post published.
 *
 * @param post Post just updated
 * @param params afterUpdate params
 * @param data afterUpdate data
 */
notificationEvent.on(CHANNEL.PostUpdated, async (post, _params, data) => {
  // Ignore standalone post or already published before.
  if (!post.story || !data.justPublished) {
    return;
  }

  const subscriptions =
    (await strapi.services.subscription.find({
      collectionId: post.story.id,
      collectionName: 'story',
    })) || [];

  subscriptions.forEach(async (sub) => {
    const notificationData = {
      title: `<strong>${post.user.username}</strong> đã đăng một bài viết mới trong loạt bài ${post.story.name}.`,
      isVisible: true,
      channel: CHANNEL.PostUpdated,
      url: `/posts/${post.slug}`,
      user: sub.user.id,
    };

    const notification = await strapi.services.notification.create(notificationData);

    strapi.io.to(sub.user.id).emit('notification', notification);
  });
});

module.exports = {
  CHANNEL,
  notificationEvent,
};
