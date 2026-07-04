import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'artworks.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    const artworks = JSON.parse(fileContents);

    const artistMap = new Map();
    artworks.forEach((a) => {
      if (a.artist && !artistMap.has(a.artist)) {
        artistMap.set(a.artist, {
          _id: a.artist.toLowerCase().replace(/\s+/g, '-'),
          id: a.artist.toLowerCase().replace(/\s+/g, '-'),
          name: a.artist,
          specialty: a.category || 'Artist',
          artworkCount: 0,
        });
      }
      if (artistMap.has(a.artist)) {
        artistMap.get(a.artist).artworkCount++;
      }
    });

    const artists = Array.from(artistMap.values()).sort(
      (a, b) => b.artworkCount - a.artworkCount
    );

    return Response.json({ artists });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
