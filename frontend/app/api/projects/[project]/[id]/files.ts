// app/api/projects/[project]/[id]/files.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import formidable, { File, Files } from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

// Helper: Normalize files to flat array of valid File objects
function extractValidFiles(files: Files): File[] {
  const allFiles: File[] = [];

  Object.values(files).forEach(fileEntry => {
    if (Array.isArray(fileEntry)) {
      fileEntry.forEach(f => {
        if (f && 'filepath' in f) allFiles.push(f);
      });
    } else if (fileEntry && 'filepath' in fileEntry) {
      allFiles.push(fileEntry);
    }
  });

  return allFiles;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const form = new formidable.IncomingForm();

  try {
    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error('Form parse error:', err);
        return res.status(500).json({ error: 'Error parsing files' });
      }

      const uploadedFiles = extractValidFiles(files).map(file => {
        const content = fs.readFileSync(file.filepath, 'utf-8');
        return {
          name: file.originalFilename || 'untitled',
          type: 'file',
          path: `/${file.originalFilename}`,
          content,
          size: file.size,
        };
      });

      return res.status(200).json({ files: uploadedFiles });
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
