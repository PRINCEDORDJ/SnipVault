import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnip } from "../context/SnipContext";

export const Languages = [
  "HTML",
  "CSS",
  "Javascript",
  "React",
  "Python",
  "C#",
  "C",
  "C++",
  "Rust",
  "Java",
  'Other'
];

const SnipEditor = () => {
  const [title, setTitle] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [language, setLanguage] = useState<string>("");
  const [note, setNote] = useState<string>('')
  const { addSnip }: any = useSnip();
  const [error, setError] = useState<string | null>(null)

  const navigate = useNavigate();

  const Submit = () => {
    if (!title && !code && !language) {
      setError('Input fields cannot be empty');
      setTimeout(() => {
        setError(null);
      }, 2000);
      return;
    }
    

    addSnip(title, language, code, note);
    setTitle('');
    setCode('');
    setLanguage('');
    setNote('')
  }
  return (
    <div>
      <div className="w-full lg:flex lg:items-center lg:justify-center dark:text-black max-lg:px-5 max-lg:pt-10 pb-2 max-md:pt-2">
        <div className="dark:bg-white bg-slate-300 rounded-md py-5 lg:w-xl flex flex-col items-center justify-center">
          <h1 className=" text-2xl font-bold">Add New Snippet</h1>
          <div className="w-full px-2 py-5 flex flex-col gap-3">
            <div>
              <h1>Snippet Title</h1>
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                id="title"
                required
                className="w-full border p-3 rounded-lg"
              />
            </div>

            <div>
              {" "}
              <h1>Select language</h1>
              <select
                id="language"
                required
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full rounded-md p-3 border bg-blue-300"
              >
                <option value={"language"}>Language</option>
                {Languages.map((l) => (
                  <option
                    value={l}
                    className="flex flex-col bg-blue-500 rounded-md w-full p-3"
                  >
                    {l}
                  </option>
                ))}{" "}
              </select>
            </div>
            <div>
              <h1>Paste snippet here</h1>
              <textarea
                placeholder="Paste code here"
                id="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
                rows={5}
                className="border h-50 max-lg:h-40 p-3 w-full rounded-md mt-4"
              />
            </div>
            <div className="">
              <h1>Addition Note</h1>
              <input
                placeholder="Note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full p-3 rounded-md border"
              />
            </div>
            <div>
              {error && <p className="text-red-500">{error}</p>}
            </div>
            <div className="flex items-center justify-center gap-2 text-white">
              <div className="border-3 p-0.5 border-slate-400 rounded-lg">
                <button
                  onClick={() => navigate("/")}
                  className="py-2 px-7 rounded-md bg-slate-400"
                >
                  Cancel
                </button>
              </div>
              <div className="border-3 p-0.5 border-slate-700 rounded-lg">
                <button onClick={Submit} className="py-2 px-9 rounded-md bg-slate-700">
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SnipEditor;
