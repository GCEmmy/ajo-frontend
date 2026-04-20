const crypto = require('crypto');
const fs = require('fs');

const entitySecret = process.env.CIRCLE_ENTITY_SECRET;

const publicKey = `-----BEGIN PUBLIC KEY-----
MIIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAdzZy6aZhgvGJaLEc3M/neYaj8IYL2Tu3XOS5Zs5WP+Isfag75hwQS5+D3x6Ap4/UPuimUQt59pcxx8gCdtFB/ntCiTWi7YDR8bzE047jh7NlC2jLXG Uj+aQ0VE9xrqd/D9LIB5iMZxKS1CcmsHirJQ/neYJUKjy1yDbb cQ8+ixIF8sLUgBn1Kfs12Ma81aa1/9qU+av5ilXRNlBxY96eK6tC/nK2rLkcnI0UpGdwAp9uHSU6v3Kos+qsB5WwgPxaEQGMCPoOd9oXq8pDunW/wFdeE/nX1lpVVDovM448ssfht2JZ7g1p6mTnVPUJHoEN9R04JLpFH4FHfcPd6J1itbQawq5/nwIx7Q8Hnr1CuX5qxtIShkn9RpfFU5zuj2lYOFJEqJcB2zL/dZngIAKx2QdsRQrby/nSIHavG6NK/PZ7xxk70fw38ID0sinKKmu/kMU1GVdIPEBr8UUt7SZDOETHeP4UiA4vMxuJg5QGaIOJ09qPHTvBqXo6wHwNNERPB7V/nx+qLewW2KGg02poFit1HVKcRUoCWLJ78y4ZRbtKtwjAwBT1PgRQZ/bm+chJsN8+R
NLisfmowC4XTUAcpmvB4dwMCAwEAAQ==
-----END PUBLIC KEY-----`;

console.log("🔄 Encrypting Entity Secret...");

try {
  const encrypted = crypto.publicEncrypt(
    {
      key: publicKey,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
    },
    Buffer.from(entitySecret, 'hex')
  );

  const ciphertext = encrypted.toString('base64');

  console.log("\n✅ CIPHERTEXT GENERATED:");
  console.log(ciphertext);

  fs.writeFileSync('ciphertext.txt', ciphertext);
  console.log("\n✅ Saved to ciphertext.txt");

  console.log("\nCopy the long line above and paste it into the white box on the Entity Secret Configurator page.");
  console.log("Then click the blue 'Register' button.");

} catch (error) {
  console.error("❌ Error:", error.message);
}