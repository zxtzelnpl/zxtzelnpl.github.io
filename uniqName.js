const uniqName = async () => {
  try {
    const names = new Set();
    const lastData = [];

    window.data.forEach((item) => {
      const { name } = item;
      if (names.has(name)) {
        return;
      } else {
        lastData.push(item);
        names.add(name);
      }
    });
    window.data = lastData;
  } catch (err) {}
};

export default uniqName;
