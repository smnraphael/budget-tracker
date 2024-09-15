import CryptoJS from 'crypto-js';

const ENCRYPTION_KEY =
  process.env.NEXT_PUBLIC_ENCRYPTION_KEY || process.env.ENCRYPTION_KEY;

if (!ENCRYPTION_KEY) {
  throw new Error(
    'Encryption key is not defined in the environment variables.'
  );
}

// Encrypt data
export function encryptData(data: string): string {
  return CryptoJS.AES.encrypt(data, ENCRYPTION_KEY as string).toString();
}

// Decrypt data
export function decryptData(encryptedData: string): string {
  const bytes = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY as string);
  return bytes.toString(CryptoJS.enc.Utf8);
}
