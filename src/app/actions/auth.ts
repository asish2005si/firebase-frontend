
'use server';

import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function registerUser(data: any) {
    try {
        const users = (await db.read('users')) || [];
        
        const existingUser = users.find((u: any) => u.username.toLowerCase() === data.username.toLowerCase());
        if (existingUser) {
            return { success: false, message: 'Username already exists.' };
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);
        
        users.push({
            accountNumber: data.accountNumber,
            username: data.username,
            password: hashedPassword,
            email: data.mobileOrEmail, // Assuming mobileOrEmail can be an email
        });

        await db.write('users', users);
        return { success: true, message: 'Registration successful!' };
    } catch (error) {
        console.error('Registration error:', error);
        return { success: false, message: 'An unexpected error occurred.' };
    }
}

export async function loginUser(data: any) {
    try {
        const users = (await db.read('users')) || [];
        
        const user = users.find((u: any) => u.username.toLowerCase() === data.username.toLowerCase());

        if (!user) {
            return { success: false, message: 'Invalid username or password.' };
        }

        const isPasswordValid = await bcrypt.compare(data.password, user.password);

        if (!isPasswordValid) {
            return { success: false, message: 'Invalid username or password.' };
        }

        // In a real app, you would create a session/token here
        // For OTP, we return success and the user's email (or other contact info)
        return { success: true, message: 'Login successful! OTP required.', email: user.email };
    } catch (error) {
        console.error('Login error:', error);
        return { success: false, message: 'An unexpected error occurred.' };
    }
}

export async function loginAdmin(data: any) {
    try {
        const admins = (await db.read('admins')) || [];
        
        const admin = admins.find((a: any) => a.username.toLowerCase() === data.username.toLowerCase());

        if (!admin) {
            return { success: false, message: 'Invalid admin username or password.' };
        }

        // For this prototype, we'll assume admin passwords are not hashed. 
        // In a real app, always hash passwords.
        if (data.password !== admin.password) {
            return { success: false, message: 'Invalid admin username or password.' };
        }

        return { success: true, message: 'Admin login successful!' };
    } catch (error) {
        console.error('Admin login error:', error);
        return { success: false, message: 'An unexpected error occurred.' };
    }
}


export async function checkAccount(accountNumber: string) {
    const users = await db.read('users');
    // In a real app, you'd check a proper customer database.
    // For this prototype, let's just make sure there's no user with this account number yet.
    const existing = users?.find((u:any) => u.accountNumber === accountNumber);
    return !existing;
}
