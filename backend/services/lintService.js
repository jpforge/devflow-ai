const { ESLint } = require("eslint");

async function reviewCode(code) {
  const eslint = new ESLint(); // No options needed

  try {
    const results = await eslint.lintText(code);
    const messages = results[0].messages;

    if (messages.length === 0) {
      return "✅ No linting issues found. Code looks clean!";
    }

    return messages
      .map(
        (msg) =>
          `Line ${msg.line}, Col ${msg.column}: ${msg.message} (${msg.ruleId})`
      )
      .join("\n");
  } catch (error) {
    console.error("❌ ESLint error inside reviewCode:", error);
    throw new Error("Failed to lint code.");
  }
}

module.exports = { reviewCode };
