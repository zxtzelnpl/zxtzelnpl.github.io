const samePoint = () => {
  const map = new Map();
  window.data.forEach((row) => {
    const { location, community } = row;
    const set = map.get(location) || new Set();
    set.add(community);
    map.set(location, set);
  });
  console.log(map);
  const entries = Array.from(map.entries()).filter(([, c]) => c.size > 1);

  const newMap = new Map(entries);
  console.log(newMap);
};

export default samePoint;
