using Google.Cloud.TextToSpeech.V1;
using PlayLingua.Domain.Models;
using PlayLingua.Domain.Ports;
using System;
using System.Collections.Generic;
using System.IO;

namespace PlayLingua.Data.Repositories
{
    public class SpeechRepository : ISpeechRepository
    {
        public SpeechModel GetVoicFromText(SpeechModel model)
        {
            model.Code = Guid.NewGuid();
            Environment.SetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS", "../speech-key.json");

            var result = new List<string>();
            var client = TextToSpeechClient.Create();

            // The input to be synthesized, can be provided as text or SSML.
            var input = new SynthesisInput
            {
                Text = model.Text
            };

            // Build the voice request.
            var voiceSelection = new VoiceSelectionParams
            {
                LanguageCode = model.LanguageCode,
                SsmlGender = model.Gender
            };

            // Specify the type of audio file.
            var audioConfig = new AudioConfig
            {
                AudioEncoding = AudioEncoding.Mp3
            };

            // Perform the text-to-speech request.
            var response = client.SynthesizeSpeech(input, voiceSelection, audioConfig);

            // Write the response to the output file.
            using FileStream output = File.Create("wwwroot/assets/speechs/" + model.Code + ".mp3");
            response.AudioContent.WriteTo(output);

            return model;
        }
    }
}
