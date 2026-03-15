import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

app.post("/send-email", async (req, res) => {
  const { to, subject, html } = req.body;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: "CRM <onboarding@resend.dev>",
      to: to,
      subject: subject,
      html: html
    })
  });

  const data = await response.json();
  res.json(data);
});

app.listen(3000, () => {
  console.log("Email service running");
});
