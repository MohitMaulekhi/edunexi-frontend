import type { AchievementMetadata } from '@/types/shared';

// This function simulates saving the data.
export async function saveAchievement(
  token: string,
  achievementData: AchievementMetadata,
  files?: File[]
): Promise<boolean> {
  try {
    console.log("Submitting achievement to a mock backend...");
    console.log("Token:", token ? "provided" : "not provided");
    console.log("Files to upload:", files?.map(f => f.name));
    console.log("Final Metadata:", JSON.stringify(achievementData, null, 2));

    // Simulate a network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log("Mock submission successful!");
    return true;

  } catch (error) {
    console.error('Failed to save achievement (mock):', error);
    return false;
  }
}

// This function now returns an empty array.
export const fetchMyAchievements = async (studentId: string) => {
  console.log(`Fetching mock achievements for student: ${studentId}`);
  return [];
};
