using System;
using System.Collections.Generic;

namespace backend.Models
{
    public partial class Content
    {
        public int ContentId { get; set; }
        public string Title { get; set; } = null!;
        public string? VideoUrl { get; set; }
        public string? ImageUrl { get; set; }
        public string? Description { get; set; }
        public int? Duration { get; set; }
        public int ContentTypeId { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
