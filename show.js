
function show() {
    const data = window.data;
    var table = d3.select("body").append("table");
    var thead = table.append("thead");
    var tbody = table.append("tbody");
  
    thead
      .append("tr")
      .selectAll("th")
      .data(data.columns)
      .enter()
      .append("th")
      .text(function (d) {
        return d;
      });
  
    var rows = tbody.selectAll("tr").data(data).enter().append("tr");
  
    var cells = rows
      .selectAll("td")
      .data(function (row) {
        return data.columns.map(function (column) {
          return { column: column, value: row[column] };
        });
      })
      .enter()
      .append("td")
      .text(function (d) {
        return d.value;
      });
  }

  export default show