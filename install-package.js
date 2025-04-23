const { execSync } = require("child_process");
const fs = require("fs");

// Function to install dependencies from a JSON file
function installFromJson(filePath) {
  if (fs.existsSync(filePath)) {
    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
    const dependencies = Object.entries({
      ...data.dependencies,
      ...data.devDependencies,
    })
      .map(([pkg, version]) => `${pkg}@${version}`)
      .join(" ");

    if (dependencies) {
      console.log(`📦 Installing dependencies from ${filePath}...`);
      execSync(`npm install ${dependencies}`, { stdio: "inherit" });
    } else {
      console.log(`✅ No dependencies found in ${filePath}.`);
    }
  } else {
    console.log(`⚠️ File ${filePath} not found, skipping...`);
  }
}

// Install from custom-packages.json first, then package.json
installFromJson("global_package.json");
console.log("✅ Finished installing from global_package.json.\n");

console.log("📦 Now installing dependencies from package.json...");
execSync("npm install", { stdio: "inherit" });

console.log("\n🚀 All dependencies installed successfully!");
