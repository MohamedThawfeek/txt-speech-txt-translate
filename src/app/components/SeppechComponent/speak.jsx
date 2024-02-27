"use client";
import { useEffect, useState } from "react";
import Select from "react-select";
import Language from "../language";
import { customeTranslate } from "../translate/translate";
import { HiSpeakerWave } from "react-icons/hi2";
import { MdContentCopy } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";

const speech = new SpeechSynthesisUtterance();

const speak = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [text, settext] = useState("");
  const [languages, setLanguages] = useState(Language);
  const [selectedLanguage, setSelectedLanguage] = useState({
    label: "English",
    value: "en",
  });
  const [translateLanguage, setTranslateLanguage] = useState({
    label: "English",
    value: "en",
  });
  const [allLanguages, setAllLanguages] = useState("");
  const [translatedDate, setTranslatedDate] = useState("");
  const [inputLang, setInputLang] = useState(false);
  const [transLang, setTransLang] = useState(false);

  const mergedArray = [...languages.suggest, ...languages.allLanguage];

  useEffect(() => {
    const fetchData = async () => {
      const updatedLanguages = mergedArray.map((i) => ({
        value: i.language,
        label: i.subtitle,
      }));
      setAllLanguages(updatedLanguages);
    };

    fetchData();
  }, []);

  const InputSpeak = () => {
    speech.text = text;
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;
    speech.lang = selectedLanguage.value;
    window.speechSynthesis.speak(speech);
  };

  const TranslateSpeak = () => {
    speech.text = translatedDate;
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;
    speech.lang = translateLanguage.value;
    window.speechSynthesis.speak(speech);
  };

  const Translate = async () => {
    const data = await customeTranslate(
      translateLanguage.value,
      translatedDate,
      selectedLanguage.value
    );
    if (data.success) {
      return setTranslatedDate(data.data);
    }
  };

  const InputTextCopy = () => {
    setInputLang(true);
    navigator.clipboard.writeText(text);
    setTimeout(() => {
      setInputLang(false);
    }, 3000);
  };

  const TranslateTextCopy = () => {
    setTransLang(true);
    navigator.clipboard.writeText(translatedDate);
    setTimeout(() => {
      setTransLang(false);
    }, 3000);
  };

  return (
    <div className="w-full conatainer min-h-screen flex items-center justify-center flex-col p-3">
      <div className=" w-[90%]  md:w-[80%] lg:w-[35%] shadow-lg bg-gray-100 shadow-black rounded-lg p-3 flex items-center justify-center flex-col gap-3">
        <h1 className=" text-2xl font-semibold">
          Text to Speech & Translate Text
        </h1>
        {/* input Text */}
        <div className=" flex items-center justify-center flex-col space-y-2 w-[100%] lg:w-[90%]">
          <h1 className=" text-sm flex items-center justify-start w-full font-semibold">
            Input Language
          </h1>
          <Select
            options={allLanguages}
            onChange={setSelectedLanguage}
            value={selectedLanguage}
            className="w-[100%]"
          />
          <div className=" relative w-[100%]">
            <textarea
              value={text}
              onChange={(e) => {
                settext(e.target.value);
                setTranslatedDate(e.target.value);
              }}
              style={{ resize: "none" }}
              placeholder="Please enter text"
              className=" outline-none w-[100%] h-[200px] p-3 rounded-md  border-[1px] border-solid border-gray-300 "
            />
            {inputLang ? (
              <FaCheck
                size={20}
                className=" absolute top-2 right-2 cursor-pointer"
              />
            ) : (
              <MdContentCopy
                size={20}
                onClick={InputTextCopy}
                className=" absolute top-2 right-2 cursor-pointer"
              />
            )}
          </div>
          <div className="flex items-center justify-end w-full gap-3">
            <button
            disabled={text.length === 0 ? true : false}
              onClick={InputSpeak}
              className={`w-[100px] p-2 flex items-center justify-around  border-[1px] border-solid border-gray-300 hover:bg-slate-100 transition-all duration-300  rounded-md text-base font-semibold ${text.length === 0 ? " cursor-not-allowed" : " cursor-pointer"}`}
            >
              Speak <HiSpeakerWave size={16} />
            </button>
          </div>
        </div>

        {/* translate text */}
        <div className=" flex items-center justify-center flex-col space-y-2 w-[100%] lg:w-[90%]">
          <h1 className=" text-sm flex items-center justify-start  w-full font-semibold">
            Translate Language
          </h1>
          <Select
            options={allLanguages}
            onChange={setTranslateLanguage}
            value={translateLanguage}
            className="w-[100%] "
          />
          <div className=" relative w-[100%]">
            <textarea
              disabled
              value={translatedDate}
              style={{ resize: "none" }}
              className=" outline-none w-[100%] h-[200px] p-3 rounded-md  border-[1px] border-solid border-gray-300 "
            />
            {transLang ? (
              <FaCheck
                size={20}
                className=" absolute top-2 right-2 cursor-pointer"
              />
            ) : (
              <MdContentCopy
                size={20}
                onClick={TranslateTextCopy}
                className=" absolute top-2 right-2 cursor-pointer"
              />
            )}
          </div>

          <div className=" flex items-center justify-end flex-wrap w-full gap-3">
            <button
               disabled={translatedDate.length === 0 ? true : false}
              onClick={Translate}
              className={`w-[100px] p-2  border-[1px] border-solid border-gray-300 hover:bg-slate-100 transition-all duration-300  rounded-md text-base font-semibold ${translatedDate.length === 0 ? " cursor-not-allowed" : " cursor-pointer"}`}
            >
              Translate
            </button>

            <button
            disabled={translatedDate.length === 0 ? true : false}
              onClick={TranslateSpeak}
              className={` w-[100px] p-2 flex items-center justify-around  border-[1px] border-solid border-gray-300 hover:bg-slate-100 transition-all duration-300  rounded-md text-base font-semibold ${translatedDate.length === 0 ? " cursor-not-allowed" : " cursor-pointer"}`}
            >
              Speak <HiSpeakerWave size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default speak;
