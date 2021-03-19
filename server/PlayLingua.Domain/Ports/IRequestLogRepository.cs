
using PlayLingua.Domain.Models;

namespace PlayLingua.Domain.Ports
{
    public interface IRequeustLogRepository
    {
        RequestLogModel Add(RequestLogModel requestLog);
        void Update(RequestLogModel requestLog);
    }
}
