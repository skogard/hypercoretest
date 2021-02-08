const hypercore = require('hypercore')
const fs = require('fs')
const add = (feed, buf) => {
  return new Promise((resolve, reject) => {
    feed.append(buf, (err) => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
};
const str = "abcdefghijklmnopqrstuvwxyz";
(async () => {
  await fs.promises.mkdir("db").catch((e) => { })
  for(let MAX = 1000; MAX <= 100000000 ; MAX*=10) {
    console.time(MAX)
    let feed = hypercore('./db/' + MAX);
    for(let size=0; size<=MAX; size++) {
      await add(feed, Buffer.from(str))
    }
    console.timeEnd(MAX)
  }
})();
