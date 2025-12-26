import ffmpeg from 'fluent-ffmpeg';
import path from 'path';
import fs from 'fs';

export const createVideo = async (audioPath: string, backgroundPath: string, outputPath: string) => {
    return new Promise((resolve, reject) => {
        // Ensure output directory exists
        if (!fs.existsSync(path.dirname(outputPath))) {
            fs.mkdirSync(path.dirname(outputPath), { recursive: true });
        }

        ffmpeg()
            .input(backgroundPath)
            .input(audioPath)
            .outputOptions([
                '-c:v libx264',
                '-tune stillimage',
                '-c:a aac',
                '-b:a 192k',
                '-pix_fmt yuv420p',
                '-shortest',
                '-vf scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920'
            ])
            .on('end', () => resolve(outputPath))
            .on('error', (err) => reject(err))
            .save(outputPath);
    });
};
