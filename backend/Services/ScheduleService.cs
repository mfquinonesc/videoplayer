using backend.Data;
using backend.Models;

namespace backend.Services
{
    public class ScheduleService : Service
    {
        public ScheduleService(DBVideoplayerContext context) : base(context)
        {
        }

        public dynamic Create(Schedule schedule)
        {
            bool status = this.ValidateDates(schedule);

            if (status)
            {
                schedule.IsActive = true;
                _context.Add(schedule);
                _context.SaveChanges();
            }

            return new { status, schedule };
        }

        public dynamic GetAll()
        {
            var schedules = _context.Schedules.ToList();

            return new { status = true, schedules };
        }

        public dynamic GetById(int id)
        {
            var schedule = _context.Schedules.FirstOrDefault(s => s.ScheduleId == id);

            return new { status = schedule != null, schedule };
        }

        public dynamic UpdateById(int id, Schedule dto)
        {
            var schedule = _context.Schedules.FirstOrDefault(s => s.ScheduleId == id);

            bool status = this.ValidateDates(dto);

            if (schedule != null && status)
            {
                schedule.StartDate = dto.StartDate;
                schedule.IsActive = dto.IsActive;
                _context.Update(schedule);
                _context.SaveChanges();
            }

            return new { status = (schedule != null && status), schedule };
        }

        public dynamic DeleteById(int id)
        {
            var schedule = _context.Schedules.FirstOrDefault(s => s.ScheduleId == id);

            if (schedule != null)
            {
                _context.Remove(schedule);
                _context.SaveChanges();
            }

            return new { status = schedule != null };
        }

        private bool ValidateDates(Schedule dto)
        {
            double duration = dto.Duration ?? 0;

            bool status = (duration > 0); // true is valid;                  

            var playlist = _context.Playlists.Where(p => p.PlaylistId == dto.PlaylistId).FirstOrDefault();
            var content = _context.Contents.Where(c => c.ContentId == dto.ContentId).FirstOrDefault();

            if (content != null && playlist != null && status)
            {
                List<Schedule> schedules = _context.Schedules.Where(s=> s.PlaylistId == dto.PlaylistId).ToList();

                bool found = false;

                DateTime finalDateDto = dto.StartDate.AddMinutes(Convert.ToDouble(duration));

                for (int i = 0; i < schedules.Count && !found; i++)
                {
                    DateTime finalDate = schedules[i].StartDate.AddMinutes(Convert.ToDouble(schedules[i].Duration ?? 0));

                    found = (finalDateDto >= schedules[i].StartDate && finalDateDto <= finalDate) || (dto.StartDate >= schedules[i].StartDate && dto.StartDate <= finalDate);
                }

                status = !found;
            }

            return status;
        }
    }

}
