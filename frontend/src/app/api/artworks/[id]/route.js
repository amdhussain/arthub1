import { promises as fs } from 'fs';
import path from 'path';

export async function GET(_, { params }) {
  try {
    const { id } = await params;

    const filePath = path.join(process.cwd(), 'public', 'data', 'artworks.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    const artworks = JSON.parse(fileContents);

    const artwork = artworks.find(
      (a) => String(a.id) === id || a.id === Number(id)
    );

    if (!artwork) {
      return Response.json({ error: 'Artwork not found' }, { status: 404 });
    }

    const mapped = {
      ...artwork,
      _id: String(artwork.id),
      image: artwork.imageUrl,
      artistName: artwork.artist,
      images: artwork.imageUrl ? [{ url: artwork.imageUrl }] : [],
      stock: artwork.stock != null ? artwork.stock : (artwork.isSold || artwork.availability === false ? 0 : 100),
    };

    return Response.json({ artwork: mapped });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();

    const filePath = path.join(process.cwd(), 'public', 'data', 'artworks.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    const artworks = JSON.parse(fileContents);

    const index = artworks.findIndex(
      (a) => String(a.id) === id || a.id === Number(id)
    );

    if (index === -1) {
      return Response.json({ error: 'Artwork not found' }, { status: 404 });
    }

    artworks[index] = { ...artworks[index], ...body };
    await fs.writeFile(filePath, JSON.stringify(artworks, null, 2), 'utf8');

    const mapped = {
      ...artworks[index],
      _id: String(artworks[index].id),
      image: artworks[index].imageUrl,
      artistName: artworks[index].artist,
      images: artworks[index].imageUrl ? [{ url: artworks[index].imageUrl }] : [],
      stock: artworks[index].stock != null ? artworks[index].stock : (artworks[index].isSold || artworks[index].availability === false ? 0 : 100),
    };

    return Response.json({ artwork: mapped });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(_, { params }) {
  try {
    const { id } = await params;

    const filePath = path.join(process.cwd(), 'public', 'data', 'artworks.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    const artworks = JSON.parse(fileContents);

    const index = artworks.findIndex(
      (a) => String(a.id) === id || a.id === Number(id)
    );

    if (index === -1) {
      return Response.json({ error: 'Artwork not found' }, { status: 404 });
    }

    artworks.splice(index, 1);
    await fs.writeFile(filePath, JSON.stringify(artworks, null, 2), 'utf8');

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
