'use client';

import Link from 'next/link';

const placeholderArtworks = [
  { title: 'Sunset Dreams', status: 'Published', price: 1200 },
  { title: 'Abstract Flow', status: 'Draft', price: null },
  { title: 'Golden Hour', status: 'Published', price: 850 },
];

export default function MyArtworksPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">My Artworks</h2>
        <Link href="/dashboard/my-artworks/new" className="btn btn-primary btn-sm">
          Add New
        </Link>
      </div>

      {placeholderArtworks.length === 0 ? (
        <div className="text-center py-20 text-base-content/50">
          <p className="text-lg font-medium">No artworks yet</p>
          <p className="text-sm mt-1">Start by adding your first piece.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Artwork</th>
                <th>Status</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {placeholderArtworks.map((art, i) => (
                <tr key={i}>
                  <td className="font-medium">{art.title}</td>
                  <td>
                    <span className={`badge badge-sm ${art.status === 'Published' ? 'badge-success' : 'badge-ghost'}`}>
                      {art.status}
                    </span>
                  </td>
                  <td>{art.price ? `$${art.price.toLocaleString()}` : '—'}</td>
                  <td>
                    <div className="flex gap-2">
                      <button type="button" className="btn btn-ghost btn-xs">Edit</button>
                      <button type="button" className="btn btn-ghost btn-xs text-error">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
