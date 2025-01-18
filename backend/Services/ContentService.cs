using backend.Data;
using backend.Dtos;
using MediaToolkit.Model;
using MediaToolkit;
using backend.Models;
using Microsoft.AspNetCore.StaticFiles;
using System.Reflection;
using System.Net.Mime;
using Microsoft.VisualBasic;

namespace backend.Services
{
    public class ContentService : Service
    {
        private readonly string _serverPath;

        private readonly FileExtensionContentTypeProvider _contentTypeProvider;
        public ContentService(DBVideoplayerContext context, IConfiguration config) : base(context)
        {
            this._serverPath = config["Configuration:ServerPath"];
            this._contentTypeProvider = new FileExtensionContentTypeProvider();
        }

        public dynamic Create(ContentDto dto)
        {
            Content content = ContentDto.Convert(dto);

            this.CreateFiles(dto, ref content);
            content.CreatedAt = null;
            _context.Add(content);
            _context.SaveChanges();

            content.SortIndex = content.ContentId;
            _context.Update(content);
            _context.SaveChanges();

            content.ImageUrl = this.GetName(content.ImageUrl);
            content.VideoUrl = this.GetName(content.VideoUrl);

            return new { status = true, content };
        }
        public dynamic GetAll()
        {
            var contents = this._context.Contents.OrderBy(c => c.SortIndex).ToList();

            if (contents.Count > 0)
            {
                foreach (Content c in contents)
                {
                    c.ImageUrl = this.GetName(c.ImageUrl);
                    c.VideoUrl = this.GetName(c.VideoUrl);
                }
            }

            return new { status = true, contents };
        }

        public dynamic GetById(int id)
        {
            var content = this._context.Contents.Where(c => c.ContentId == id).FirstOrDefault();

            if (content != null)
            {
                content.ImageUrl = this.GetName(content.ImageUrl);
                content.VideoUrl = this.GetName(content.VideoUrl);
            }

            return new { status = content != null, content };
        }


        public dynamic UpdateById(int id, ContentDto dto)
        {
            var content = this._context.Contents.Where(c => c.ContentId == id).FirstOrDefault();

            if (content != null)
            {
                content.Title = dto.Title;
                content.Description = dto.Description;

                this.CreateFiles(dto, ref content);

                this._context.Update(content);
                this._context.SaveChanges();
                content.ImageUrl = this.GetName(content.ImageUrl);
                content.VideoUrl = this.GetName(content.VideoUrl);
            }

            return new { status = content != null, content };
        }


        public dynamic DeleteById(int id)
        {
            var content = this._context.Contents.Where(c => c.ContentId == id).FirstOrDefault();

            if (content != null)
            {
                List<Schedule> schedules = this._context.Schedules.Where(s => s.ContentId == content.ContentId).ToList();

                for (int i = 0; i < schedules.Count; i++)
                {
                    _context.Remove(schedules[i]);
                    _context.SaveChanges();
                }

                this._context.Remove(content);
                this._context.SaveChanges();
            }

            return new { status = content != null };
        }

        public dynamic GetFile(string fileName)
        {
            string path = Path.Combine(this._serverPath, fileName);

            if (File.Exists(path))
            {
                if (_contentTypeProvider.TryGetContentType(fileName, out string mimeType))
                {
                    var bytes = File.ReadAllBytes(path);

                    return new { bytes, mimeType };

                }
            }

            return null;
        }

        private string SaveFile(IFormFile file)
        {
            string ext = Path.GetExtension(file.FileName);
            string guid = Guid.NewGuid().ToString();
            string path = Path.Combine(this._serverPath, guid + ext);
            using (var stream = new FileStream(path, FileMode.Create))
            {
                file.CopyTo(stream);
            }

            return path;
        }

        private string GetName(string url)
        {
            return !String.IsNullOrEmpty(url) ? Path.GetFileName(new Uri(url).LocalPath) : "";
        }

        private int GetVideoDuration(string filePath)
        {
            var inputFile = new MediaFile { Filename = filePath };
            using (var engine = new Engine())
            {
                engine.GetMetadata(inputFile);
            }

            double duration = inputFile.Metadata.Duration.TotalSeconds;

            return Convert.ToInt32(duration);
        }

        private void CreateFiles(ContentDto dto, ref Content content)
        {

            if (dto.VideoFile != null && (dto.ContentTypeId == 1 || dto.ContentTypeId == 2))
            {
                content.VideoUrl = this.SaveFile(dto.VideoFile);
                content.Duration = GetVideoDuration(content.VideoUrl);
            }

            if (dto.ImageFile != null && (dto.ContentTypeId == 3 || dto.ContentTypeId == 2))
            {
                content.ImageUrl = this.SaveFile(dto.ImageFile);
                content.Duration = (dto.Duration != null && dto.ContentTypeId == 3) ? dto.Duration : 0;
            }

            if (dto.ContentTypeId == 3)
            {
                content.VideoUrl = "";
            }

            if (dto.ContentTypeId == 1)
            {
                content.ImageUrl = "";
            }
        }

        public dynamic GetPlaylist(int id)
        {
            List<Schedule> list = this._context.Schedules.Where(s => s.PlaylistId == id).OrderBy(s => s.StartDate).ToList();

            var playlist = this._context.Playlists.Where(p => p.PlaylistId == id).FirstOrDefault();

            List<dynamic> resp = new List<dynamic>();

            for (int i = 0; i < list.Count; i++)
            {
                var content = this._context.Contents.Where(s => s.ContentId == list[i].ContentId).FirstOrDefault();

                dynamic data = new { };

                if (content != null && playlist != null)
                {
                    data = new
                    {
                        content.ContentId,
                        content.Title,
                        content.ContentTypeId,
                        content.Description,
                        content.SortIndex,
                        playlist.PlaylistId,
                        list[i].ScheduleId,
                        list[i].Duration,
                        list[i].IsActive,
                        list[i].StartDate,
                        FinalDate = list[i].StartDate.AddMinutes(Convert.ToDouble(list[i].Duration)),
                        ImageUrl = content.ImageUrl != null ? this.GetName(content.ImageUrl) : "",
                        VideoUrl = content.VideoUrl != null ? this.GetName(content.VideoUrl) : "",
                    };
                }

                resp.Add(data);
            }

            return new { playlist, contents = resp };
        }

        public dynamic SortContents(string arr)
        {
            if (!String.IsNullOrEmpty(arr))
            {                
                List<string> indexes = arr.Split('-').ToList();
                List<Content> list = _context.Contents.OrderBy(c => c.SortIndex).ToList();
                List<int> sortIds = new List<int>();

                for (int i = 0; i < indexes.Count; i++)
                {
                    int index;

                    if (int.TryParse(indexes[i], out index))
                    {
                        sortIds.Add(index);
                    }
                }

                if (indexes.Count == sortIds.Count)
                {
                    for (int i = 0; i < list.Count; i++)
                    {
                        list[i].SortIndex = sortIds[i];
                        this._context.Update(list[i]);
                        this._context.SaveChanges();
                    }
                }
            }

            return this.GetAll();
        }
    }
}
