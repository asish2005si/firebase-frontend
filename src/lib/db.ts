
import fs from 'fs/promises';
import path from 'path';

// The 'database' is a simple JSON file in the `src/lib/data` directory.
// This is a basic implementation for prototyping purposes.
// In a real-world scenario, you would use a proper database like PostgreSQL, MySQL, or a service like Firestore.

const dataDir = path.join(process.cwd(), 'src', 'lib', 'data');

async function read(fileName: string): Promise<any | null> {
    const filePath = path.join(dataDir, `${fileName}.json`);
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (error: any) {
        if (error.code === 'ENOENT') {
            console.warn(`Data file not found: ${fileName}.json. Returning null.`);
            return null; // File doesn't exist
        }
        console.error(`Error reading from db file ${fileName}.json:`, error);
        throw new Error('Could not read from database.');
    }
}

async function write(fileName: string, data: any): Promise<void> {
    const filePath = path.join(dataDir, `${fileName}.json`);
    try {
        // Ensure the directory exists
        await fs.mkdir(dataDir, { recursive: true });
        // Write the file
        await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
    } catch (error) {
        console.error(`Error writing to db file ${fileName}.json:`, error);
        throw new Error('Could not write to database.');
    }
}

export const db = {
    read,
    write,
};
