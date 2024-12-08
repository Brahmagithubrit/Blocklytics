import React, { useState } from "react";
import axios from "axios";
import "./App.css"

export default function Terminal() {
  const [cmd, setCmd] = useState(""); // For the main command
  const [args, setArgs] = useState(""); // For arguments
  const [res, setRes] = useState(""); // For the response

  const handleExec = async () => {
    try {
      // Sending command and arguments as query parameters
      const response = await axios.get(
        `http://localhost:5000/exec?cmd=${encodeURIComponent(
          cmd
        )}&args=${encodeURIComponent(args)}`
      );
      setRes(response.data);
    } catch (error) {
      console.log(`Error in axios: ${error}`);
      setRes(`Error: ${error.response?.data || error.message}`);
    }
  };

  return (
    <div>
      <div className="terminal">
        <textarea
          id="text_area"
          rows={10}
          cols={50}
          value={cmd}
          onChange={(e) => setCmd(e.target.value)}
          placeholder="Enter command here"
        ></textarea>
        <input
          type="text"
          value={args}
          onChange={(e) => setArgs(e.target.value)}
          placeholder="Enter arguments here (comma separated)"
        />
      </div>
      <button onClick={handleExec}>Execute</button>
      {res ? (
        <div>
          <p>Response is:</p>
          <pre>{res}</pre>
        </div>
      ) : (
        <p>No response received</p>
      )}
    </div>
  );
}
