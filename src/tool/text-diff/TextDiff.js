import React, { useState } from 'react';
import DiffViewer from 'react-diff-viewer';
import { FaUpload, FaCheckCircle } from 'react-icons/fa'; // Import additional icon
import './TextDiffTool.css'; // Import the CSS file

const TextDiff = () => {
  const [originalText, setOriginalText] = useState('');
  const [modifiedText, setModifiedText] = useState('');
  const [isIdentical, setIsIdentical] = useState(false);

  const handleFileUpload = (e, setText) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setText(event.target.result);
        checkIdenticalTexts(originalText, modifiedText);
      };
      reader.readAsText(file);
    }
  };

  const checkIdenticalTexts = (original, modified) => {
    setIsIdentical(original === modified);
  };

  const showDiffViewer = originalText && modifiedText;

  return (
    <div className="text-diffrence-tool">
      <div className="heading-section">
        <h1 className="page-heading">Text Difference Tool</h1>
        <p className="page-subheading">Compare two pieces of text to find the differences between them.</p>
      </div>
      <div className="flex-container">
        <div className="flex-item">
          <div className="label-container">
            <label htmlFor="originalText" className="label">Original Text:</label>
            <label htmlFor="uploadOriginalFile" className="upload-button">
              <FaUpload className="upload-button-icon" />
              Upload File
              <input
                id="uploadOriginalFile"
                type="file"
                accept=".txt"
                onChange={(e) => handleFileUpload(e, setOriginalText)}
                style={{ display: 'none' }}
              />
            </label>
          </div>
          <textarea
            id="originalText"
            className="textarea"
            placeholder="Enter or paste the original text here..."
            value={originalText}
            onChange={(e) => {
              setOriginalText(e.target.value);
              checkIdenticalTexts(e.target.value, modifiedText);
            }}
          />
        </div>

        <div className="flex-item">
          <div className="label-container">
            <label htmlFor="modifiedText" className="label">Modified Text:</label>
            <label htmlFor="uploadModifiedFile" className="upload-button">
              <FaUpload className="upload-button-icon" />
              Upload File
              <input
                id="uploadModifiedFile"
                type="file"
                accept=".txt"
                onChange={(e) => handleFileUpload(e, setModifiedText)}
                style={{ display: 'none' }}
              />
            </label>
          </div>
          <textarea
            id="modifiedText"
            className="textarea"
            placeholder="Enter or paste the modified text here..."
            value={modifiedText}
            onChange={(e) => {
              setModifiedText(e.target.value);
              checkIdenticalTexts(originalText, e.target.value);
            }}
          />
        </div>
      </div>

      {showDiffViewer && (
        <div>
          <h3 className="difference-viewer-header">Difference Viewer</h3>
          {isIdentical ? (
            <p className="identical-message">
              <FaCheckCircle className="identical-message-icon" />
              Both texts are identical.
            </p>
          ) : (
            <DiffViewer 
              oldValue={originalText} 
              newValue={modifiedText} 
              splitView={true} 
              showDiffOnly={true} 
              styles={{
                diffContainer: 'diff-container',
                contentText: 'diff-content-text',
                line: 'diff-line',
              }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default TextDiff;
