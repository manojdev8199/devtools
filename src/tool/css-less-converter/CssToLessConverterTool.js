import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { AiOutlineCopy } from 'react-icons/ai';
import { FaUpload } from 'react-icons/fa';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import less from 'less';
import './CssToLessConverterTool.css';
import { toast } from 'react-toastify';

const CssToLessConverterTool = () => {
    const [inputText, setInputText] = useState('');
    const [outputText, setOutputText] = useState('');
    const [conversionType, setConversionType] = useState('css-to-less'); // Default conversion type

    const handleTextChange = (event) => {
        setInputText(event.target.value);
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setInputText(e.target.result);
            };
            reader.readAsText(file);
        }
    };

    const cssToLess = (css) => {
        try {
            let lessText = css
                .replace(/:root\s*\{([^}]+)\}/g, (match, p1) => {
                    return p1.replace(/--([\w-]+):\s*([^;]+);/g, '@$1: $2;');
                })
                .replace(/var\(--([\w-]+)\)/g, '@$1');

            return lessText;
        } catch (error) {
            throw new Error('Error during conversion: ' + error.message);
        }
    };

    const lessToCss = async (lessText) => {
        try {
            const result = await less.render(lessText);
            return result.css;
        } catch (error) {
            throw new Error('Error during conversion: ' + error.message);
        }
    };

    const convertText = async () => {
        if (!inputText.trim()) {
            toast.error('Please enter or upload CSS/LESS text.');
            return;
        }

        try {
            if (conversionType === 'css-to-less') {
                const result = cssToLess(inputText);
                setOutputText(result);
                //toast.success('CSS to LESS conversion successful!');
            } else if (conversionType === 'less-to-css') {
                const result = await lessToCss(inputText);
                setOutputText(result);
               // toast.success('LESS to CSS conversion successful!');
            }
        } catch (error) {
            console.error('Conversion Error:', error);
            setOutputText('');
            toast.error(`Error during conversion: ${error.message}`);
        }
    };

    const handleConversionTypeChange = (event) => {
        setConversionType(event.target.value);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(outputText);
        toast.success('Copied to Clipboard!');
    };

    return (
        <div className="css-to-less-converter-tool">
            <div className="heading-section">
                <h1 className="page-heading">CSS / LESS Converter Tool</h1>
                <p className="page-subheading">Easily convert CSS to LESS format and vice versa.</p>
            </div>
           
            <div className="content-container">
                <div className="input-section">
                    <div className="left-input-section">
                        <label className="section-label">Input CSS/LESS</label>
                        <div className="upload-container">
                            <input
                                id="file-upload"
                                type="file"
                                accept=".css,.less"
                                onChange={handleFileUpload}
                                className="file-upload"
                            />
                            <label htmlFor="file-upload" className="upload-button">
                                <FaUpload className="upload-button-icon" />
                                <span>Upload File</span>
                            </label>
                        </div>
                    </div>
                    <textarea
                        placeholder="Enter CSS/LESS here"
                        value={inputText}
                        onChange={handleTextChange}
                        rows={10}
                        className="css-input"
                    />
                    <div className="input-bottom-section">
                        <div className="conversion-type">
                            <label>
                                <input
                                    type="radio"
                                    value="css-to-less"
                                    checked={conversionType === 'css-to-less'}
                                    onChange={handleConversionTypeChange}
                                />
                                CSS to LESS
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    value="less-to-css"
                                    checked={conversionType === 'less-to-css'}
                                    onChange={handleConversionTypeChange}
                                />
                                LESS to CSS
                            </label>
                        </div>
                        <div className="conversion-buttons">
                            <button onClick={convertText} className="format-button">
                                Convert
                            </button>
                        </div>
                    </div>
                </div>
                <div className="output-section">
                    {outputText && (
                        <div className="output-content">
                            <button onClick={copyToClipboard} className="copy-button">
                                <AiOutlineCopy className="copy-icon" /> Copy to Clipboard
                            </button>
                            <SyntaxHighlighter language={conversionType === 'css-to-less' ? 'less' : 'css'} style={dark}>
                                {outputText}
                            </SyntaxHighlighter>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CssToLessConverterTool;
