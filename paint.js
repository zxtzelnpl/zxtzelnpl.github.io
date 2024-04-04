const paint = async () => {
  const scene = new L7.Scene({
    id: "map",
    map: new L7.GaodeMap({
      mapStyle: "amap://styles/850255e969fdfb52d342d666e4bddade",
      center: [121.428725, 31.409305],
      // zoom: 15,
      // zooms: [ 10, 20 ],
      token: "95195ef7a7dbcea9e2ff74aa6a06d1b1",
    }),
  });

  scene.on("loaded", () => {
    const data = window.data
      .filter((row) => row.location)
      .map((row) => {
        const ges = row.location.split(",");
        return {
          address: row.address,
          Longitude: ges[0],
          Latitude: ges[1],
        };
      });

    const aggregations = window.aggregations
      .filter((row) => row.location)
      .map((row) => {
        const ges = row.location.split(",");
        return {
          address: row.address,
          Longitude: ges[0],
          Latitude: ges[1],
          community: row.community,
          count: row.count,
        };
      });
    const pointLayer = new L7.PointLayer({})
      .source(data, {
        parser: {
          type: "json",
          x: "Longitude",
          y: "Latitude",
        },
      })
      .shape("circle")
      .size(5)
      .active(true)
      .color("red")
      .style({
        opacity: 0.02,
        strokeWidth: 0,
      });

    scene.addLayer(pointLayer);

    const dataSource = new L7.Source(aggregations, {
      parser: {
        type: "json",
        x: "Longitude",
        y: "Latitude",
        count: "count",
        community: "community",
      },
    });
    const textBg = new L7.PointLayer({})
      .source(dataSource)
      .shape("circle")
      .scale("count", {
        type: "quantile",
      })
      .size("count", [10, 15, 20, 25, 30])
      .color("#ffffff")
      .style({
        strokeWidth: 1,
        stroke: "rgb(73,167,86)",
        opacity: 0.5,
      });
    scene.addLayer(textBg);

    const text = new L7.PointLayer({})
      .source(dataSource)
      .shape("community", "text")
      .size(14)
      .color("rgb(73,167,86)")
      .style({
        color: "rgb(73,167,86)",
        textAnchor: "center", // 文本相对锚点的位置 center|left|right|top|bottom|top-left
        textOffset: [0, 14], // 文本相对锚点的偏移量 [水平, 垂直]
        spacing: 2, // 字符间距
        // padding: [ 1, 1 ], // 文本包围盒 padding [水平，垂直]，影响碰撞检测结果，避免相邻文本靠的太近
        // stroke: 'rgb(73,167,86)', // 描边颜色
        // strokeWidth: 0.3, // 描边宽度
        // strokeOpacity: 1.0,
        fontFamily: "Times New Roman",
        textAllowOverlap: true,
      });

    scene.addLayer(text);

    const text1 = new L7.PointLayer({})
      .source(dataSource)
      .shape("count", "text")
      .size(14)
      .color("rgb(73,167,86)")
      .style({
        color: "rgb(73,167,86)",
        textAnchor: "center", // 文本相对锚点的位置 center|left|right|top|bottom|top-left
        textOffset: [0, -14], // 文本相对锚点的偏移量 [水平, 垂直]
        spacing: 2, // 字符间距
        // padding: [ 1, 1 ], // 文本包围盒 padding [水平，垂直]，影响碰撞检测结果，避免相邻文本靠的太近
        // stroke: 'rgb(73,167,86)', // 描边颜色
        // strokeWidth: 1, // 描边宽度
        // strokeOpacity: 1.0,
        fontFamily: "Times New Roman",
        textAllowOverlap: true,
      });

    scene.addLayer(text1);
  });
};

export default paint;
