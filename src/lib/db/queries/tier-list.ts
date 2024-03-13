import type { List } from '$lib/types';

export const getTierListById = async (id: string) => {
  try {
    const tierList = {
      id: id,
      title: 'Programming Languages',
      author: { name: 'John Doe' },
      tiers: [
        { name: 'S', color: '#e11d48', items: [] },
        { name: 'A', color: '#fb923c', items: [] },
        { name: 'B', color: '#eab308', items: [] },
        { name: 'C', color: '#bde635', items: [] },
        { name: 'D', color: '#a3e635', items: [] },
        { name: 'E', color: '#22c55e', items: [] },
        { name: 'F', color: '#10b981', items: [] }
      ],
      items: [
        { name: 'JS/TS' },
        { name: 'Python' },
        { name: 'Java' }
        // { name: 'C#' },
        // { name: 'C++' },
        // { name: 'PHP' },
        // { name: 'Ruby' },
        // { name: 'Swift' },
        // { name: 'Kotlin' },
        // { name: 'Dart' },
        // { name: 'Go' },
        // { name: 'Perl' },
        // { name: 'Scala' },
        // { name: 'Haskell' },
        // { name: 'Lua' },
        // { name: 'Erlang' },
        // { name: 'Clojure' },
        // { name: 'F#' },
        // { name: 'Elixir' },
        // { name: 'Rust' }
      ],
      createdAt: '2021-08-01T00:00:00.000Z'
    };

    return tierList;
  } catch (error) {
    console.error('[Q:getTierListById]', error);
    return null;
  }
};
