import {NextApiResponse} from 'next';
import {NextResponse} from "next/server";



export async function POST(req: Request, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const data = await req.json();

            try {
                const {file, fileName, targetDir} = data;
                const encoder = new TextEncoder();
                const fileBuffer = encoder.encode(file);

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