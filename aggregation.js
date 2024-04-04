const aggregation = () => {
    var group = new Map()
    var locationMap = new Map()

    window.data.forEach(item => {
        const { community, location } = item;
        const count = group.get(community) || 0;
        group.set(community, count+1)
        locationMap.set(community, location)
    })

    const datas = Array.from(group.entries()).map(([community, count]) => ({ community, count, location:locationMap.get(community) }))

    var csvContent = d3.csvFormat(datas);
    var blob = new Blob([csvContent], {type: "text/csv;charset=utf-8;"});
    var url = URL.createObjectURL(blob);
    var link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "aggregation.csv");
    link.click();
}

export default aggregation