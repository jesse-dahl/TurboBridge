import {env} from '@bb/env'
import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabaseClient = createClient(env.SUPABASE_URL, env.SUPABASE_API_KEY)

export interface StorageError {
  name: string
  message: string
  stack?: string
  status?: number
}

export interface FileObject {
  name: string
  bucket_id: string
  owner: string
  id: string
  updated_at: string
  created_at: string
  last_accessed_at: string
  metadata: Record<string, any>
  buckets: Bucket
}

export interface Bucket {
  id: string
  name: string
  owner: string
  file_size_limit?: number
  allowed_mime_types?: string[]
  created_at: string
  updated_at: string
  public: boolean
}

export type SupabaseClientStorageBucketStruct = { data: Bucket; error: null; } | { data: null; error: StorageError; }
export type SupabaseClientStorageBucketReturn = { data: Bucket | null, error: StorageError | null }
export type SupabaseClientStorageBucketArrayReturn = { data: Bucket[] | null, error: StorageError | null }
export type SupabaseClientStorageMessageReturn = { data: { message: string } | null, error: StorageError | null }
export type SupabaseClientStoragePathReturn = { data: { path: string } | null, error: StorageError | null }
export type SupabaseClientStorageBlobReturn = { data: Blob | null, error: StorageError | null }
export type SupabaseClientStorageFileObjectReturn = { data: FileObject | FileObject[] | null, error: StorageError | null }

const toErrorMessage = (error: StorageError): StorageError => {
  return ({
    message: error.message,
    name: error.name,
    status: error?.status,
  })
}

export const createStorageBucket = async (
  bucketName: string,
  isBucketPublic: boolean = false,
  allowedMimeTypes: string[] = ['image/png'],
  fileSizeLimit: number = 1024
  ): Promise<Pick<Bucket, "name"> | StorageError> => {
  const { data, error } = await supabaseClient
    .storage
    .createBucket(bucketName, {
      public: isBucketPublic,
      allowedMimeTypes,
      fileSizeLimit
    })
  console.log({bucketName})
  if (error) {
    return toErrorMessage(error)
  }
  return data
}

export const retrieveStorageBucket = async (bucketName: string): Promise<SupabaseClientStorageBucketReturn> => {
  const { data, error } : SupabaseClientStorageBucketStruct = await supabaseClient
  .storage
  .getBucket(bucketName)

  return ({
    error: error ? toErrorMessage(error) : null,
    data: data ?? null
  })
  // if (error) {
  //   return toErrorMessage(error)
  // }
  // console.log({data})
  // return data
}

export const listAllStorageBuckets = async (): Promise<SupabaseClientStorageBucketArrayReturn> => {
  const { data, error } = await supabaseClient
  .storage
  .listBuckets()

  return ({
    error: error ? toErrorMessage(error) : null,
    data: data ?? null
  })
}

export const updateStorageBucket = async (
  bucketName: string,
  isBucketPublic: boolean = false,
  allowedMimeTypes: string[] = ['image/png'],
  fileSizeLimit: number = 1024
  ): Promise<SupabaseClientStorageMessageReturn> => {
  const { data, error } = await supabaseClient
    .storage
    .updateBucket(bucketName, {
      public: isBucketPublic,
      allowedMimeTypes,
      fileSizeLimit
    })

  return ({
    error: error ? toErrorMessage(error) : null,
    data: data ?? null
  })
}

export const deleteStorageBucket = async (bucketName: string): Promise<SupabaseClientStorageMessageReturn> => {
  const { data, error } = await supabaseClient
  .storage
  .deleteBucket(bucketName)

  return ({
    error: error ? toErrorMessage(error) : null,
    data: data ?? null
  })
}

export const emptyStorageBucket = async (bucketName: string): Promise<SupabaseClientStorageMessageReturn> => {
  const { data, error } = await supabaseClient
  .storage
  .emptyBucket(bucketName)

  return ({
    error: error ? toErrorMessage(error) : null,
    data: data ?? null
  })
}

export const uploadFileToStorageBucket = async (
  bucketName: string,
  path: string,
  fileBody: any,
  cacheControl: string = '3600',
  upsert: boolean = false
  ): Promise<SupabaseClientStoragePathReturn> => {
  const { data, error } = await supabaseClient
  .storage
  .from(bucketName)
  .upload(path, fileBody, {
    cacheControl,
    upsert
  })

  return ({
    error: error ? toErrorMessage(error) : null,
    data: data ?? null
  })
}

export const downloadFileFromStorageBucket = async (bucketName: string, path: string): Promise<SupabaseClientStorageBlobReturn> => {
  const { data, error } = await supabaseClient
  .storage
  .from(bucketName)
  .download(path)

  return ({
    error: error ? toErrorMessage(error) : null,
    data: data ?? null
  })
}

export const listAllFilesInStorageBucket = async (
  bucketName: string,
  folderName: string,
  limit: number = 100,
  offset: number = 0,
  sortBy: { column: string, order: 'asc' | 'desc' }
): Promise<SupabaseClientStorageFileObjectReturn> => {
  const { data, error } = await supabaseClient
  .storage
  .from(bucketName)
  .list(folderName, {
    limit,
    offset,
    sortBy: { column: 'name', order: 'asc' },
  })

  return ({
    error: error ? toErrorMessage(error) : null,
    data: data ?? null
  })
}

export const replaceFileInStorageBucket = async (
  bucketName: string,
  path: string,
  fileBody: any,
  cacheControl: string = '3600',
  upsert: boolean = true
): Promise<SupabaseClientStoragePathReturn> => {
  const { data, error } = await supabaseClient
  .storage
  .from(bucketName)
  .update(path, fileBody, {
    cacheControl,
    upsert
  })

  return ({
    error: error ? toErrorMessage(error) : null,
    data: data ?? null
  })
}

export const deleteFilesFromStorageBucket = async (
  bucketName: string,
  filePaths: string[] // array of paths to file (ex. ['folder/avatar1.png'])
): Promise<SupabaseClientStorageFileObjectReturn> => {
  const { data, error } = await supabaseClient
  .storage
  .from(bucketName)
  .remove(filePaths)

  return ({
    error: error ? toErrorMessage(error) : null,
    data: data ?? null
  })
}