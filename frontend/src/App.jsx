import { useState } from 'react';
import axios from 'axios';
import { marked } from 'marked';
import './App.css';
import Navbar from './components/Navbar';

function Feedback({ feedback }) {
  if (!feedback) return null;

  const isError = feedback.startsWith('❌');
  return (
    <div className={`feedback-box ${isError ? 'error' : ''}`}>
      <h3>AI Feedback:</h3>
      <div
        className="markdown"
        dangerouslySetInnerHTML={{ __html: marked.parse(feedback) }}
      />
    </div>
  );
}

function App() {
  const [code, setCode] = useState('');
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReview = async (e) => {
    e.preventDefault();
    if (!code.trim()) return;

    setLoading(true);
    setFeedback('');
    try {
      const res = await axios.post('https://devflow-ai.onrender.com/review', { code });
      setFeedback(res.data.feedback);
      // setCode(''); // uncomment to clear input on success
    } catch (err) {
      setFeedback('❌ Error: Could not generate review.');
    }
    setLoading(false);
  };

  return (
    <>
    <Navbar />
    <div className="app-container">
      <h1>🧠 DevFlow AI - Code Reviewer</h1>

      <form onSubmit={handleReview} aria-label="Code review form">
        <label htmlFor="codeInput" className="sr-only">
          Paste your code here
        </label>
        <textarea
          id="codeInput"
          placeholder="Paste your code here..."
          value={code}
          onChange={(e) => setCode(e.target.value)}
          rows={12}
          aria-required="true"
          aria-describedby="feedback"
        />

        <button
          type="submit"
          disabled={loading || !code.trim()}
          aria-busy={loading}
          aria-live="polite"
        >
          {loading ? (
            <>
              <span className="spinner" aria-hidden="true"></span> Reviewing...
            </>
          ) : (
            'Review Code'
          )}
        </button>
      </form>

      <Feedback feedback={feedback} />
    </div>
    </>
  );
}

export default App;
