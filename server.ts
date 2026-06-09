import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const PORT = 3000;

// Helper for GoogleGenAI lazy loading
let aiClient: GoogleGenAI | null = null;
function getGeminiClient() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not configured in the environment.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  app.use(express.json());

  // AI COPYWRITING ASSISTANT - WRITE BLOG
  app.post("/api/ai/write-blog", async (req, res) => {
    try {
      const { topic, category, tone = "expert", toneDetails = "" } = req.body;
      if (!topic) {
        return res.status(400).json({ error: "Missing 'topic' in request body" });
      }

      const ai = getGeminiClient();
      
      const prompt = `Write a premium, high-converting, highly professional, and informative agency blog post/insight article.
Category: ${category || "AI Marketing & Design"}
Topic/SEO Hook: ${topic}
Desired Tone: ${tone} (Details: ${toneDetails})

Make sure to format the output with:
1. An eye-catching, high-converting Title.
2. A compelling short Hook/Introduction.
3. 3-4 structured, interactive sections with informative subheadings.
4. Actionable strategies or takeaways.
5. A powerful final call-to-action (CTA) for booking a consulting session with Dynamic Webs.
6. A list of 4-5 focus keywords.

Write the complete article in exquisite professional marketing copywriting style. Output should be clean GitHub-flavored markdown. Do not wrap the response in a markdown code block, just output the markdown content directly.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
      });

      const aiText = response.text || "";
      return res.json({ article: aiText });

    } catch (error: any) {
      console.error("AI Blog Generation Error:", error);
      return res.status(500).json({ error: error.message || "Failed to generate blog content" });
    }
  });

  // AI SEO OPTIMIZER
  app.post("/api/ai/seo-optimize", async (req, res) => {
    try {
      const { title, description, services, theme = "Premium Slate" } = req.body;
      
      const ai = getGeminiClient();

      const prompt = `Analyze the current metadata and agency details for an AI and design agency website, and provide extreme optimization suggestions.
Current Title: "${title || ""}"
Current Description: "${description || ""}"
Services Offered: "${JSON.stringify(services || [])}"
Branding Mood: "${theme}"

Suggest exactly:
1. An optimized SEO Page Title (under 60 chars) - click-worthy & high organic CTR.
2. An optimized SEO Meta Description (under 160 chars) - summarizing unique value proposition.
3. A list of 10 targeted high-intent primary and secondary Keywords (comma-separated).
4. Three custom conversion suggestions (headline upgrades, copy edits) to maximize leads.

Respond strictly in JSON format. Do not use markdown backticks in your response. The JSON structure must match this schema:
{
  "optimizedTitle": "string",
  "optimizedDescription": "string",
  "keywords": "string",
  "conversionTips": ["string", "string", "string"]
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              optimizedTitle: { type: Type.STRING },
              optimizedDescription: { type: Type.STRING },
              keywords: { type: Type.STRING },
              conversionTips: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              }
            },
            required: ["optimizedTitle", "optimizedDescription", "keywords", "conversionTips"]
          }
        }
      });

      try {
        const parsed = JSON.parse(response.text?.trim() || "{}");
        return res.json(parsed);
      } catch {
        return res.json({
          optimizedTitle: `${title || "Dynamic Webs"} | Premium AI Design Agency`,
          optimizedDescription: description,
          keywords: "website automation, ai web design, agency conversion optimization",
          conversionTips: [
            "Introduce interactive before-and-after case study metrics.",
            "Add client logo micro-interactions.",
            "Make the booking CTA stand out in standard accent colors."
          ]
        });
      }

    } catch (error: any) {
      console.error("AI SEO Optimization Error:", error);
      return res.status(500).json({ error: error.message || "Failed to optimize SEO metadata" });
    }
  });

  // Use Vite on development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  // Start Server on Port 3000
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Dynamic Webs backend running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start fullstack server:", err);
  process.exit(1);
});
