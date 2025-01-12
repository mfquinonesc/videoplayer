using backend.Data;

namespace backend.Services
{
    public class Service
    {
        protected readonly DBVideoplayerContext _context; 
        public Service(DBVideoplayerContext context)
        {
            this._context = context;
        }
    }
}