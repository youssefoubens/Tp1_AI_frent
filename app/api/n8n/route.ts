import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch('https://benzaid.app.n8n.cloud/webhook/2e1dd36d-1458-4242-9462-0adfe5b12b1f', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Add any required headers here
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // Transform the response data if needed to match your frontend expectations
    const files = data.files || data; // Adjust based on actual response structure
    
    return NextResponse.json({ files });
  } catch (error) {
    return NextResponse.json(
      { 
        error: 'Failed to fetch documents',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}