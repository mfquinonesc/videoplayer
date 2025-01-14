using backend.Data;

namespace backend.Services
{
    public class ContentTypeService : Service
    {
        public ContentTypeService(DBVideoplayerContext context) : base(context)
        {
        }
        
        public dynamic GetAll()
        {
            return new { status = true, types = this._context.ContentTypes.ToList() };
        }
    }
}
