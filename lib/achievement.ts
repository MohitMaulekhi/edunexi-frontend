// Student data functions using axios
import axios from 'axios'
import { createIPFS } from './ipfs'

const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'

/// events functions
export async function saveAchievement(
  token: string, 
  achievementData: AchievementMetadata, 
  files?: File[]
): Promise<boolean> {
  try {
    // Step 1: Upload all supporting documents to IPFS if files are provided
    const attachmentResults = []
    
    if (files && files.length > 0) {
      for (const file of files) {
        const result = await createIPFS(
          file, 
          `${achievementData.title} - ${file.name}`
        )

        if (result.success && result.hash) {
          attachmentResults.push({
            fileName: file.name,
            fileSize: file.size,
            fileType: file.type,
            ipfsHash: result.hash,
            ipfsUrl: result.url!
          })
        } else {
          throw new Error(`Failed to upload ${file.name}: ${result.error}`)
        }
      }
    }

    // Step 2: Update achievement metadata with actual attachment data
    const updatedAchievementData = {
      ...achievementData,
      attachments: attachmentResults
    }

    // Step 3: Upload the complete achievement record to IPFS
    const achievementResult = await createIPFS(
      updatedAchievementData, 
      `Achievement Record - ${achievementData.title}`
    )

    if (!achievementResult.success || !achievementResult.hash) {
      throw new Error(`Failed to store achievement metadata on IPFS: ${achievementResult.error}`)
    }

    // Update blockchain data with the submission hash
    updatedAchievementData.blockchain.submissionHash = achievementResult.hash

    // Step 4: Save to Strapi
    const strapiData = {
      data: {
        
        
        category: updatedAchievementData.category || 'Other',
        
        score: updatedAchievementData.score || 0,
        authenticScore: updatedAchievementData.authentic_score || 0,
        studentId: updatedAchievementData.studentId,
        ipfsUrl: achievementResult?.url,
        ipfsHash: achievementResult?.hash,
      }
    }

    await axios.post(`${API_URL}/api/achievements`, strapiData, {
      headers: { Authorization: `Bearer ${token}` },
    })
    
    return true
  } catch (error) {
    console.error('Failed to save achievement:', error)
    return false
  }
}




export const fetchMyAchievements = async (studentId: string) => {
  try {
    const response = await axios.get(`${API_URL}/api/achievements?populate=*&sort=createdAt:desc&filters[studentId][$eq]=${studentId}`)
    return response.data.data
  } catch (error) {
    console.error('Failed to fetch achievements:', error)
    return []
  }
}
