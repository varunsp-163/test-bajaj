import { useState } from "react";
import axios from "axios";
import Select from "react-select";

const Form = () => {
  const [jsonInput, setJsonInput] = useState("");
  const [error, setError] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = [
    { value: "alphabets", label: "Alphabets" },
    { value: "numbers", label: "Numbers" },
    { value: "highestLowercaseAlphabet", label: "Highest lowercase alphabet" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const parsedData = JSON.parse(jsonInput);
      if (!parsedData.data || !Array.isArray(parsedData.data)) {
        throw new Error('Invalid JSON format: "data" should be an array.');
      }
      setError("");

      const response = await axios.post(
        // "http://localhost:3000/bfhl",
        "https://test-bajaj-backend.vercel.app/bfhl",
        parsedData
      );
      setResponseData(response.data);
      console.log(response.data);
    } catch (err) {
      setError(err.message);
      setResponseData(null);
    }
  };

  const handleSelectChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
  };

  const renderResponse = () => {
    if (!responseData) return null;

    const renderedData = {};

    selectedOptions.forEach((option) => {
      renderedData[option.value] = responseData[option.value];
    });

    return (
      <div className="mt-6 p-4 bg-gray-100 rounded-lg">
        {Object.keys(renderedData).map((key) => (
          <div key={key} className="my-2">
            <strong className="text-blue-600">{key}:</strong>
            <span className="ml-2 text-gray-700">
              {JSON.stringify(renderedData[key])}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h1 className="text-2xl font-bold text-center mb-4 text-gray-800">
          Submit Your JSON
        </h1>
        <a
          href="https://github.com/varunsp-163?tab=repositories"
          target="/"
          className="underline"
        >
          Github code
        </a>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              JSON Input:
            </label>
            <textarea
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              rows="5"
              cols="50"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder='{"data": ["A", "C", "z"]}'
            />
          </div>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
          >
            Submit
          </button>
        </form>

        {responseData && (
          <>
            <div className="mt-6">
              <Select
                isMulti
                options={options}
                onChange={handleSelectChange}
                className="text-gray-700"
              />
            </div>
            {renderResponse()}
          </>
        )}
      </div>
    </div>
  );
};

export default Form;
