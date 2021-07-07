const { APOLLO_SERVER_CACHE_MAXAGE } = require('../../../utils/env');

module.exports = {
  definition: `
    extend type UsersPermissionsMe {
      avatar: UploadFile
    }

    extend type UsersPermissionsMeRole {
      permissions(
        sort: String
        limit: Int
        start: Int
        where: JSON
      ): [UsersPermissionsPermission]
    }    
  `,
  mutation: `
    logout: String
  `,
  resolver: {
    Query: {
      // Adds cache scope to PRIVATE on me query.
      // NOTE: Modifying cacheControl at resolver level is NOT desired. Strapi Graphql has no way to add cacheControl directive in schema.
      me: {
        resolverOf: 'plugins::users-permissions.user.me',
        async resolver(_obj, _options, { context }, info) {
          info.cacheControl.setCacheHint({ maxAge: APOLLO_SERVER_CACHE_MAXAGE, scope: 'PRIVATE' });
          await strapi.plugins['users-permissions'].controllers.user.me(context);
          return context.body;
        },
      },
    },
    Mutation: {
      logout: {
        policies: ['plugins::users-permissions.isAuthenticated'],
        resolverOf: 'plugins::users-permissions.Auth.logout',
        async resolver(_obj, _options, { context }) {
          await strapi.plugins['users-permissions'].controllers.auth.logout(context);
          return 'Logged out.';
        },
      },
    },
  },
};
