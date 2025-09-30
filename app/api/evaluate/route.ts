import { NextResponse } from 'next/server';
import { evaluateCertificateFile } from '@/lib/evaluation';
import type { EvaluationResult } from '@/types/shared';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const certificateFile = formData.get('certificateFile') as File | null;
    const isVerifiedByFaculty = formData.get('isVerifiedByFaculty') === 'true';

    if (!certificateFile) {
      return NextResponse.json({ error: 'Certificate file is required.' }, { status: 400 });
    }

    const fileBuffer = Buffer.from(await certificateFile.arrayBuffer());

    const result = await evaluateCertificateFile({
      fileBuffer: fileBuffer,
      mimetype: certificateFile.type,
      isVerifiedByFaculty: isVerifiedByFaculty,
      apiKey: process.env.GEMINI_API_KEY!,
    });
    
    return NextResponse.json(result as EvaluationResult, { status: 200 });

  } catch (error: any) {
    console.error("Error in /api/evaluate route:", error);
    return NextResponse.json({ error: error.message || "Failed to evaluate the certificate." }, { status: 500 });
  }
}
