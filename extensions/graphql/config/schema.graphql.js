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
  `
}
