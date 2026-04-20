const { registerEntitySecretCiphertext } = require('@circle-fin/developer-controlled-wallets');

async function main() {
  try {
    console.log("🔄 Registering Entity Secret with Circle...");

    const response = await registerEntitySecretCiphertext({
      apiKey: process.env.CIRCLE_API_KEY,
      entitySecret: process.env.CIRCLE_ENTITY_SECRET,
    });

    console.log("✅ SUCCESS! Entity Secret registered with Circle.");
    console.log("Recovery file path:", response.data?.recoveryFile || "Check your project folder");
    console.log("\nYou can now delete this register-entity-secret.js file if you want.");

  } catch (error) {
    console.error("❌ Failed to register:", error.message);
    if (error.response) {
      console.error("Details:", error.response.data);
    }
  }
}

main();