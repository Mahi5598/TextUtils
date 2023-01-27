import React, { useState, useRef } from "react";

export default function Textform(props) {
  const [text, setText] = useState("");
  const textRef = useRef(null);

  const handleUpperClick = (event) => {
    let upperText = text.toUpperCase();
    setText(upperText);
  };
  const handleLowerClick = (event) => {
    let upperText = text.toLowerCase();
    setText(upperText);
  };
  const handleUndo = () => {};
  const handleOnChange = (event) => {
    setText(event.target.value);
  };

  const copyToClipboard = () => {
    // Get the selected text
    //using settimeout here as react uses virtual dom and to make sure this call is after dom has been updated
    setTimeout(() => {
      var selectedText = window.getSelection().toString();
      // Create a new text area element
      var textArea = document.createElement("textarea");

      // Set the value of the text area to the selected text
      textArea.value = selectedText;

      // Add the text area to the document
      document.body.appendChild(textArea);

      // Select the text in the text area
      textArea.select();

      // Execute the copy command
      document.execCommand("copy");

      // Remove the text area from the document
      document.body.removeChild(textArea);

      // Display a message to confirm that the text has been copied
      // alert("Copied to clipboard: " + selectedText);
    }, 0);
  };

  const selectAll = (textArea) => {
    textArea.select();
  };
  // const handlePaste = (event) => {
  //   event.preventDefault();
  //   const text = event.clipboardData.getData("text/plain");
  //   textRef.current.value = text;
  // };
  // async function handleButtonClick(event) {
  //   const textdata = await navigator.clipboard.readText();
  //   textRef.current.value = text;
  // }

  const handlePaste = async (event) => {
    event.preventDefault();
    const text = await navigator.clipboard.readText();
    textRef.current.value = text;
  };

  const handleButtonClick = () => {
    textRef.current.focus();
    document.execCommand("paste");
  };

  //redo undo copy paste find replace
  return (
    <>
      <div className="container">
        <h3>{props.heading}</h3>
        <div className="mb-3">
          <label htmlFor="myBox" className="form-label">
            Example textarea
          </label>
          <textarea
            className="form-control"
            id="myBox"
            ref={textRef}
            value={text}
            onChange={handleOnChange}
            onPaste={handlePaste}
            rows="10"
          ></textarea>
          <button
            className="btn btn-primary my-3 mx-2"
            onClick={handleUpperClick}
          >
            Convert to Uppercase
          </button>
          <button
            className="btn btn-primary my-3 mx-2"
            onClick={handleLowerClick}
          >
            Convert to Lowercase
          </button>
          <button className="btn btn-primary my-3 mx-2" onClick={handleUndo}>
            UNDO
          </button>
          {/* The reason for this is that when you pass a function as a prop, React
          will re-render the component every time the function is called, which
          can lead to performance issues if the function is called frequently.
          To avoid this, we can use an arrow function inside the onClick prop,
          so that a new function is not created every time the component is
  rendered. */}
          <button
            className="btn btn-primary my-3 mx-2"
            onClick={() => selectAll(textRef.current)}
          >
            Select all
          </button>
          <button
            className="btn btn-primary my-3 mx-2"
            onClick={copyToClipboard}
          >
            Copy
          </button>
          <button
            className="btn btn-primary my-3 mx-2"
            onClick={handleButtonClick}
          >
            Paste
          </button>
        </div>
      </div>
      <div className="container my-2">
        <h2>Your text summary</h2>
        <p>
          {text.split(" ").length} Words and {text.length} Charachters
        </p>
        <p>{0.008 * text.split(" ").length} Mintues read</p>
        <h2>Preview</h2>
        <p>{text}</p>
        <p>test</p>
      </div>
    </>
  );
}
