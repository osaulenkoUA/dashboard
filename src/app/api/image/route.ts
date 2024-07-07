import {NextApiResponse} from 'next';
import Client from 'ssh2-sftp-client';
import {NextResponse} from "next/server";

export const dynamic = 'auto'
export const dynamicParams = true
export const revalidate = false
export const fetchCache = 'auto'
export const runtime = 'nodejs'
export const preferredRegion = 'auto'


async function uploadFileToServer(fileBuffer: ArrayBuffer, fileName: string, targetDir: string): Promise<void> {
    const client = new Client();
    const remoteFilePath = targetDir + fileName
    try {
        await client.connect({
            host: process.env.SFTP_HOST as string, // Ensure these environment variables are set
            port: +(process.env.SFTP_PORT ?? '252'),
            username: process.env.SFTP_USER as string,
            password: process.env.SFTP_PASS as string,
        });
        await client.put(Buffer.from(fileBuffer), remoteFilePath);
        console.log(`File successfully uploaded to ${remoteFilePath}`);
    } catch (err) {
        console.error('Error uploading file:', err);
        throw err;
    } finally {
        await client.end();
    }
}


export async function POST(req: Request, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const data = await req.json();

            try {
                const {file, fileName, targetDir} = data;
                const encoder = new TextEncoder();
                const fileBuffer = encoder.encode(file);

                await uploadFileToServer(fileBuffer, fileName, targetDir);
                return NextResponse.json({message: 'File uploaded successfully'}, {status: 200});

            } catch (error) {
                console.error('Error handling file upload:', error);
                return NextResponse.json({error: 'Failed to upload file'}, {status: 500});

            }

        } catch (err) {
            return NextResponse.json({error: 'Error uploading file'}, {status: 500});

        }
    } else {
        return NextResponse.json({message: 'Method not allowed'}, {status: 405});
    }
}