using backend.Data;
using backend.Models;
using System;
using System.Linq;
using System.Collections.Generic;

namespace backend.Services
{
    public class PlaylistService : Service
    {
        public PlaylistService(DBVideoplayerContext context) : base(context)
        {
        }

        public dynamic Create(Playlist playlist)
        {
            var pl = this._context.Playlists.Where(p => p.Name == playlist.Name).FirstOrDefault();

            if (pl == null)
            {
                _context.Add(playlist);
                _context.SaveChanges();
            }

            return new { status = (pl == null), playlist };
        }

        public dynamic GetAll()
        {
            var playlists = _context.Playlists.ToList();

            return new { status = true, playlists };
        }

        public dynamic GetById(int id)
        {
            var playlist = _context.Playlists.FirstOrDefault(p => p.PlaylistId == id);

            return new { status = playlist != null, playlist };
        }

        public dynamic UpdateById(int id, Playlist dto)
        {
            var playlist = _context.Playlists.FirstOrDefault(p => p.PlaylistId == id);

            if (playlist != null)
            {
                playlist.Name = dto.Name;
                playlist.Description = dto.Description;
                _context.Update(playlist);
                _context.SaveChanges();
            }

            return new { status = playlist != null, playlist };
        }

        public dynamic DeleteById(int id)
        {
            var playlist = _context.Playlists.FirstOrDefault(p => p.PlaylistId == id);

            if (playlist != null)
            {
                _context.Remove(playlist);
                _context.SaveChanges();
            }

            return new { status = playlist != null };
        }
    }
}
