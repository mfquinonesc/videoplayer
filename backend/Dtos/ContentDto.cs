using backend.Models;

namespace backend.Dtos
{
    public class ContentDto
    {
        public int ContentId { get; set; }
        public string Title { get; set; } = null!;
        public string? VideoUrl { get; set; }
        public string? ImageUrl { get; set; }
        public string? Description { get; set; }
        public int? Duration { get; set; }
        public int ContentTypeId { get; set; }
        public DateTime CreatedAt { get; set; }
        public IFormFile? ImageFile { get; set; }
        public IFormFile? VideoFile { get; set; }

        public static Content Convert (ContentDto dto)
        {
            Content cont = new Content()
            {
                ContentId = dto.ContentId,
                Title = dto.Title,
                VideoUrl = dto.VideoUrl,
                ImageUrl = dto.ImageUrl,
                Description = dto.Description,
                Duration = dto.Duration,
                ContentTypeId = dto.ContentTypeId,
                CreatedAt = dto.CreatedAt
            };
            return cont;
        }

        
    }
}
