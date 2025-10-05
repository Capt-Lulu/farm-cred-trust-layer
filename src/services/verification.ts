const NIMC_BASE_URL = 'https://api.nimc.gov.ng/v1';
const NIMC_API_KEY =  'imc keys here';

const CBN_BASE_URL = 'https://api.cbn.gov.ng/v1';
const CBN_API_KEY = 'ckeyshere';

// Warn if environment variables are missing
if (!NIMC_BASE_URL || !NIMC_API_KEY) {
  console.warn("NIMC API environment variables are not set.");
}
if (!CBN_BASE_URL || !CBN_API_KEY) {
  console.warn("CBN API environment variables are not set.");
}

// Type for verification results
export type VerificationResult = {
  success: boolean;
  data?: any;
  error?: string;
};

// Single export containing all verification methods
export const verificationService = {
  verifyNIN: async (nin: string): Promise<VerificationResult> => {
    if (!NIMC_BASE_URL || !NIMC_API_KEY) {
      return { success: false, error: "NIMC API environment variables not set" };
    }

    try {
      const response = await fetch(`${NIMC_BASE_URL}/nin/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${NIMC_API_KEY}`,
        },
        body: JSON.stringify({ nin }),
      });

      if (!response.ok) {
        return { success: false, error: `HTTP error! Status: ${response.status}` };
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error: any) {
      return { success: false, error: error.message || "Unknown error" };
    }
  },

  verifyCBN: async (accountNumber: string): Promise<VerificationResult> => {
    if (!CBN_BASE_URL || !CBN_API_KEY) {
      return { success: false, error: "CBN API environment variables not set" };
    }

    try {
      const response = await fetch(`${CBN_BASE_URL}/account/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${CBN_API_KEY}`,
        },
        body: JSON.stringify({ accountNumber }),
      });

      if (!response.ok) {
        return { success: false, error: `HTTP error! Status: ${response.status}` };
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error: any) {
      return { success: false, error: error.message || "Unknown error" };
    }
  },
};
