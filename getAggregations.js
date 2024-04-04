const getAggregations = async () => {
  try {
    const aggregations = await d3.csv("./data/aggregation.csv");
    window.aggregations = aggregations;
  } catch (err) {
    console.log(err);
  }
};

export default getAggregations;
