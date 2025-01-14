using System;
using System.Collections.Generic;

namespace backend.Models
{
    public partial class Schedule
    {
        public int ScheduleId { get; set; }
        public int ContentId { get; set; }
        public int PlaylistId { get; set; }
        public DateTime StartDate { get; set; }
        public bool IsActive { get; set; }
        public int? Duration { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
