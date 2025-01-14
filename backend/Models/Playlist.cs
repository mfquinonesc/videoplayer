using System;
using System.Collections.Generic;

namespace backend.Models
{
    public partial class Playlist
    {
        public int PlaylistId { get; set; }
        public string Name { get; set; } = null!;
        public string? Description { get; set; }
        public DateTime? CreatedAt { get; set; }
    }
}
