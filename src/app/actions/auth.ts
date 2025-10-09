
'use server';

import { initializeFirebase } from '@/firebase';
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    signInAnonymously 
} from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

export async function registerUser(data: any) {
    try {
        const { auth, firestore } = initializeFirebase();
        const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
        const user = userCredential.user;

        await setDoc(doc(firestore, "users", user.uid), {
            uid: user.uid,
            email: user.email,
            username: data.username,
            accountNumber: data.accountNumber,
            role: "customer", // Assign default role
            createdAt: new Date().toISOString(),
        });

        return { success: true, message: 'Registration successful!' };
    } catch (error: any) {
        console.error('Registration error:', error);
        return { success: false, message: error.message || 'An unexpected error occurred.' };
    }
}

export async function loginUser(data: any) {
    try {
        const { auth } = initializeFirebase();
        await signInWithEmailAndPassword(auth, data.email, data.password);
        
        return { success: true, message: 'Login successful!' };
    } catch (error: any) {
        console.error('Login error:', error);
        return { success: false, message: error.message || 'An unexpected error occurred.' };
    }
}

export async function loginAdmin(data: any) {
    try {
        const { auth, firestore } = initializeFirebase();
        const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
        const user = userCredential.user;

        const userDocRef = doc(firestore, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists() && userDoc.data().role === 'admin') {
            return { success: true, message: 'Admin login successful!' };
        } else {
            await auth.signOut();
            return { success: false, message: 'You are not authorized to access the admin panel.' };
        }
    } catch (error: any) {
        console.error('Admin login error:', error);
        return { success: false, message: 'Invalid admin credentials or unauthorized.' };
    }
}

export async function checkAccount(accountNumber: string) {
    // This function now can be used to check against firestore if needed.
    // For now, we assume email/username is the unique identifier.
    return true;
}

export async function signInAsGuest() {
    try {
        const { auth } = initializeFirebase();
        await signInAnonymously(auth);
        return { success: true, message: "Signed in as guest." };
    } catch (error: any) {
        console.error("Anonymous sign-in error:", error);
        return { success: false, message: "Could not sign in as a guest." };
    }
}
