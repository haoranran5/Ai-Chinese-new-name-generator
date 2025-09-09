import { S3Client } from "@aws-sdk/client-s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";

if (!process.env.STORAGE_BUCKET) {
  throw new Error("STORAGE_BUCKET environment variable is required");
}

if (!process.env.STORAGE_ENDPOINT) {
  throw new Error("STORAGE_ENDPOINT environment variable is required");
}

if (!process.env.STORAGE_ACCESS_KEY || !process.env.STORAGE_SECRET_KEY) {
  throw new Error(
    "STORAGE_ACCESS_KEY and STORAGE_SECRET_KEY environment variables are required"
  );
}

// 验证 bucket 名称格式
const bucketName = process.env.STORAGE_BUCKET;
if (!/^[a-z0-9][a-z0-9.-]*[a-z0-9]$/.test(bucketName)) {
  throw new Error(
    "Invalid bucket name. Bucket names must be between 3 and 63 characters long, " +
      "and can contain only lowercase letters, numbers, hyphens, and periods. " +
      "They must begin and end with a letter or number."
  );
}

export const storageDomain =
  process.env.STORAGE_DOMAIN || process.env.STORAGE_ENDPOINT;
export { bucketName };

// 生成唯一的文件名
export const generateUniqueFileName = (originalName: string) => {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 8);
  const extension = originalName.split(".").pop();
  return `${timestamp}-${randomString}.${extension}`;
};

// 创建 S3 客户端
export const r2Client = new S3Client({
  region: process.env.STORAGE_REGION || "auto",
  endpoint: process.env.STORAGE_ENDPOINT,
  credentials: {
    accessKeyId: process.env.STORAGE_ACCESS_KEY,
    secretAccessKey: process.env.STORAGE_SECRET_KEY,
  },
});

// 上传图片到存储的函数
export async function uploadFile(
  body: Buffer,
  key: string, 
  ContentType: string,
  disposition: string = "inline",
): Promise<string> {
  try {
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      Body: body,
      ContentType: ContentType,
      ContentDisposition: disposition,
    });

    await r2Client.send(command);

    // 返回文件URL
    const fileUrl = `${process.env.STORAGE_DOMAIN}/${key}`;
    console.log("upload file success:", fileUrl);
    return fileUrl;
  } catch (err) {
    console.log("upload file failed:", err);
    throw new Error("upload file failed");
  }
}
