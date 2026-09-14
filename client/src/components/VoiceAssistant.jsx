import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaMicrophone, FaMicrophoneSlash, FaVolumeUp, FaLanguage, FaTimes, FaRobot } from "react-icons/fa";

const INDIAN_LANGUAGES = [
  { code: "te-IN", name: "తెలుగు (Telugu)" },
  { code: "hi-IN", name: "हिन्दी (Hindi)" },
  { code: "en-IN", name: "English (India)" },
  { code: "ta-IN", name: "தமிழ் (Tamil)" },
  { code: "kn-IN", name: "ಕನ್ನಡ (Kannada)" },
  { code: "ml-IN", name: "മലയാളം (Malayalam)" },
  { code: "mr-IN", name: "मराठी (Marathi)" },
  { code: "gu-IN", name: "ગુજરાતી (Gujarati)" },
  { code: "pa-IN", name: "ਪੰਜਾਬੀ (Punjabi)" },
  { code: "bn-IN", name: "বাংলা (Bengali)" },
  { code: "or-IN", name: "ଓଡ଼ିଆ (Odia)" },
  { code: "bho-IN", name: "भोजपुरी (Bhojpuri)" },
  { code: "as-IN", name: "অসমীয়া (Assamese)" },
  { code: "ur-IN", name: "اردو (Urdu)" },
  { code: "ks-IN", name: "कश्मीरी (Kashmiri)" },
  { code: "ne-NP", name: "नेपाली (Nepali)" },
  { code: "sd-IN", name: "सिंधी (Sindhi)" },
  { code: "sa-IN", name: "संस्कृतम् (Sanskrit)" },
  { code: "mai-IN", name: "मैथिली (Maithili)" },
  { code: "sat-IN", name: "సంతాలి (Santali)" },
  { code: "mni-IN", name: "ꯃꯅꯤꯄꯨꯔꯤ (Manipuri)" },
  { code: "kok-IN", name: "कोंकणी (Konkani)" },
  { code: "doi-IN", name: "डोगरी (Dogri)" }
];

const GREETINGS = {
  "te-IN": "నమస్కారం! కిసాన్ బజార్ వాయిస్ అసిస్టెంట్ కు స్వాగతం. నేను మీకు ఎలా సహాయపడగలను?",
  "hi-IN": "नमस्ते! किसान बाजार वॉयस असिस्टेंट में आपका स्वागत है। मैं आपकी क्या मदद कर सकता हूँ?",
  "en-IN": "Hello! Welcome to KisanBazar Voice Assistant. How can I help you today?",
  "ta-IN": "வணக்கம்! கிசான் பஜார் குரல் உதவிக்கு வரவேற்கிறோம்.",
  "kn-IN": "నమస్కార! కిసాన్ బజార్ వాయిస్ అసిస్టెంట్ గె స్వాగత.",
  "ml-IN": "നമസ്കാരം! കിസാൻ ബസാർ വോയ്‌സ് അസിസ്റ്റന്റിലേക്ക് സ്വാഗതം.",
  "mr-IN": "नमस्कार! किसान बाजार व्हॉइस असिस्टंटमध्ये आपले स्वागत आहे.",
  "gu-IN": "નમસ્તે! કિસાન બજાર વોઇસ આસિસ્ટન્ટમાં આપનું સ્વાગત છે.",
  "pa-IN": "ਸਤਿ ਸ਼੍ਰੀ ਅਕਾਲ! ਕਿਸਾਨ ਬਾਜ਼ਾਰ ਵੌਇਸ ਸਹਾਇਕ ਵਿੱਚ ਤੁਹਾਡਾ ਸੁਆਗਤ ਹੈ।",
  "bn-IN": "নমস্কার! কিষাণ বাজারে আপনাকে স্বাগত জানাচ্ছি।",
  "or-IN": "ନମସ୍କାର! କିଷାନ ବଜାର ଭଏସ ଆସିଷ୍ଟାଣ୍ଟକୁ ସ୍ୱାଗତ।"
};

const VoiceAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [selectedLang, setSelectedLang] = useState("te-IN");
  const [transcript, setTranscript] = useState("");
  const [responseMsg, setResponseMsg] = useState("");
  const [recognition, setRecognition] = useState(null);
  
  const navigate = useNavigate();

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const reco = new SpeechRecognition();
      reco.continuous = false;
      reco.interimResults = false;
      reco.lang = selectedLang;

      reco.onresult = (event) => {
        const text = event.results[0][0].transcript;
        setTranscript(text);
        handleVoiceCommand(text.toLowerCase());
      };

      reco.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
        setResponseMsg("వినిపించలేదు. దయచేసి మళ్ళీ చెప్పండి. (Did not hear. Please try speaking again.)");
      };

      reco.onend = () => {
        setIsListening(false);
      };

      setRecognition(reco);
    }
  }, [selectedLang]);

  const speakText = (text, langCode = selectedLang) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel(); // Stop current speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = langCode;
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  };

  const startListening = () => {
    if (recognition) {
      try {
        setTranscript("");
        setResponseMsg("వినడానికి సిద్ధంగా ఉన్నాను... మాట్లాడండి (Listening... speak now)");
        recognition.lang = selectedLang;
        recognition.start();
        setIsListening(true);
      } catch (err) {
        console.error(err);
      }
    } else {
      alert("మీ బ్రౌజర్ లో వాయిస్ గుర్తింపు సపోర్ట్ చేయలేదు. Chrome లేదా Edge బ్రౌజర్ ఉపయోగించండి.");
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };

  const handleVoiceCommand = (text) => {
    let reply = "";

    if (text.includes("farmer") || text.includes("ఫార్మర్") || text.includes("किसान") || text.includes("రైతు")) {
      reply = "ఫార్మర్ లాగిన్ లేదా డ్యాష్‌బోర్డ్‌కు వెళ్తున్నాను. (Navigating to Farmer Section)";
      navigate("/login");
    } else if (text.includes("product") || text.includes("పంట") || text.includes("షాప్") || text.includes("పండ్లు") || text.includes("కూరగాయలు") || text.includes("सब्जी")) {
      reply = "పంటల పేజీ తెరుస్తున్నాను. (Opening Products page)";
      navigate("/products");
    } else if (text.includes("home") || text.includes("హోమ్") || text.includes("హోం")) {
      reply = "హోమ్ పేజీకి వెళ్తున్నాను. (Going to Home page)";
      navigate("/");
    } else if (text.includes("login") || text.includes("లాగిన్") || text.includes("సైన్ ఇన్")) {
      reply = "లాగిన్ పేజీకి వెళ్తున్నాను. (Opening Login page)";
      navigate("/login");
    } else if (text.includes("register") || text.includes("రిజిస్టర్") || text.includes("ఖాతా")) {
      reply = "రిజిస్ట్రేషన్ పేజీకి వెళ్తున్నాను. (Opening Registration page)";
      navigate("/register");
    } else if (text.includes("about") || text.includes("గురించి")) {
      reply = "మా గురించి పేజీకి వెళ్తున్నాను. (Going to About page)";
      navigate("/about");
    } else {
      reply = `మీరు అన్నారు: "${text}". కిసాన్ బజార్ లో ఉత్పత్తులు, ఫార్మర్ లాగిన్ లేదా హోమ్ పేజీకి వెళ్ళడానికి మాట్లాడండి.`;
    }

    setResponseMsg(reply);
    speakText(reply, selectedLang);
  };

  const handleGreeting = () => {
    const greetingText = GREETINGS[selectedLang] || GREETINGS["te-IN"];
    setResponseMsg(greetingText);
    speakText(greetingText, selectedLang);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Trigger Floating Button */}
      {!isOpen && (
        <button
          onClick={() => {
            setIsOpen(true);
            handleGreeting();
          }}
          className="bg-gradient-to-r from-green-600 to-emerald-700 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 flex items-center gap-2 group border-2 border-white"
          title="Multilingual Voice Assistant for Farmers & Consumers"
        >
          <FaMicrophone className="text-2xl animate-pulse" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 whitespace-nowrap text-sm font-semibold pr-2">
            వాయిస్ అసిస్టెంట్ (Voice Help)
          </span>
        </button>
      )}

      {/* Voice Assistant Modal Widget */}
      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl border border-green-200 w-80 sm:w-96 overflow-hidden flex flex-col transition-all duration-300 animate-fade-in">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-800 text-white p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <FaRobot className="text-xl text-yellow-300" />
              <div>
                <h3 className="font-bold text-sm">KisanBazar Voice Assistant</h3>
                <p className="text-xs text-green-100">28+ Languages Voice Help</p>
              </div>
            </div>
            <button
              onClick={() => {
                stopListening();
                if ("speechSynthesis" in window) window.speechSynthesis.cancel();
                setIsOpen(false);
              }}
              className="text-white hover:text-red-200 p-1 rounded-full text-lg"
            >
              <FaTimes />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 space-y-4 text-gray-800">
            {/* Language Selector */}
            <div>
              <label className="flex items-center gap-2 text-xs font-semibold text-gray-600 mb-1">
                <FaLanguage className="text-green-600 text-base" /> భాషను ఎంచుకోండి (Select Language):
              </label>
              <select
                value={selectedLang}
                onChange={(e) => {
                  setSelectedLang(e.target.value);
                  speakText(GREETINGS[e.target.value] || "Language selected", e.target.value);
                }}
                className="w-full text-xs bg-green-50 border border-green-300 rounded-lg p-2 font-medium focus:ring-2 focus:ring-green-500 focus:outline-none"
              >
                {INDIAN_LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Response Display Box */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs min-h-[70px] flex items-center justify-between">
              <p className="text-gray-700 italic">{responseMsg || "లభించిన సూచనలు ఇక్కడ కనిపిస్తాయి..."}</p>
              {responseMsg && (
                <button
                  onClick={() => speakText(responseMsg)}
                  className="text-green-600 hover:text-green-800 p-1 ml-2 flex-shrink-0"
                  title="Listen again"
                >
                  <FaVolumeUp className="text-lg" />
                </button>
              )}
            </div>

            {/* User Transcript */}
            {transcript && (
              <div className="bg-green-100 border border-green-300 rounded-lg p-2 text-xs text-green-900 font-medium">
                🗣️ మీరు అన్నారు: "{transcript}"
              </div>
            )}

            {/* Mic Action Control */}
            <div className="flex flex-col items-center justify-center pt-2">
              <button
                onClick={isListening ? stopListening : startListening}
                className={`w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl shadow-lg transition-all duration-300 ${
                  isListening
                    ? "bg-red-600 animate-ping"
                    : "bg-green-600 hover:bg-green-700 hover:scale-105"
                }`}
              >
                {isListening ? <FaMicrophoneSlash /> : <FaMicrophone />}
              </button>
              <span className="text-xs text-gray-500 mt-2 font-medium">
                {isListening ? "వినడం జరుగుతోంది... నొక్కండి ఆపడానికి" : "మాట్లాడటానికి మైక్ నొక్కండి (Tap Mic to Speak)"}
              </span>
            </div>

            {/* Quick Command Hints */}
            <div className="border-t pt-2 text-[10px] text-gray-500 space-y-1">
              <p className="font-semibold text-gray-700">సూచనలు (Quick Voice Commands):</p>
              <div className="flex flex-wrap gap-1">
                <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-600">"ఫార్మర్ లాగిన్"</span>
                <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-600">"పంటలు చూడు"</span>
                <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-600">"హోమ్ పేజీ"</span>
                <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-600">"Farmer Login"</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VoiceAssistant;
