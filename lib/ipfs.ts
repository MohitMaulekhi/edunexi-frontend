import { PinataSDK } from 'pinata-web3'
import axios from 'axios'

const PINATA_JWT = process.env.NEXT_PUBLIC_PINATA_JWT
const PINATA_GATEWAY_URL = process.env.NEXT_PUBLIC_PINATA_GATEWAY_URL || 'https://gateway.pinata.cloud'

if (!PINATA_JWT) {
  throw new Error('PINATA_JWT environment variable is required')
}

const pinata = new PinataSDK({
  pinataJwt: PINATA_JWT,
})

export interface IPFSUploadResponse {
  success: boolean
  hash?: string
  url?: string
  error?: string
}

export interface IPFSReadResponse {
  success: boolean
  data?: any
  error?: string
}

/**
 * Upload data to IPFS via Pinata
 * @param data - The data to upload (can be object, string, or File)
 * @param name - Optional name for the pinned content
 * @returns Promise with upload result containing hash and gateway URL
 */
export async function createIPFS(
  data: any, 
  name?: string
): Promise<IPFSUploadResponse> {
  try {
    let result

    if (data instanceof File) {
      // Upload file
      result = await pinata.upload.file(data).addMetadata({
        name: name || data.name,
      })
    } else {
      // Upload JSON data
      result = await pinata.upload.json(data).addMetadata({
        name: name || 'JSON Data',
      })
    }

    const gatewayUrl = `${PINATA_GATEWAY_URL}/ipfs/${result.IpfsHash}`

    return {
      success: true,
      hash: result.IpfsHash,
      url: gatewayUrl,
    }
  } catch (error: any) {
    console.error('IPFS upload failed:', error)
    return {
      success: false,
      error: error.message || 'Failed to upload to IPFS',
    }
  }
}

/**
 * Read data from IPFS via Pinata gateway
 * @param hash - The IPFS hash to retrieve
 * @returns Promise with the retrieved data
 */
export async function readIPFS(hash: string): Promise<IPFSReadResponse> {
  try {
    const url = `${PINATA_GATEWAY_URL}/ipfs/${hash}`
    const response = await axios.get(url, {
      timeout: 10000, // 10 second timeout
    })

    return {
      success: true,
      data: response.data,
    }
  } catch (error: any) {
    console.error('IPFS read failed:', error)
    return {
      success: false,
      error: error.response?.data?.message || error.message || 'Failed to read from IPFS',
    }
  }
}

/**
 * Upload multiple files to IPFS
 * @param files - Array of files to upload
 * @returns Promise with array of upload results
 */
export async function createMultipleIPFS(files: File[]): Promise<IPFSUploadResponse[]> {
  const promises = files.map(file => createIPFS(file))
  return Promise.all(promises)
}
