module.exports = {
  definition: `
    enum CacheControlScope {
      PUBLIC
      PRIVATE
    }
    
    directive @cacheControl (
      maxAge: Int
      scope: CacheControlScope
    ) on FIELD_DEFINITION | OBJECT | INTERFACE
  
    extend type UsersPermissionsMe @cacheControl(maxAge: 0) {
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
    Mutation: {
      logout: {
        policies: ['plugins::users-permissions.isAuthenticated'],
        resolverOf: 'plugins::users-permissions.Auth.logout',
        async resolver(_obj, _options, { context }) {
          await strapi.plugins['users-permissions'].controllers.auth.logout(
            context,
          );
          return 'Logged out.';
        },
      },
    },
  },
};
