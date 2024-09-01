import React, { useState } from 'react';
import axios from 'axios';

const languages = [
  { code: 'en-US', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  // Add more languages as needed
];

const GrammarChecker = () => {
  const [text, setText] = useState('');
  const [correctedText, setCorrectedText] = useState('');
  const [corrections, setCorrections] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0].code);
  const [paraphraseOptions, setParaphraseOptions] = useState([]);
  const [customParaphrase, setCustomParaphrase] = useState('');

  const checkGrammar = async () => {
    try {
      const formData = new FormData();
      formData.append('text', text);
      formData.append('language', selectedLanguage);

      const response = await axios.post('http://localhost/grammer/api/grammarCheck.php', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const matches = response.data.matches;

      let newText = text;
      const offsets = [];

      matches.forEach((match) => {
        const offset = match.offset;
        const length = match.length;
        const replacement = match.replacements[0]?.value || '';
        offsets.push({ offset, length, replacement });
        newText = newText.slice(0, offset) + replacement + newText.slice(offset + length);
      });

      setCorrectedText(newText);
      setCorrections(offsets);
    } catch (error) {
      console.error('Error checking grammar:', error);
    }
  };

  const rephraseText = async () => {
    try {
      const formData = new FormData();
      formData.append('text', text);
      formData.append('language', selectedLanguage);
      formData.append('rephrase', 'true'); // Custom parameter to indicate rephrasing

      const response = await axios.post('http://localhost/grammer/api/grammarCheck.php', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setParaphraseOptions(response.data.paraphraseOptions); // Assuming the API returns 'paraphraseOptions'
    } catch (error) {
      console.error('Error rephrasing text:', error);
    }
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleLanguageChange = (languageCode) => {
    setSelectedLanguage(languageCode);
  };

  const handleParaphraseSelect = (option) => {
    setCorrectedText(option);
  };

  const handleCustomParaphraseChange = (event) => {
    setCustomParaphrase(event.target.value);
  };

  const addCustomParaphrase = () => {
    setCorrectedText(customParaphrase);
  };

  const getHighlightedText = () => {
    const result = [];
    let currentIndex = 0;

    corrections.forEach(({ offset, length, replacement }) => {
      if (currentIndex < offset) {
        result.push(<span key={currentIndex}>{correctedText.slice(currentIndex, offset)}</span>);
      }
      result.push(<span key={offset} style={{ backgroundColor: 'yellow' }}>{replacement}</span>);
      currentIndex = offset + replacement.length;
    });

    if (currentIndex < correctedText.length) {
      result.push(<span key={currentIndex}>{correctedText.slice(currentIndex)}</span>);
    }

    return result;
  };

  return (
    <div>
      <h1>Grammar Checker</h1>
      <div>
        <h2>Select Language</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              style={{
                backgroundColor: selectedLanguage === lang.code ? 'lightblue' : 'white',
              }}
            >
              {lang.name}
            </button>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        <div>
          <h2>Actual Text</h2>
          <textarea value={text} onChange={handleTextChange} rows="10" cols="50" style={{ borderColor: 'red' }} />
        </div>
        <div>
          <h2>Corrected Text</h2>
          <div style={{ border: '1px solid green', padding: '10px', minHeight: '150px', width: '400px' }}>
            {getHighlightedText()}
          </div>
        </div>
      </div>
      <button onClick={checkGrammar} style={{ marginTop: '10px' }}>Check Grammar</button>
      <button onClick={rephraseText} style={{ marginTop: '10px', marginLeft: '10px' }}>Rephrase Text</button>
      <div>
        <h2>Paraphrase Options</h2>
        <ul>
          {paraphraseOptions.map((option, index) => (
            <li key={index}>
              <button onClick={() => handleParaphraseSelect(option)}>{option}</button>
            </li>
          ))}
        </ul>
        <textarea
          value={customParaphrase}
          onChange={handleCustomParaphraseChange}
          rows="3"
          cols="50"
          placeholder="Add your own paraphrase here"
        />
        <button onClick={addCustomParaphrase}>Add Custom Paraphrase</button>
      </div>
      <ul>
        {corrections.map((correction, index) => (
          <li key={index}>
            {correction.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GrammarChecker;
