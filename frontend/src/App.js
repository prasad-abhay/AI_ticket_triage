import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState(null);
  const [tickets, setTickets] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const analyze = async () => {
    if (!message.trim()) {
      setError("Message cannot be empty");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await axios.post("http://localhost:4000/tickets/analyze", {
        message: message
      });

      setResult(res.data);
      setMessage("");
      fetchTickets();

    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const fetchTickets = async () => {
    try {
      const res = await axios.get("http://localhost:4000/tickets");
      setTickets(res.data);
    } catch {
      setError("Failed to fetch tickets");
    }
  };

  return (
    <div className="container">
      <h2 className="title">AI Ticket Analyzer</h2>

      <textarea
        className="textarea"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Describe your issue..."
      />

      <button className="button" onClick={analyze} disabled={loading}>
        {loading ? "Analyzing..." : "Analyze Ticket"}
      </button>

      {error && <p className="error">{error}</p>}

      {result && (
        <div className="result-card">
          <h3>Analysis Result</h3>
          <p><b>Category:</b> {result.category}</p>
          <p>
            <b>Priority:</b>{" "}
            <span className={`badge ${result.priority.toLowerCase()}`}>
              {result.priority}
            </span>
          </p>
          <p>
            <b>Urgency:</b>{" "}
            <span className={result.urgency ? "urgent" : ""}>
              {result.urgency ? "Yes ⚠️" : "No"}
            </span>
          </p>
          <p><b>Confidence:</b> {(result.confidence * 100).toFixed(0)}%</p>
          <p><b>Keywords:</b> {result.keywords.join(", ")}</p>
        </div>
      )}

      <div className="table-container">
        <h3>Previous Tickets</h3>

        <table>
          <thead>
            <tr>
              <th>Message</th>
              <th>Category</th>
              <th>Priority</th>
              <th>Urgency</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {tickets.length === 0 ? (
              <tr>
                <td colSpan="5" align="center">No tickets yet</td>
              </tr>
            ) : (
              tickets.map((t) => (
                <tr key={t.id}>
                  <td>{t.message}</td>
                  <td>{t.category}</td>
                  <td>
                    <span className={`badge ${t.priority.toLowerCase()}`}>
                      {t.priority}
                    </span>
                  </td>
                  <td className={t.urgency ? "urgent" : ""}>
                    {t.urgency ? "Yes ⚠️" : "No"}
                  </td>
                  <td>{new Date(t.created_at).toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;