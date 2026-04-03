const db = require("../config/db");
const analyzeTicket = require("../analyzer/ticketAnalyzer");

exports.analyzeTicket = (req, res) => {
  const { message } = req.body;

  if (!message ) {
    return res.status(400).json({ error: "Invalid message" });
  }

  const result = analyzeTicket(message);

  const sql = `
    INSERT INTO tickets (message, category, priority, keywords, urgency, confidence)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      message,
      result.category,
      result.priority,
      JSON.stringify(result.keywords),
      result.urgency,
      result.confidence
    ],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json(result);
    }
  );
};

exports.getTickets = (req, res) => {
  db.query("SELECT * FROM tickets ORDER BY created_at DESC", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};