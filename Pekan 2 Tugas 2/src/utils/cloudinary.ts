import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dltyn12ut',
  api_key: process.env.CLOUDINARY_API_KEY || '597338953475147',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'QM8Ix5fgFzMjRIpwAHpdob8oCvs',
});

export const uploadSingleFile = (file: Express.Multer.File): Promise<any> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream((error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
    Readable.from(file.buffer).pipe(uploadStream);
  });
};

export const uploadMultipleFiles = (files: Express.Multer.File[]): Promise<any[]> => {
  return Promise.all(files.map(uploadSingleFile));
};
