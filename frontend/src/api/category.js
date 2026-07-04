const categories = [
  {
    id: 'painting',
    name: 'Paintings',
    count: 234,
    image: '/categories/painting.jpg',
    gradient: 'from-rose-500/20 to-pink-500/10',
  },
  {
    id: 'sculpture',
    name: 'Sculptures',
    count: 89,
    image: '/categories/sculpture.jpg',
    gradient: 'from-amber-500/20 to-orange-500/10',
  },
  {
    id: 'photography',
    name: 'Photography',
    count: 156,
    image: '/categories/photography.jpg',
    gradient: 'from-sky-500/20 to-blue-500/10',
  },
  {
    id: 'digital',
    name: 'Digital Art',
    count: 312,
    image: '/categories/digital.jpg',
    gradient: 'from-violet-500/20 to-purple-500/10',
  },
  {
    id: 'printmaking',
    name: 'Printmaking',
    count: 67,
    image: '/categories/printmaking.jpg',
    gradient: 'from-emerald-500/20 to-teal-500/10',
  },
  {
    id: 'mixed-media',
    name: 'Mixed Media',
    count: 98,
    image: '/categories/mixed-media.jpg',
    gradient: 'from-cyan-500/20 to-indigo-500/10',
  },
];

export async function fetchCategories() {
  return categories;
}
