const categories = {
  Billing: ["payment", "refund", "invoice"],
  Technical: ["error", "bug", "crash", "not working"],
  Account: ["login", "password", "account"],
  "Feature Request": ["feature", "add", "improve"]
};

const urgentWords = ["urgent", "asap", "immediately", "down"];
const securityKeywords = ["fraud", "hacked", "unauthorized", "breach"];

function analyzeTicket(message) {
  const text = message.toLowerCase();

  const detectedSecurityKeywords = securityKeywords.filter(word =>
    text.includes(word)
  );

  if (detectedSecurityKeywords.length > 0) {
    return {
      category: "Account",
      priority: "P0",
      keywords: detectedSecurityKeywords,
      urgency: true,
      confidence: 0.95,
      note: " Security issue detected (custom rule applied)"
    };
  }


  let matchedKeywords = [];
  let categoryScores = {};

  for (let category in categories) {
    categoryScores[category] = 0;

    categories[category].forEach(word => {
      if (text.includes(word)) {
        categoryScores[category]++;
        matchedKeywords.push(word);
      }
    });
  }

  let category = "Other";
  let maxScore = 0;

  for (let cat in categoryScores) {
    if (categoryScores[cat] > maxScore) {
      maxScore = categoryScores[cat];
      category = cat;
    }
  }

 
  const urgency = urgentWords.some(word => text.includes(word));

  let priority = "P3";
  if (urgency && category === "Technical") priority = "P0";
  else if (urgency) priority = "P1";
  else if (maxScore > 0) priority = "P2";


  const confidence = matchedKeywords.length / 5;

  return {
    category,
    priority,
    keywords: matchedKeywords,
    urgency,
    confidence
  };
}

module.exports = analyzeTicket;