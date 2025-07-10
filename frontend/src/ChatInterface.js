import React, { useState } from 'react';

function ChatInterface() {
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // ✅ Backend URL pointing to your own Express server
  const apiUrl = '/api/chat';

  const handleTextChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = async () => {
    if (inputText.trim()) {
      setIsLoading(true);
      setResult('');

      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ content: inputText }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setResult(data.response || JSON.stringify(data)); // fallback for debug
      } catch (error) {
        console.error('Error:', error);
        setResult('Error: Could not get a response.');
      }

      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Chat with Gemma 2:2b</h1>

      <textarea
        value={inputText}
        onChange={handleTextChange}
        placeholder="Type your message here..."
        rows="5"
        cols="50"
        style={{ width: '100%', marginBottom: '10px' }}
      />

      <br />

      <button onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? 'Waiting for response...' : 'Send'}
      </button>

      <div style={{ marginTop: '20px' }}>
        <h2>Response:</h2>
        <p>{result}</p>
      </div>
    </div>
  );
}

export default ChatInterface;
