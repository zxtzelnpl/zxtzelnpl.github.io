import paint from "./paint.js"
const key0 = '9648019843367b96a755c997fef43b7f'
const key1 = 'c2b9a348d62421fa046573fb1bebb927'

// //restapi.amap.com/v3/geocode/geo?key=9648019843367b96a755c997fef43b7f&address=月浦镇庆安路51弄1-1201&city=上海
const getGeo = ({ address, city}) => `//restapi.amap.com/v3/geocode/geo?key=${key0}&address=${address.trim()}&city=${city}`

const fun = async () => {
  try {
    const data = await d3.csv("./data/origin.csv")
    window.data = data
    let hasLocation = 0;
    let hasNoLocation = 0;
    data.forEach(row => {
      if(row.location) {
        hasLocation++
      } else {
        hasNoLocation++
      }
    })
    console.log(`hasLocation${hasLocation}`)
    console.log(`hasNoLocation${hasNoLocation}`)
  } catch(err) {
    console.log(err)
  }
}

fun()

let index = 0;
async function go() {
  try {
    console.log('show',window.data)
    const data = window.data.slice(0, 22000);

    for(const item of data) {
      const { address, city, location, community } = item;
      if(location && !community) {
        const url = getGeo({ address, city })
        const res = await fetch(url)
        if(res.ok) {
          const body = await res.json()
          const info =  _.get(body, 'info')
          if(info === 'OK') {
            const location = _.get(body, 'geocodes.[0].location')
            const street = _.get(body, 'geocodes.[0].street')
            item.location = location
            if(street && typeof street === 'string' && !item.community) {
              item.community = street
              console.log('street', street)
            }
            index++
          }
        }
      }
      continue

    }
    console.log('down')
    console.log(index)
  } catch(err) {
    console.log(err)
  }
}

const btn = document.createElement('button')
btn.innerHTML = '请求'
btn.onclick=go
document.body.append(btn)

function save() {
  var csvContent = d3.csvFormat(window.data);
  var blob = new Blob([csvContent], {type: "text/csv;charset=utf-8;"});
  var url = URL.createObjectURL(blob);
  var link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", "mydata2.csv");
  link.click();
}

const btn1 = document.createElement('button')
btn1.innerHTML = '下载'
btn1.onclick=save
document.body.append(btn1)



function clear() {

  const keys = Array.from(map.keys())
  window.data.forEach(item => {
    const { community } = item
    const key = keys.find(key => community.includes(key))
    if(key) {
      console.log(item.community)
      item.community = community.replace(key, map.get(key))
    }
  })


}

const btn2 = document.createElement('button')
btn2.innerHTML = '清除'
btn2.onclick=clear
document.body.append(btn2)

function show() {
  const data = window.data;
  var table = d3.select("body").append("table");
  var thead = table.append("thead");
  var tbody = table.append("tbody");

  thead.append("tr")
    .selectAll("th")
    .data(data.columns)
    .enter()
    .append("th")
    .text(function(d) { return d; });

  var rows = tbody.selectAll("tr")
    .data(data)
    .enter()
    .append("tr");

  var cells = rows.selectAll("td")
    .data(function(row) {
      return data.columns.map(function(column) {
        return { column: column, value: row[column] };
      });
    })
    .enter()
    .append("td")
    .text(function(d) { return d.value; });
}
const btn3 = document.createElement('button')
btn3.innerHTML = '展现'
btn3.onclick=show
document.body.append(btn3)



const btn4 = document.createElement('button')
btn4.innerHTML = '绘图'
btn4.onclick=paint
document.body.append(btn4)