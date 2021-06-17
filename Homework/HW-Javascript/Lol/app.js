import {$c,$g} from "./Modules/helpers.js"


//Ajax產出英雄資料
let url = "https://ddragon.leagueoflegends.com/cdn/10.22.1/data/zh_TW/champion.json"
let row = $g('.row');
let dataArray = {}
let arrayKeys = []
let arrayValues = []

$g("#show").addEventListener("click",showHandler)

function showHandler(e){
    fetch(url).then(res=>res.text()).then(data=>{
        dataArray = JSON.parse(data);
        arrayKeys = Object.values(dataArray.data)
        arrayValues = Object.values(dataArray.data)
        arrayKeys.forEach((item,index)=>{
            showItem(item,index)
        })
    })
}

//template
function showItem(item,index){

    let cloneContent = $g("#app").content.cloneNode(true);
    let title = cloneContent.querySelector(".card-title");
    let content = cloneContent.querySelector(".card-text");
    let img = cloneContent.querySelector(".card-img-top")

    title.innerText = `${index+1} : ${item.id} - ${item.name}`
    content.innerText = `${item.blurb.slice(0,50)}...`
    img.setAttribute("src",`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${item.id}_0.jpg`)

    //modal
    cloneContent.querySelector(".detail").addEventListener("click",function(){
        this.setAttribute("data-toggle","modal")
        this.setAttribute("data-target","#exampleModal")

        let modal = $g("#exampleModal")
        modal.querySelector('h5').innerText = `${item.id} - ${item.name}`
        modal.querySelector(".heroImage").src=`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${item.id}_1.jpg`
        modal.querySelector(".description").innerHTML=`<br/>${item.blurb}<br/><br/><p>armor: ${item.stats.armor}</p><p>attackdamage: ${item.stats.attackdamage}</p><p>attackrange: ${item.stats.attackrange}</p><p>hp: ${item.stats.hp}</p><p>movespeed: ${item.stats.movespeed}</p><p>spellblock: ${item.stats.spellblock}</p>`
    });

    //video
    cloneContent.querySelector(".video").addEventListener("click",function(){
        this.setAttribute("data-toggle","modal")
        this.setAttribute("data-target","#myModal")
        var src = 'https://www.youtube.com/embed/nYb2B7N1CKU';
        $g('#myModal iframe').setAttribute('src', src);

        $g('#myModal button').addEventListener("click",()=>{
            $g('#myModal iframe').removeAttribute('src');
        })
    });

    row.append(cloneContent)
}