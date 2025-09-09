import { NextRequest, NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { r2Client, bucketName, generateUniqueFileName } from "@/lib/storage";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // 验证文件大小（默认最大 50MB）
    const maxSize = 50 * 1024 * 1024; // 50MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: `File size exceeds ${maxSize / (1024 * 1024)}MB limit` },
        { status: 400 }
      );
    }

    // 获取文件的字节数组
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 生成唯一文件名
    const uniqueFileName = generateUniqueFileName(file.name);

    try {
      // 上传到 R2
      const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: uniqueFileName,
        Body: buffer,
        ContentType: file.type,
      });

      await r2Client.send(command);

      // 返回文件URL
      const fileUrl = `${process.env.STORAGE_DOMAIN}/${uniqueFileName}`;

      return NextResponse.json({
        url: fileUrl,
        filename: uniqueFileName,
      });
    } catch (uploadError: any) {
      console.error("R2 upload error:", uploadError);

      if (uploadError.name === "InvalidBucketName") {
        return NextResponse.json(
          {
            error:
              "Invalid bucket configuration. Please check your R2 settings.",
          },
          { status: 500 }
        );
      }

      if (uploadError.name === "NoSuchBucket") {
        return NextResponse.json(
          { error: "Bucket does not exist. Please check your R2 settings." },
          { status: 500 }
        );
      }

      return NextResponse.json(
        { error: "Error uploading to R2: " + uploadError.message },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Error processing upload: " + error.message },
      { status: 500 }
    );
  }
}
