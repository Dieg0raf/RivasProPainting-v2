import { NextResponse } from 'next/server';

export async function POST(request: Request) {

    const API_URL = process.env.API_URL;
    const API_KEY = process.env.API_SECRET_KEY;

    if (!API_URL || !API_KEY) {
        console.error('Missing environment variables:', { API_URL, API_KEY });
        return NextResponse.json(
            { error: 'Server configuration error' },
            { status: 500 }
        );
    }

    try {
        const values = await request.json();

        const response = await fetch(`${API_URL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${API_KEY}`,
            },
            body: JSON.stringify(values),
        });

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json(
            { error: error },
            { status: 500 }
        );
    }
}