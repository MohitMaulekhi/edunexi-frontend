// File: app/api/evaluate/route.ts

import { NextResponse } from 'next/server';
import { evaluateCertificateFile } from '@/lib/evaluation';
import type { EvaluationResult } from '@/types/certificate';

type ErrorResponse = { error: string };

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const certificateFile = formData.get('certificateFile') as File | null;
    const isVerifiedByFaculty = formData.get('isVerifiedByFaculty') === 'true';

    if (!certificateFile) {
      return NextResponse.json({ error: 'Certificate file is required.' }, { status: 400 });
    }

    // Convert the file to a Buffer
    const fileBuffer = Buffer.from(await certificateFile.arrayBuffer());

    const result = await evaluateCertificateFile({
      fileBuffer: fileBuffer,
      mimetype: certificateFile.type,
      isVerifiedByFaculty: isVerifiedByFaculty,
      apiKey: process.env.GEMINI_API_KEY!,
    });
    
    return NextResponse.json(result as EvaluationResult, { status: 200 });

  } catch (error) {
    console.error("Error in /api/evaluate route:", error);
    return NextResponse.json({ error: "Failed to evaluate the certificate." } as ErrorResponse, { status: 500 });
  }
}
