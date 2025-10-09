
'use server';

import { initializeFirebase } from '@/firebase';
import { getFirestore, collection, addDoc, query, where, getDocs, doc, deleteDoc, serverTimestamp, Timestamp } from 'firebase/firestore';

const OTP_EXPIRY_MINUTES = 5;

/**
 * Generates and stores an OTP in Firestore.
 * In a real app, this would also integrate with an email/SMS service.
 */
export async function sendOtp(contact: string): Promise<{ success: boolean; message: string }> {
    try {
        const { firestore } = initializeFirebase();
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiry = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);

        const otpsRef = collection(firestore, 'otps');
        
        await addDoc(otpsRef, {
            contact: contact,
            otp: otp,
            expiresAt: Timestamp.fromDate(expiry),
            createdAt: serverTimestamp()
        });

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
 * Verifies an OTP against the value stored in Firestore.
 */
export async function verifyOtp(contact: string, otp: string): Promise<{ success: boolean; message?: string }> {
    try {
        const { firestore } = initializeFirebase();
        const otpsRef = collection(firestore, 'otps');
        
        // Query for the OTP, ensuring it's for the right contact and hasn't expired.
        const q = query(
            otpsRef, 
            where("contact", "==", contact),
            where("otp", "==", otp),
            where("expiresAt", ">=", Timestamp.now())
        );

        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            // No valid, unexpired OTP found.
            return { success: false, message: "The OTP is incorrect or has expired. Please request a new one." };
        }

        // OTP is valid. Delete it to prevent reuse.
        const docToDelete = querySnapshot.docs[0];
        await deleteDoc(doc(firestore, 'otps', docToDelete.id));

        return { success: true };

    } catch (error) {
        console.error("Error verifying OTP:", error);
        return { success: false, message: "An unexpected error occurred during verification." };
    }
}
