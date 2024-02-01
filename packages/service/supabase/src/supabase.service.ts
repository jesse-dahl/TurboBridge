import { SupabaseClientStorageBucketReturn, createStorageBucket, retrieveStorageBucket, uploadFileToStorageBucket } from "@bb/supabase-client"

export const checkBucketExists = async (bucketName: string) => {
  const bucket = await retrieveStorageBucket(bucketName)
  console.log({bucket})

  return bucket
}

export const upsertUserStorageBucket = async (bucketName: string) => {
  const bucket: SupabaseClientStorageBucketReturn= await retrieveStorageBucket(bucketName)
  if (bucket?.error) {
    if (bucket.error.status === 400) {
      const newBucket = await createStorageBucket(bucketName)
      console.log({newBucket})
      return newBucket
    }
  }
  return bucket
}

export const createUserStorageBucket = async (bucketName: string) => {
  const newBucket = await createStorageBucket(bucketName)
  return newBucket
}

export const uploadFileToBucket = async (bucketName: string, filePath: string, fileBody: File) => {
  const fileUpload = await uploadFileToStorageBucket(bucketName, filePath, fileBody)
  return fileUpload
}

export const listAllFilesInStorageBucket = async (bucketName: string)