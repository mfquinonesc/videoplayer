using System;
using System.Collections.Generic;

namespace backend.Models
{
    public partial class Account
    {
        public int UserId { get; set; }
        public string Name { get; set; } = null!;
        public string Lastname { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
        public bool IsAdmin { get; set; }
        public DateTime? CreatedAt { get; set; }
    }
}
