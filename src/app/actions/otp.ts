'use server';

// In a real-world scenario, you would use a secure, expiring cache like Redis 
// or a dedicated Firestore collection to store OTPs temporarily.
// For this prototype, we'll use a simple in-memory store, which will reset on every server restart.
const otpStore: Record<string, { otp: string; timestamp: number }> = {};
const OTP_EXPIRY_MS = 5 * 60 * 1000; // 5 minutes

/**
 * Generates and "sends" an OTP to a given contact method.
 * In a real app, this would integrate with an email/SMS service (e.g., Twilio, SendGrid).
 * For this prototype, it generates an OTP and logs it to the console for testing.
 */
export async function sendOtp(contact: string): Promise<{ success: boolean; message: string }> {
    try {
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        
        otpStore[contact] = {
            otp: otp,
            timestamp: Date.now()
        };

        // --- SIMULATED SENDING ---
        console.log(`[OTP Simulation] Code for ${contact} is: ${otp}`);
        // In a real app, you would uncomment and use a service like this:
        // await sendSms(contact, `Your Nexus Bank verification code is: ${otp}`);
        // await sendEmail(contact, 'Your Verification Code', `Your Nexus Bank code is: ${otp}`);
        
        return { success: true, message: `An OTP has been sent to ${contact}.` };
    } catch (error) {
        console.error("Error sending OTP:", error);
        return { success: false, message: "Failed to send OTP." };
    }
}

/**
 * Verifies an OTP against the stored value for a given contact method.
 */
export async function verifyOtp(contact: string, otp: string): Promise<{ success: boolean; message?: string }> {
    try {
        const storedOtpData = otpStore[contact];

        if (!storedOtpData) {
            return { success: false, message: "No OTP found. Please request a new one." };
        }

        const isExpired = (Date.now() - storedOtpData.timestamp) > OTP_EXPIRY_MS;
        if (isExpired) {
            delete otpStore[contact]; // Clean up expired OTP
            return { success: false, message: "OTP has expired. Please request a new one." };
        }
        
        if (storedOtpData.otp === otp) {
            delete otpStore[contact]; // Clean up used OTP
            return { success: true };
        } else {
            return { success: false, message: "The OTP you entered is incorrect." };
        }

    } catch (error) {
        console.error("Error verifying OTP:", error);
        return { success: false, message: "An unexpected error occurred during verification." };
    }
}
