// import path from "path";
// import fs from "fs";
// import fetch from "node-fetch";

// export async function deployToVercel(folderPath, username) {
//   const token = process.env.VERCEL_TOKEN;
//   const projectId = process.env.VERCEL_PROJECT_ID;
//   const projectName = `-${username}-${process.env.VERCEL_PROJECT_NAME}`;

//   if (!token || !projectId || !projectName) {
//     throw new Error("Missing Vercel config in .env");
//   }

//   const files = await collectFiles(folderPath);

//   // const payload = {
//   //   name: projectName,
//   //   // projectId,
//   //   files,
//   //   target: "production", // ensures it's a public prod deployment
//   //   projectSettings: {
//   //     framework: null, // ✅ Required for static project creation
//   //   },
//   // };

//   const payload = {
//     name: projectName,
//     files,
//     target: "production",
//     projectSettings: {
//       framework: null,
//     },
//   };


//   const res = await fetch("https://api.vercel.com/v13/deployments", {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(payload),
//   });

//   const data = await res.json();

//   if (!res.ok) {
//     throw new Error(data.error?.message || "Vercel deploy failed");
//   }

//   // this link will be public
//   return `https://${data.alias[0]}`;
// }

// // Recursively collect all files and encode
// async function collectFiles(dir) {
//   const files = [];

//   const walk = async (currentPath) => {
//     const entries = fs.readdirSync(currentPath);
//     for (const entry of entries) {
//       const fullPath = path.join(currentPath, entry);
//       const stat = fs.statSync(fullPath);

//       if (stat.isDirectory()) {
//         await walk(fullPath);
//       } else {
//         const relativePath = path.relative(dir, fullPath).replace(/\\/g, "/");
//         const content = fs.readFileSync(fullPath);
//         files.push({
//           file: relativePath,
//           data: content.toString("base64"),
//           encoding: "base64",
//         });
//       }
//     }
//   };

//   await walk(dir);
//   return files;
// }


import path from "path";
import fs from "fs";
import fetch from "node-fetch";

export async function deployToVercel(folderPath, username) {
  const token = process.env.VERCEL_TOKEN;
  const baseName = process.env.VERCEL_PROJECT_NAME || "portfolio";
  const projectName = `${baseName}-${username}`; // unique

  if (!token || !projectName) {
    throw new Error("Missing Vercel config");
  }

  const files = await collectFiles(folderPath);
  const alias = `ff-${username}.vercel.app`;

  const payload = {
    name: projectName,
    files,
    target: "production",
    projectSettings: {
      framework: null,
    },
    alias: [alias], // forces vercel.app domain to be created
  };

  const res = await fetch("https://api.vercel.com/v13/deployments", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    // console.error(data);
    throw new Error(data.error?.message || "Vercel deploy failed");
  }

  // return `https://${data.alias[0]}`;
  return `https://${alias}`;

}

async function collectFiles(dir) {
  const files = [];

  const walk = async (currentPath) => {
    const entries = fs.readdirSync(currentPath);
    for (const entry of entries) {
      const fullPath = path.join(currentPath, entry);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        await walk(fullPath);
      } else {
        const relativePath = path.relative(dir, fullPath).replace(/\\/g, "/");
        const content = fs.readFileSync(fullPath);
        files.push({
          file: relativePath,
          data: content.toString("base64"),
          encoding: "base64",
        });
      }
    }
  };

  await walk(dir);
  return files;
}
