import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'artworks.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    const artworks = JSON.parse(fileContents);

    const featured = artworks.sort((a, b) => b.rating - a.rating).slice(0, 8);

    const mapped = featured.map((a) => ({
      ...a,
      _id: String(a.id),
      image: a.imageUrl,
      artistName: a.artist,
      images: a.imageUrl ? [{ url: a.imageUrl }] : [],
    }));

    return Response.json({ artworks: mapped });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
