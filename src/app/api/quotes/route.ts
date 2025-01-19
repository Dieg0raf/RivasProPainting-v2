import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const values = await request.json();

        const response = await fetch(`${process.env.API_URL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${process.env.API_SECRET_KEY}`,
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