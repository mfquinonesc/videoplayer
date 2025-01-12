using System;
using System.Collections.Generic;

namespace backend.Models
{
    public partial class ContentType
    {
        public ContentType()
        {
            Contents = new HashSet<Content>();
        }

        public int ContentTypeId { get; set; }
        public int Name { get; set; }
        public string? Description { get; set; }

        public virtual ICollection<Content> Contents { get; set; }
    }
}
