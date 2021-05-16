//using Microsoft.AspNetCore.Mvc;
//using PlayLingua.Domain.Ports;
//using System.Threading.Tasks;

//namespace PlayLingua.Host.Controllers
//{
//    [ApiController]
//    [Route("[controller]")]
//    public class SpeechController : Controller
//    {
//        private readonly ISpeechRepository _speechRepository;

//        public SpeechController(ISpeechRepository speechRepository)
//        {
//            _speechRepository = speechRepository;
//        }

//        [HttpGet("get-word-speech")]
//        public ActionResult<byte[]> GetWordSpeech()
//        {
//            return Ok();
//        }
//    }
//}
