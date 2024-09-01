import React from "react";
import Card from "../components/common/Card";
import { FaTextHeight, FaCode, FaLess, FaList,FaParagraph } from "react-icons/fa";

function Dashboard() {
  return (
    <main className="dashboard-wrapper">
      <div className="dashboard-page">
        <div className="dashboard-card-container">
          <Card
            title="Text Difference Tool"
            description="Compare two pieces of text to find the differences between them."
            icon={<FaTextHeight />}
            link="/text-difference"
          />
          <Card
            title="JSON Formatter Tool"
            description="Format your JSON data for better readability and structure."
            icon={<FaCode />} // Updated icon
            link="/json-formatter"
          />
              <Card
            title="Comma Separator Formatter"
            description="Transform and beautify comma-separated values with various formatting options."
            icon={<FaParagraph />} // Updated icon
            link="/comma-separator"
          />
           <Card
            title="LESS to CSS Converter"
            description="Easily Convert the LESS code to CSS format vice versa."
            icon={<FaLess />} // Updated icon
            link="/css-less-converter"
          />
           <Card
            title="Array Formatter Tool"
            description="Format your JSON array into different language array data."
            icon={<FaList />} // Updated icon
            link="/array-formatter"
          />
          
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
