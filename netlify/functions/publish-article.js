const axios = require("axios");

exports.handler = async function(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const REPO = process.env.REPO;
  const BRANCH = process.env.BRANCH || "main";

  try {
    const data = JSON.parse(event.body);
    const { title, content, description, author, slug, bannerBase64, bannerName, additionalImages } = data;
    const date = new Date().toISOString();

    // 1. Upload banner
    let bannerUrl = "";
    if (bannerBase64 && bannerName) {
      const bannerPath = `article-banners/${slug}-${bannerName}`;
      await axios.put(
        `https://api.github.com/repos/${REPO}/contents/${bannerPath}`,
        {
          message: `Add banner for article: ${title}`,
          content: bannerBase64,
          branch: BRANCH,
        },
        { headers: { Authorization: `token ${GITHUB_TOKEN}` } }
      );
      bannerUrl = `/${bannerPath}`;
    }

    // 2. Upload additional images
    let additionalImageUrls = [];
    if (Array.isArray(additionalImages)) {
      for (const img of additionalImages) {
        const imgPath = `article-banners/${slug}-additional-${img.name}`;
        await axios.put(
          `https://api.github.com/repos/${REPO}/contents/${imgPath}`,
          {
            message: `Add additional image: ${img.name} for article: ${title}`,
            content: img.base64,
            branch: BRANCH,
          },
          { headers: { Authorization: `token ${GITHUB_TOKEN}` } }
        );
        additionalImageUrls.push(`/${imgPath}`);
      }
    }

    // 3. Create Markdown content
    const mdContent = `---
layout: article
title: "${title.replace(/"/g, '\\"')}"
date: "${date}"
author: "${author || "Editor"}"
banner: ${bannerUrl}
description: "${description || ""}"
slug: "${slug}"
additional_images:
${additionalImageUrls.map(url => `  - ${url}`).join("\n")}
---

${content}
`;

    // 4. Upload Markdown file
    const articlePath = `_articles/${slug}.md`;
    await axios.put(
      `https://api.github.com/repos/${REPO}/contents/${articlePath}`,
      {
        message: `Add article: ${title}`,
        content: Buffer.from(mdContent).toString("base64"),
        branch: BRANCH,
      },
      { headers: { Authorization: `token ${GITHUB_TOKEN}` } }
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: "Article and images published!" }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};