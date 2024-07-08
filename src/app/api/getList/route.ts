import {NextResponse} from "next/server";
let Client = require('ssh2-sftp-client');

async function getlistFilesFromServer(): Promise<Array<any>> {
    const sftp = new Client();
    try {
        await sftp.connect({
            host: process.env.SFTP_HOST as string, // Ensure these environment variables are set
            port: +(process.env.SFTP_PORT ?? '252'),
            username: process.env.SFTP_USER as string,
            password: process.env.SFTP_PASS as string,
        });
        console.log(`Files successfully received`);
        return await sftp.list('/home/alex/web');
    } catch (err) {
        console.error('Error getting files list', err);
        throw err;
    } finally {
        await sftp.end();
    }
}


export async function GET() {
    try {
        const list = await getlistFilesFromServer();
        return NextResponse.json({message: 'File uploaded successfully', data: 'list'}, {status: 200});

    } catch (err) {
        return NextResponse.json({error: 'Error getting list'}, {status: 500});

    }


}