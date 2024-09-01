import React, { useState } from 'react';
import ReactJson from 'react-json-view';
import { FaUpload, FaClipboard } from 'react-icons/fa'; // Import the clipboard icon
import './JsonFormatterTool.css';
import { toast } from 'react-toastify';

const JsonFormatterTool = () => {
    const [jsonInput, setJsonInput] = useState('');
    const [formattedJson, setFormattedJson] = useState('');
    const [error, setError] = useState('');

    const handleJsonChange = (event) => {
        setJsonInput(event.target.value);
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const json = JSON.parse(e.target.result);
                    setJsonInput(JSON.stringify(json, null, 2));
                    setError('');
                } catch (err) {
                    toast.error('Invalid JSON file.');
                }
            };
            reader.readAsText(file);
        }
    };

    const handleFormat = () => {
        try {
            const parsedJson = JSON.parse(jsonInput);
            setFormattedJson(JSON.stringify(parsedJson, null, 2));
            setError('');
        } catch (err) {
            toast.error('Invalid JSON format.');
            setFormattedJson('');
        }
    };

    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(formattedJson).then(() => {
            toast.success('JSON copied to clipboard!');
        }).catch((err) => {
            toast.error('Failed to copy JSON.');
        });
    };

    return (
        <div className="json-formatter-tool">
            <main className="main-content">
                <div className="heading-section">
                    <h1 className="page-heading">JSON Formatter Tool</h1>
                    <p className="page-subheading">Format your JSON data for better readability and structure.</p>
                </div>
                <div className="content-container">
                    <div className="input-container">
                        <div className='left-side-input-section'>
                            <label className="section-label">Input JSON</label>
                            <div className="upload-container">
                                <input
                                    id="file-upload"
                                    type="file"
                                    accept=".json"
                                    onChange={handleFileUpload}
                                    className="file-upload"
                                />
                                <label htmlFor="file-upload" className="upload-button">
                                    <FaUpload className="upload-button-icon" />
                                    <span>Upload JSON</span>
                                </label>
                            </div>
                        </div>
                       
                        <textarea
                            placeholder="Enter JSON here"
                            value={jsonInput}
                            onChange={handleJsonChange}
                            rows={20}
                            className="json-input"
                        />
                        <button onClick={handleFormat} className="format-button">Format JSON</button>
                    </div>
                    <div className="output-container">
                        <div className='right-side-input-section'>
                            <label className="section-label">Formatted Output</label>
                            {formattedJson && !error && (
                                <>
                            <button onClick={handleCopyToClipboard} className="copy-button">
                                <FaClipboard className="copy-button-icon" />
                                <span>Copy to Clipboard</span>
                            </button>
                            </>
                            )}
                        </div>
                        <div className="json-output">
                            {formattedJson && !error && (
                                <>
                                    <ReactJson src={JSON.parse(formattedJson)} theme="rjv-default" />
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </main> 
        </div>
    );
};

export default JsonFormatterTool;
