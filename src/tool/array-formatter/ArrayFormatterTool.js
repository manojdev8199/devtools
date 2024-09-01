import React, { useState } from 'react';
import { AiOutlineCopy } from 'react-icons/ai';
import './ArrayFormatterTool.css';
import { toast } from 'react-toastify';

const ArrayFormatterTool = () => {
    const [inputText, setInputText] = useState('');
    const [outputText, setOutputText] = useState('');
    const [language, setLanguage] = useState('javascript');

    const handleTextChange = (event) => {
        setInputText(event.target.value);
    };

    const handleLanguageChange = (event) => {
        setLanguage(event.target.value);
    };

    const formatArray = (array, lang) => {
        try {
            let formattedArray;
            switch (lang) {
                case 'javascript':
                    formattedArray = `const array = ${JSON.stringify(array, null, 2)};`;
                    break;
                case 'python':
                    formattedArray = `array = ${JSON.stringify(array, null, 2).replace(/"([^"]+)":/g, '$1:').replace(/"/g, '\'')}`;
                    break;
                case 'java':
                    formattedArray = `import java.util.Arrays;\n\npublic class Main {\n    public static void main(String[] args) {\n        int[] array = ${JSON.stringify(array, null, 2).replace(/\[\s*/g, '{').replace(/\s*]/g, '}').replace(/"/g, '')};\n    }\n}`;
                    break;
                case 'php':
                    formattedArray = `$array = ${JSON.stringify(array, null, 2).replace(/"/g, '\'')};`;
                    break;
                default:
                    throw new Error('Unsupported language');
            }
            return formattedArray;
        } catch (error) {
            throw new Error('Error during formatting: ' + error.message);
        }
    };

    const convertText = () => {
        try {
            const array = JSON.parse(inputText);
            const result = formatArray(array, language);
            setOutputText(result);
            // toast.success('Array formatted successfully!');
        } catch (error) {
            setOutputText('');
            toast.error('Invalid JSON input. Please ensure your input is a valid JSON array.');
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(outputText);
        toast.success('Copied to Clipboard!');
    };

    return (
        <div className="array-formatter-tool">
            <div className="heading-section">
                <h1 className="page-heading">Array Formatter Tool</h1>
                <p className="page-subheading">Format arrays into different programming languages.</p>
            </div>
            
            <div className="input-output-container">
                <div className="input-section">
                    <div className="left-top-input">
                        <label className="section-label">Input JSON Array</label>
                        <div className="language-selection">
                            <label htmlFor="language-select">
                                <span className="label-text">Language:</span>
                                <select
                                    id="language-select"
                                    value={language}
                                    onChange={handleLanguageChange}
                                    className="language-select"
                                >
                                    <option value="javascript">JavaScript</option>
                                    <option value="python">Python</option>
                                    <option value="java">Java</option>
                                    <option value="php">PHP</option>
                                </select>
                            </label>
                        </div>
                    </div>
                    
                    <textarea
                        placeholder="Enter JSON array here"
                        value={inputText}
                        onChange={handleTextChange}
                        rows={10}
                        className="input-textarea"
                    />
                    <button onClick={convertText} className="format-button">
                        Format
                    </button>
                </div>
                
                <div className="output-section">
                    {outputText && (
                        <>
                            <button onClick={copyToClipboard} className="copy-button">
                                <AiOutlineCopy className="copy-icon" /> Copy to Clipboard
                            </button>
                            <textarea
                                readOnly
                                value={outputText}
                                rows={10}
                                className="output-textarea"
                            />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ArrayFormatterTool;
