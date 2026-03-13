/**
 * LedgerX — Firebase Cloud Functions
 * Provides a secure server-side proxy for Anthropic Claude API
 * (browsers cannot call Anthropic directly due to CORS restrictions)
 */

const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const fetch = require("node-fetch");

// Store API key as a Firebase Secret (never hardcoded in client)
const claudeApiKey = defineSecret("CLAUDE_API_KEY");
const ocrApiKey = defineSecret("OCR_API_KEY");

/**
 * askClaude — Proxies requests to Anthropic's Claude API
 * Called by the frontend for: TaxBot chat, document AI analysis, risk scoring
 */
exports.askClaude = onRequest(
  { secrets: [claudeApiKey], cors: true, maxInstances: 10 },
  async (req, res) => {
    // Handle CORS preflight
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.set("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
      res.status(204).send("");
      return;
    }

    if (req.method !== "POST") {
      res.status(405).json({ error: "Method not allowed" });
      return;
    }

    try {
      const { model, max_tokens, system, messages } = req.body;

      if (!messages || !Array.isArray(messages)) {
        res.status(400).json({ error: "Invalid request body" });
        return;
      }

      const anthropicRes = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": claudeApiKey.value(),
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: model || "claude-3-5-sonnet-20241022",
          max_tokens: max_tokens || 1024,
          system: system || "",
          messages,
        }),
      });

      const data = await anthropicRes.json();
      res.status(anthropicRes.status).json(data);
    } catch (err) {
      console.error("Claude proxy error:", err);
      res.status(500).json({ error: err.message });
    }
  }
);

/**
 * ocrDocument — Proxies to OCR.space API (optional, for added security)
 * Frontend can also call OCR.space directly since it allows CORS
 */
exports.ocrDocument = onRequest(
  { secrets: [ocrApiKey], cors: true, maxInstances: 5 },
  async (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.set("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
      res.status(204).send("");
      return;
    }

    // The frontend handles OCR.space directly (CORS allowed)
    // This function is a fallback if needed
    res.status(200).json({ message: "Use OCR.space directly from frontend" });
  }
);
