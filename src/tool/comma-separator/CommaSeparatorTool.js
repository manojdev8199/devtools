import React, { useState } from 'react';
import './CommaSeparatorTool.css'; // Ensure you have this CSS file
import { AiOutlineCopy } from 'react-icons/ai';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CommaSeparatorTool = () => {
    const [inputText, setInputText] = useState('');
    const [formattedOutput, setFormattedOutput] = useState('');
    const [quoteType, setQuoteType] = useState('without'); // Default to without quotes
    const [convertType, setConvertType] = useState('');

    const handleTextChange = (event) => {
        setInputText(event.target.value);
    };

    const handleConversion = () => {
        if (inputText.trim() === '') {
            toast.error('Please enter some comma-separated values.');
            return;
        }

        if (quoteType === 'with' && !convertType) {
            toast.error('Please select either "Convert to Single Quotes" or "Convert to Double Quotes".');
            return;
        }

        try {
            let values = inputText.split(',').map(value => value.trim());

            if (quoteType === 'without') {
                values = values.map(value => value.replace(/^['"]|['"]$/g, '').trim());
            } else if (quoteType === 'with') {
                if (convertType === 'single') {
                    values = values.map(value => `'${value.replace(/^['"]|['"]$/g, '').trim()}'`);
                } else if (convertType === 'double') {
                    values = values.map(value => `"${value.replace(/^['"]|['"]$/g, '').trim()}"`);
                }
            }

            setFormattedOutput(values.join(','));
        } catch (error) {
            console.error('Formatting Error:', error);
            toast.error(`Error during formatting: ${error.message}`);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(formattedOutput);
        toast.success('Copied to Clipboard!');
    };

    return (
        <div className="comma-separator-tool">
            <div className="heading-section">
                <h1 className="page-heading">Comma Separator Tool</h1>
                <p className="page-subheading">Transform and beautify comma-separated values with various formatting options.</p>
            </div>
            <div className="content-container">
                <div className="input-container">
                    <div className="left-input-section">

                    </div>
                    <label className="section-label">Input Comma-Separated Values</label>
                    <textarea
                        placeholder="Enter comma-separated values here - Ex : 1,2,3"
                        value={inputText}
                        onChange={handleTextChange}
                        rows={10}
                        className="input-textarea"
                    />
                    <div className="conversion-options">
                        <label>
                            <input
                                type="radio"
                                value="without"
                                checked={quoteType === 'without'}
                                onChange={() => setQuoteType('without')}
                            />
                            Without Quotes
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="with"
                                checked={quoteType === 'with'}
                                onChange={() => setQuoteType('with')}
                            />
                            With Quotes
                        </label>
                    </div>
                    {quoteType === 'with' && (
                        <div className="conversion-buttons">
                            <label>
                                <input
                                    type="radio"
                                    value="single"
                                    checked={convertType === 'single'}
                                    onChange={() => setConvertType('single')}
                                />
                                Convert to Single Quotes
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    value="double"
                                    checked={convertType === 'double'}
                                    onChange={() => setConvertType('double')}
                                />
                                Convert to Double Quotes
                            </label>
                        </div>
                    )}
                    <button onClick={handleConversion} className="format-button">Format Values</button>
                </div>
                <div className="output-container">
                    <div className='right-output-section'>
                        <label className="section-label">Formatted Output</label>
                        {formattedOutput && (
                            <button className="copy-button" onClick={copyToClipboard}>
                                <AiOutlineCopy /> Copy to Clipboard
                            </button>
                        )}
                    </div>
                    <div className="formatted-output">{formattedOutput}</div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default CommaSeparatorTool;
