using PlayLingua.Domain.Models;

namespace PlayLingua.Domain.Ports
{
    public interface ISpeechRepository
    {
        SpeechModel GetVoicFromText(SpeechModel model);
    }
}
