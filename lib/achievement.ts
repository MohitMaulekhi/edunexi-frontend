import axios from 'axios';
import { createIPFS } from './ipfs'; // Assuming this function exists and works
import type { AchievementMetadata } from '@/types/certificate';

const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

export async function saveAchievement(
  token: string,
  achievementData: AchievementMetadata,
  files?: File[]
): Promise<boolean> {
  try {
    // Step 1: Upload files to IPFS (your existing logic)
    const attachmentResults = [];
    if (files && files.length > 0) {
      for (const file of files) {
        const result = await createIPFS(file, `${achievementData.title} - ${file.name}`);
        if (result.success && result.hash) {
          attachmentResults.push({
            fileName: file.name,
            fileSize: file.size,
            fileType: file.type,
            ipfsHash: result.hash,
            ipfsUrl: result.url!,
          });
        } else {
          throw new Error(`Failed to upload ${file.name}: ${result.error}`);
        }
      }
    }

    // Step 2: Combine metadata with IPFS results
    const finalMetadata = { ...achievementData, attachments: attachmentResults };

    // Step 3: Upload final metadata to IPFS (your existing logic)
    const metadataResult = await createIPFS(finalMetadata, `Achievement Record - ${achievementData.title}`);
    if (!metadataResult.success || !metadataResult.hash) {
      throw new Error(`Failed to store metadata on IPFS: ${metadataResult.error}`);
    }

    // Step 4: Prepare and save data to Strapi, using the AI scores
    const strapiData = {
      data: {
        title: finalMetadata.title,
        description: finalMetadata.description,
        category: finalMetadata.category,
        date: finalMetadata.date,
        studentId: finalMetadata.studentId,
        // Use the AI-generated scores from the nested object
        score: finalMetadata.aiEvaluation.achievementScore,
        authenticScore: finalMetadata.aiEvaluation.authenticityScore,
        ipfsHash: metadataResult.hash,
        ipfsUrl: metadataResult.url!,
      }
    };

    await axios.post(`${API_URL}/api/achievements`, strapiData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    
    return true;
  } catch (error) {
    console.error('Failed to save achievement:', error);
    return false;
  }
}
