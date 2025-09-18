interface AttachmentWithHash {
  file: File
  hash?: string
  url?: string
  uploading?: boolean
  error?: string
}

interface AchievementMetadata {
  title: string
  description: string
  category: string
  date: string
  score: number
  authentic_score: number
  studentId: string
  studentName: string
  studentEmail: string
  submissionTimestamp: string
  attachments: Array<{
    fileName: string
    fileSize: number
    fileType: string
    ipfsHash: string
    ipfsUrl: string
  }>
  blockchain: {
    network: "IPFS"
    timestamp: string
    submissionHash: string
  }
}