// import {NextApiResponse} from 'next';
// import Client from 'ssh2-sftp-client';
// import {NextResponse} from "next/server";

// async function uploadFileToServer(fileBuffer: ArrayBuffer, fileName: string, targetDir: string): Promise<void> {
//     const client = new Client();
//     const remoteFilePath = targetDir + fileName
//     try {
//         await client.connect({
//             host: process.env.SFTP_HOST as string, // Ensure these environment variables are set
//             port: +(process.env.SFTP_PORT ?? '252'),
//             username: process.env.SFTP_USER as string,
//             password: process.env.SFTP_PASS as string,
//         });
//         await client.put(Buffer.from(fileBuffer), remoteFilePath);
//         console.log(`File successfully uploaded to ${remoteFilePath}`);
//     } catch (err) {
//         console.error('Error uploading file:', err);
//         throw err;
//     } finally {
//         await client.end();
//     }
// }


// export async function POST(req: Request, res: NextApiResponse) {
//     if (req.method === 'POST') {
//         try {
//             const data = await req.json();
//
//             try {
//                 const {file, fileName, targetDir} = data;
//                 const encoder = new TextEncoder();
//                 const fileBuffer = encoder.encode(file);
//
//                 await uploadFileToServer(fileBuffer, fileName, targetDir);
//                 return NextResponse.json({message: 'File uploaded successfully'}, {status: 200});
//
//             } catch (error) {
//                 console.error('Error handling file upload:', error);
//                 return NextResponse.json({error: 'Failed to upload file'}, {status: 500});
//
//             }
//
//         } catch (err) {
//             return NextResponse.json({error: 'Error uploading file'}, {status: 500});
//
//         }
//     } else {
//         return NextResponse.json({message: 'Method not allowed'}, {status: 405});
//     }
// }

import { NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { Client } from 'node-scp';
import path from 'path';
import fs from 'fs';

async function uploadFileToServer(fileBuffer: ArrayBuffer, fileName: string, targetDir: string): Promise<void> {
    const localFilePath = path.join('/tmp', fileName);
    const remoteFilePath = path.join(targetDir, fileName);
    console.log('------------------->localFilePath',localFilePath)
    console.log('------------------->remoteFilePath',remoteFilePath)
    // Save the file buffer to a local temporary file
    fs.writeFileSync(localFilePath, Buffer.from(fileBuffer));

    const config = {
        host: process.env.SFTP_HOST as string,
        port: +(process.env.SFTP_PORT ?? '252'),
        username: process.env.SFTP_USER as string,
        password: process.env.SFTP_PASS as string,
    };

    const client = await Client({
        host: config.host,
        port: config.port,
        username: config.username,
        password: config.password,
    });

    try {
        await client.uploadFile(localFilePath, remoteFilePath);
        console.log(`File successfully uploaded to ${remoteFilePath}`);
    } catch (err) {
        console.error('Error uploading file:', err);
        throw err;
    } finally {
        client.close();
        // Delete the local temporary file after uploading
        fs.unlinkSync(localFilePath);
    }
}

export async function POST(req: Request, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const data = await req.json();

            const { file, fileName, targetDir } = data;
            const encoder = new TextEncoder();
            const fileBuffer = encoder.encode(file);

            await uploadFileToServer(fileBuffer, fileName, targetDir);
            return NextResponse.json({ message: 'File uploaded successfully' }, { status: 200 });

        } catch (error) {
            console.error('Error handling file upload:', error);
            return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
        }
    } else {
        return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
    }
}
