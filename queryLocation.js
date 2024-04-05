let index = 0;

const key0 = "9648019843367b96a755c997fef43b7f";
const key1 = "c2b9a348d62421fa046573fb1bebb927";

// //restapi.amap.com/v3/geocode/geo?key=9648019843367b96a755c997fef43b7f&address=月浦镇庆安路51弄1-1201&city=上海
const getGeo = ({ address, city }) =>
  `//restapi.amap.com/v3/geocode/geo?key=${key1}&address=${address.trim()}&city=${city}`;

async function queryLocation() {
  try {
    console.log("show", window.data);
    const data = window.data.slice(5000, 11000);

    for (const item of data) {
      const { address, city, location1 } = item;
      if (!location1) {
        const url = getGeo({ address, city });
        const res = await fetch(url);
        if (res.ok) {
          const body = await res.json();
          const info = _.get(body, "info");
          if (info === "OK") {
            const location1 = _.get(body, "geocodes.[0].location");
            const street = _.get(body, "geocodes.[0].street");
            item.location1 = location1;
            if (street && typeof street === "string" && !item.street) {
              item.street = street;
              console.log("street", street);
            }
            index++;
          }
        }
      }
      continue;
    }
    console.log("down");
    console.log(index);
  } catch (err) {
    console.log(err);
  }
}

export default queryLocation;
