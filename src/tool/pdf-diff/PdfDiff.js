// PdfDiffTool.js
import React, { useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import { diffWords } from 'diff';
import { FaUpload, FaCheckCircle } from 'react-icons/fa';
import './PdfDiffTool.css';

// Set the path to the PDF worker script
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://mozilla.github.io/pdf.js/build/pdf.worker.js';

const PdfDiffTool = () => {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [isIdentical, setIsIdentical] = useState(false);
  const [loading, setLoading] = useState(false);

  const extractTextFromPdf = async (file) => {
    const pdf = await pdfjsLib.getDocument(URL.createObjectURL(file)).promise;
    let text = '';
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      text += content.items.map(item => item.str).join(' ');
    }
    return text;
  };

  const handleFileUpload = async (e, setText) => {
    setLoading(true);
    const file = e.target.files[0];
    if (file) {
      const extractedText = await extractTextFromPdf(file);
      setText(extractedText);
      checkIdenticalTexts(text1, extractedText);
    }
    setLoading(false);
  };

  const checkIdenticalTexts = (text1, text2) => {
    setIsIdentical(text1 === text2);
  };

  const showDiffViewer = text1 && text2;

  return (
    <div className="pdf-diff-tool">
      <div className="heading-section">
        <h1 className="page-heading">PDF Difference Tool</h1>
        <p className="page-subheading">Compare two PDF files to find the differences between their contents.</p>
      </div>
      <div className="flex-container">
        <div className="flex-item">
          <div className="label-container">
            <label htmlFor="uploadPdf1" className="label">PDF 1:</label>
            <label htmlFor="uploadPdf1" className="upload-button">
              <FaUpload className="upload-button-icon" />
              Upload File
              <input
                id="uploadPdf1"
                type="file"
                accept=".pdf"
                onChange={(e) => handleFileUpload(e, setText1)}
                style={{ display: 'none' }}
              />
            </label>
          </div>
        </div>
        <div className="flex-item">
          <div className="label-container">
            <label htmlFor="uploadPdf2" className="label">PDF 2:</label>
            <label htmlFor="uploadPdf2" className="upload-button">
              <FaUpload className="upload-button-icon" />
              Upload File
              <input
                id="uploadPdf2"
                type="file"
                accept=".pdf"
                onChange={(e) => handleFileUpload(e, setText2)}
                style={{ display: 'none' }}
              />
            </label>
          </div>
        </div>
      </div>

      {loading && <p>Loading...</p>}

      {showDiffViewer && (
        <div>
          <h3 className="difference-viewer-header">Difference Viewer</h3>
          {isIdentical ? (
            <p className="identical-message">
              <FaCheckCircle className="identical-message-icon" />
              Both PDFs are identical.
            </p>
          ) : (
            <pre>
              {diffWords(text1, text2).map((part, index) => (
                <span
                  key={index}
                  style={{
                    backgroundColor: part.added ? 'lightgreen' : part.removed ? 'lightcoral' : 'transparent',
                  }}
                >
                  {part.value}
                </span>
              ))}
            </pre>
          )}
        </div>
      )}
    </div>
  );
};

export default PdfDiffTool;
