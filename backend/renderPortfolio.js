import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import handlebars from "handlebars";

// to handle __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// export async function renderPortfolio(data, username) {
//   const templatePath = path.join(__dirname, "templates", "basePortfolio.hbs");
//   const outputDir = path.join(__dirname, "userPortfolios", username);
//   const outputFile = path.join(outputDir, "index.html");

//   try {
//     const templateSource = await fs.readFile(templatePath, "utf-8");
//     const template = handlebars.compile(templateSource);

//     const html = template(data);

//     await fs.ensureDir(outputDir);
//     await fs.writeFile(outputFile, html);

//     return { success: true, outputDir, outputFile };
//   } catch (err) {
//     console.error("Error rendering portfolio:", err);
//     return { success: false, error: err };
//   }
// }


export async function renderPortfolio(data, username, theme = "modern") {
  const templatePath = path.join(__dirname, "templates", theme, "template.hbs"); // adjusted path to include theme
  if (!fs.existsSync(templatePath)) {
    console.error(`Template not found at ${templatePath}`);
    return {
      success: false,
      error: new Error("Template not found")
    };
  }
  const outputDir = path.join(__dirname, "userPortfolios", username);
  const outputFile = path.join(outputDir, "index.html");

  try {
    const templateSource = await fs.readFile(templatePath, "utf-8");
    const template = handlebars.compile(templateSource);

    const html = template(data);

    await fs.ensureDir(outputDir);
    await fs.writeFile(outputFile, html);

    return { success: true, outputDir, outputFile };
  } catch (err) {
    console.error("Error rendering portfolio:", err);
    return {
      success: false,
      error: err
    };
  }
}
