let index = 0;

const key0 = "9648019843367b96a755c997fef43b7f";
const key1 = "c2b9a348d62421fa046573fb1bebb927";

// //restapi.amap.com/v3/geocode/geo?key=9648019843367b96a755c997fef43b7f&address=月浦镇庆安路51弄1-1201&city=上海
const getGeo = ({ address, city }) =>
  `//restapi.amap.com/v3/geocode/geo?key=${key0}&address=${address.trim()}&city=${city}`;
  
async function queryLocation() {
  try {
    console.log("show", window.data);
    const data = window.data.slice(0, 22000);

    for (const item of data) {
      const { address, city, location, community } = item;
      if (location && !community) {
        const url = getGeo({ address, city });
        const res = await fetch(url);
        if (res.ok) {
          const body = await res.json();
          const info = _.get(body, "info");
          if (info === "OK") {
            const location = _.get(body, "geocodes.[0].location");
            const street = _.get(body, "geocodes.[0].street");
            item.location = location;
            if (street && typeof street === "string" && !item.community) {
              item.community = street;
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

export default queryLocation