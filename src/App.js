import React from 'react';
// import GrammarChecker from './GrammarChecker';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Dashboard from './page/Dashboard';
import PdfDiff from './tool/pdf-diff/PdfDiff';
import TextDiff from './tool/text-diff/TextDiff';
import JsonFormatterTool from './tool/json-formatter/JsonFormatterTool';
import CssToLessConverterTool from './tool/css-less-converter/CssToLessConverterTool';
import ArrayFormatterTool from './tool/array-formatter/ArrayFormatterTool';
import CommaSeparatorTool from './tool/comma-separator/CommaSeparatorTool';


import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Router>
      <div>
        <Routes>
        <Route path="/" element={<MainLayout><Dashboard/></MainLayout>} />
          <Route path="/text-difference" element={<MainLayout><TextDiff /></MainLayout>} />
          <Route path="/pdf-difference" element={<MainLayout><PdfDiff /></MainLayout>} />
          <Route path="/json-formatter" element={<MainLayout><JsonFormatterTool /></MainLayout>} />
          <Route path="/css-less-converter" element={<MainLayout><CssToLessConverterTool /></MainLayout>} />
          <Route path="/array-formatter" element={<MainLayout><ArrayFormatterTool /></MainLayout>} />
          <Route path="/comma-separator" element={<MainLayout><CommaSeparatorTool /></MainLayout>} />
        </Routes>
      </div>
    </Router>
    </div>                      
  );
}

export default App;
