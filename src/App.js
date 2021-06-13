import { useState, useEffect, useContext } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/theme-monokai";
import { defaultHtml } from "./defaultHtml";
import { Toggle } from "./Toggle";
import { ThemeContext } from "./theme";

function App() {
  const [html, setHtml] = useState("");
  const [value, setValue] = useState("");
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    setValue(defaultHtml);
    setHtml(defaultHtml);
  }, []);

  const onClickRun = () => {
    setHtml(value);
  };

  /**
   * Download as .txt file
   */
  const onClickDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([value], {
      type: "text/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = "download.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="container py-2 h-full grid dark:bg-gray-800 grid-cols-1 md:grid-cols-2 gap-3">
      <div>
        <div className="flex justify-between items-center mb-3">
          <h1 className="text-xl text-indigo-500">HTML Editor</h1>
          <div>
            <Toggle />
            <button
              onClick={onClickDownload}
              className="ml-3 px-3 bg-gray-200 rounded"
            >
              Download as .txt
            </button>
            <button
              onClick={onClickRun}
              className="mx-3 px-3 bg-green-200 rounded"
            >
              Run ▶️
            </button>
          </div>
        </div>
        <AceEditor
          placeholder="your html goes here..."
          className="h-full"
          mode="html"
          theme={theme === "dark" ? "monokai" : "tomorrow"}
          height={"80vh"}
          width={"100%"}
          name="editor"
          onChange={setValue}
          fontSize={14}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          value={value}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: false,
            showLineNumbers: true,
            tabSize: 2,
          }}
        />
      </div>
      <div>
        <h1 className="text-xl mb-3 text-indigo-500">Output</h1>
        <div style={{ height: "30%" }}>
          <iframe
            src="about:blank"
            frameBorder="0"
            className="w-full h-full"
            srcDoc={html}
            title="output"
            id="iframe"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
