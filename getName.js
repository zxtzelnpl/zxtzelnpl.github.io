const getName = async () => {
  try {
    const map = new Map();
    const data = await d3.csv("./data/HQYD.csv");
    data.forEach((row) => {
      const { blh, hzxm } = row;
      map.set(blh, hzxm);
    });
    console.log(map);

    window.data.forEach((item) => {
      item.name = map.get(item.id);
    });
  } catch (err) {}
};

export default getName;
