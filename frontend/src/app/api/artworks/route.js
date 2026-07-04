import { promises as fs } from 'fs';
import path from 'path';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '12', 10);
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';
    const sort = searchParams.get('sort') || '';

    const filePath = path.join(process.cwd(), 'public', 'data', 'artworks.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    let artworks = JSON.parse(fileContents);

    if (search) {
      const q = search.toLowerCase();
      artworks = artworks.filter(
        (a) =>
          (a.title || '').toLowerCase().includes(q) ||
          (a.artist || '').toLowerCase().includes(q)
      );
    }

    if (category) {
      const categoryMap = {
        'paintings': 'Paintings',
        'sculptures': 'Sculptures',
        'photography': 'Photography',
        'digital-art': 'Digital Art',
        'digital': 'Digital Art',
        'printmaking': 'Printmaking',
        'mixed-media': 'Mixed Media',
        'painting': 'Paintings',
        'sculpture': 'Sculptures',
        'mixed media': 'Mixed Media',
        'digital art': 'Digital Art',
      };
      const mapped = categoryMap[category.toLowerCase()] || category;
      artworks = artworks.filter(
        (a) => (a.category || '').toLowerCase() === mapped.toLowerCase()
      );
    }

    if (sort === 'price_asc') {
      artworks.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (sort === 'price_desc') {
      artworks.sort((a, b) => (b.price || 0) - (a.price || 0));
    } else if (sort === 'newest') {
      artworks.sort((a, b) => (b.year || 0) - (a.year || 0));
    } else if (sort === 'oldest') {
      artworks.sort((a, b) => (a.year || 0) - (b.year || 0));
    } else if (sort === 'rating') {
      artworks.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    const total = artworks.length;
    const pages = Math.ceil(total / limit) || 1;
    const start = (page - 1) * limit;
    const paginated = artworks.slice(start, start + limit);

    const mapped = paginated.map((a) => ({
      ...a,
      _id: String(a.id),
      image: a.imageUrl,
      artistName: a.artist,
      images: a.imageUrl ? [{ url: a.imageUrl }] : [],
      stock: a.stock != null ? a.stock : (a.isSold || a.availability === false ? 0 : 100),
    }));

    return Response.json({ artworks: mapped, pages });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'artworks.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    const artworks = JSON.parse(fileContents);

    const body = await request.json();
    const newId =
      artworks.length > 0 ? Math.max(...artworks.map((a) => a.id)) + 1 : 1;
    const newArtwork = { id: newId, ...body };
    artworks.push(newArtwork);

    await fs.writeFile(filePath, JSON.stringify(artworks, null, 2), 'utf8');

    return Response.json({ insertedId: String(newId) }, { status: 201 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
