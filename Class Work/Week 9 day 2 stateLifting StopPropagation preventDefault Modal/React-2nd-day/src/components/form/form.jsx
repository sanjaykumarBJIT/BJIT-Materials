import React, { useState } from 'react';
import './form.style.scss'; // Import your SCSS file

const Form = () => {
  const [inputValue, setInputValue] = useState('');
  const [submittedValue, setSubmittedValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedValue(inputValue);
  };

  return (
    <div className="review-form">
      <h2>Give Review:</h2>
      <form onSubmit={handleSubmit}>
        <label className="form-label">
          Message:
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Write your review..."
            className="form-input"
          />
        </label>
        <button type="submit" className="form-button">
          Submit
        </button>
      </form>
      {submittedValue && (
        <div className="submitted-review">
          <p>Submitted Review: {submittedValue}</p>
        </div>
      )}
    </div>
  );
};

export default Form;
