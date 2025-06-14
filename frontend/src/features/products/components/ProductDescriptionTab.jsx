import React from 'react';
import "../../products/components/ProductDescriptionTab.css";

const parseDescription = (description) => {
  const result = {};
  const lines = description.split(/\r?\n/).map(line => line.trim()).filter(Boolean);

  let currentSection = "intro";
  result[currentSection] = "";
  lines.forEach((line) => {
    const isNewSection = /^[A-Za-z ]+:?$/.test(line); 
    if (isNewSection) {
      currentSection = line.replace(":", "").trim();
      result[currentSection] = [];
    } else {
      if (currentSection === "intro") {
        result[currentSection] += line + " ";
      } else {
        result[currentSection].push(line);
      }
    }
  });

  return result;
};

const ProductDescriptionTab = ({ description }) => {
  if (!description) return null;

  const parsed = parseDescription(description);

  return (
    <div className="product-description-container">
      {parsed.intro && <p className="intro">{parsed.intro.trim()}</p>}
      {Object.entries(parsed).map(([section, content], index) => {
        if (section === "intro") return null;

        const isNumbered = content.every(item => /^\d+[\).]/.test(item))

        return (
          <div key={index}>
            <hr />
            <h3 className="section-title">{section}:</h3>
            {isNumbered ? (
              <ol className="section-list ">
                {content.map((item, i) => (
                  <li key={i}>{item.replace(/^\d+[\).]\s*/, "")}</li>
                ))}
              </ol>
            ) : (
              <ul className="section-list">
                {content.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
      <hr />
    </div>
  );
};

export default ProductDescriptionTab;