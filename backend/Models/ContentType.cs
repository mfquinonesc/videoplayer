﻿using System;
using System.Collections.Generic;

namespace backend.Models
{
    public partial class ContentType
    {
        public int ContentTypeId { get; set; }
        public string Name { get; set; } = null!;
        public string? Description { get; set; }
    }
}
