/*
Authors: Aytaç GÜÇ
Description: This file is a command line tool for creating a new component in Vue.js.
Date: 12 May, 2024
Version: 1.0

*/
// Current working directory excuted the script

const rootPath = process.cwd();

// process.argv[2] is a 3. argument of the command line. No arg ? Exit the process
const componentName = process.argv[2];
const componentPath = process.argv[3] ? `src/components/${process.argv[3]}` : "src/components/";

if (componentName === undefined) {
   console.log("Please enter a component name!");
   process.exit(); // Exit the process
}
const nameConvention = !/^[A-Z][a-z]*([A-Z][a-z]*)*$/.test(componentName);
if (nameConvention) {
   console.error("Component name should have at least two uppercase characters and no whitespace.");
   process.exit(1); // Exit the script with a non-zero exit code
}

// Importing File System module
const fs = require("fs");
const path = require("path");
const { dash, pascal } = require("radash");

// Function to get the template file path
const getTemplateFilePath = () => {
   const configPath = path.join(rootPath, "reisetech.config.json");
   let templateFilePath = path.join(__dirname, "template.vue"); // Default template file

   if (fs.existsSync(configPath)) {
      try {
         const configContent = fs.readFileSync(configPath, "utf-8");
         const config = JSON.parse(configContent);
         if (config.compilerTemplateFile) {
            templateFilePath = path.isAbsolute(config.compilerTemplateFile)
               ? config.compilerTemplateFile
               : path.join(rootPath, config.compilerTemplateFile);
         }
      } catch (error) {
         console.error("Error reading or parsing reisetech.config:", error);
         process.exit(1);
      }
   }

   return templateFilePath;
};

// Get the template file path
const templateFilePath = getTemplateFilePath();

// Check if the componentPath exists, if not create it
if (!fs.existsSync(componentPath)) {
   fs.mkdirSync(`${rootPath}/${componentPath}`, { recursive: true });
   console.log(`Folder created: ${rootPath}/${componentPath}`);
}

// Read the figJam for rules --> https://shorturl.at/buQ07
const vueTemplate = fs
   .readFileSync(templateFilePath, "utf-8")
   .toString()
   .replace(/dynamicClassName/g, dash(componentName))
   .replace(/ComponentName/g, componentName);

const fileName = `${componentName}.vue`;
// Create a new file with the component name if doesn't exist
if (fs.existsSync(`${rootPath}/${componentPath}/${fileName}`)) {
   console.warn("Component already exists!");
   process.exit(1);
}
fs.writeFile(`${rootPath}/${componentPath}/${fileName}`, vueTemplate, (err) => {
   if (err) throw err;
   console.log("File Created on", `${rootPath}/${componentPath}/${fileName}`);
});
