const paint = async () => {
    const scene = new L7.Scene({
      id: 'map',
      map: new L7.GaodeMap({
        style: 'light',
        center: [121.428725,31.409305],
        zoom: 10,
        token: '95195ef7a7dbcea9e2ff74aa6a06d1b1'
      }),
    });
  
    scene.on('loaded', () => {
      const data = window.data.slice(0,22000).filter(row => row.location).map(row => {
        const ges = row.location.split(',')
        return {
          address: row.address,
          Longitude: ges[0],
          Latitude: ges[1],
          text: row.community
        }
      }) 
      const pointLayer = new L7.PointLayer({})
          .source(data, {
            parser: {
              type: 'json',
              x: 'Longitude',
              y: 'Latitude'
            }
          })
          .shape('circle')
          .size(5)
          .active(true)
          .color('red')
          .style({
            opacity: 0.02,
            strokeWidth: 0
          });
  
        scene.addLayer(pointLayer);

        const text = new L7.PointLayer({})
        .source(data, {
          parser: {
            type: 'json',
            x: 'Longitude',
            y: 'Latitude'
          }
        })
        .shape('community', 'text')
        .size(10)
        .color('#ffffff')
        .style({
            textAnchor: 'center', // 文本相对锚点的位置 center|left|right|top|bottom|top-left
            textOffset: [ 0, 0 ], // 文本相对锚点的偏移量 [水平, 垂直]
            spacing: 2, // 字符间距
            padding: [ 1, 1 ], // 文本包围盒 padding [水平，垂直]，影响碰撞检测结果，避免相邻文本靠的太近
            stroke: '#ffffff', // 描边颜色
            strokeWidth: 0.3, // 描边宽度
            strokeOpacity: 1.0,
            fontFamily: 'Times New Roman',
            textAllowOverlap: true
          });

      scene.addLayer(text);
    })
  }

  export default paint