const getDatas = async () => {
  try {
    const data = await d3.csv("./data/origin.csv");
    window.data = data;
    let hasLocation = 0;
    let hasNoLocation = 0;
    data.forEach((row) => {
      if (row.location) {
        hasLocation++;
      } else {
        hasNoLocation++;
      }
    });
    console.log(`hasLocation${hasLocation}`);
    console.log(`hasNoLocation${hasNoLocation}`);
  } catch (err) {
    console.log(err);
  }
};

export default getDatas;
