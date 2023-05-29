const sleep = waitTime => new Promise( resolve => setTimeout(resolve, waitTime) );
const aFunc = async function( ){
  await sleep( 20 * 1000 );
  el=document.createElement("div");
  el.innerHTML = "OK"
  document.body.appendChild(el)
  //el=document.createElement("img");
  //el.src="./img/basic1.png"
  //document.body.appendChild(el)
}
aFunc();
