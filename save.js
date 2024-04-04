function save() {
    var csvContent = d3.csvFormat(window.data);
    var blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    var url = URL.createObjectURL(blob);
    var link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "mydata2.csv");
    link.click();
  }

  export default save