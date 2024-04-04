import getDatas from "./getDatas.js";
import getAggregations from './getAggregations.js'
import paint from "./paint.js";
import aggregation from "./aggregation.js";
import queryLocation from "./queryLocation.js";
import show from './show.js'
import save from './save.js'

getDatas();
getAggregations()

function addButton (text, fun) {
  const btn = document.createElement("button");
  btn.innerHTML = text;
  btn.onclick = fun;
  document.body.append(btn);
}

addButton('请求', queryLocation)
addButton('下载', save)
addButton('聚合', aggregation)
addButton('展现', show)
addButton('绘图', paint)
