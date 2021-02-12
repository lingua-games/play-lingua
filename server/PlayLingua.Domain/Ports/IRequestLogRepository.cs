using PlayLingua.Domain.models;

namespace PlayLingua.Domain.Ports
{
    public interface IRequeustLogRepository
    {
        RequestLogModel Add(RequestLogModel requestLog);
        void Update(RequestLogModel requestLog);
    }
}
