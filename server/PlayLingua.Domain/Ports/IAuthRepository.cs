using PlayLingua.Domain.Entities;
using PlayLingua.Domain.models;

namespace PlayLingua.Domain.Ports
{
    public interface IAuthRepository
    {
        LoginResult Login(User user);
        string GenerateToken(User userId);
    }
}
