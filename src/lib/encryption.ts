import crypto from "crypto";

// Ensure the encryption key is exactly 32 bytes
const ENCRYPTION_KEY = process.env.DATABASE_ENCRYPTION_KEY || "default-32-byte-encryption-key-for-dev";
const ALGORITHM = "aes-256-cbc";

// Helper to get a valid 32-byte buffer key
function getSecretKey(): Buffer {
  // If the key is shorter or longer, we pad/hash it to get exactly 32 bytes
  return crypto.createHash("sha256").update(ENCRYPTION_KEY).digest();
}

/**
 * Encrypts a string or object using AES-256-CBC.
 * Returns a colon-separated string: "iv:ciphertext"
 */
export function encrypt(data: any): string {
  try {
    const text = typeof data === "string" ? data : JSON.stringify(data);
    const iv = crypto.randomBytes(16);
    const key = getSecretKey();
    const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
    
    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");
    
    return `${iv.toString("hex")}:${encrypted}`;
  } catch (error) {
    console.error("Encryption failed:", error);
    throw new Error("Failed to encrypt data");
  }
}

/**
 * Decrypts a colon-separated "iv:ciphertext" string back to original data.
 * Tries to parse as JSON; returns raw string if not JSON.
 */
export function decrypt(encryptedText: string): any {
  try {
    const parts = encryptedText.split(":");
    if (parts.length !== 2) {
      throw new Error("Invalid encrypted text format");
    }
    
    const iv = Buffer.from(parts[0], "hex");
    const encrypted = parts[1];
    const key = getSecretKey();
    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
    
    let decrypted = decipher.update(encrypted, "hex", "utf8");
    decrypted += decipher.final("utf8");
    
    try {
      return JSON.parse(decrypted);
    } catch {
      return decrypted;
    }
  } catch (error) {
    console.error("Decryption failed:", error);
    throw new Error("Failed to decrypt data");
  }
}

/**
 * Hashes an email address deterministically using SHA-256.
 * This is used as a lookup index in the database.
 */
export function hashEmail(email: string): string {
  const normalizedEmail = email.trim().toLowerCase();
  return crypto.createHash("sha256").update(normalizedEmail).digest("hex");
}
