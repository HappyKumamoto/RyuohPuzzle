"use strict";

//画像が回りながら降るJs
let koma = document.getElementsByClassName('koma');

//let oncli = document.createElement("script");   //onclick.jsを持ってくる
//oncli.src = "onclick.js";

//絵文字を作る関数。n は個数
function komaMaker(n) {
    let koma = document.createElement("div");
    koma.className = "koma";
    let p = '<img src=img/ryu2.png alt="画像" />';
    koma.innerHTML = p;
    for(let i = 0; i < n; i++) {
        komaSet(koma);
    }
}

//絵文字のセッティングをする関数。
function komaSet(clone) {
    let komaClone = clone.cloneNode(true);
    let komaStyle = komaClone.style;

    //絵文字の位置（left）、時間をずらす（animation-delay）、サイズ（font-size）をランダムで指定
    komaStyle.left = 100 * Math.random() + "%";
    komaStyle.animationDelay = 12 * Math.random() + "s";
    komaStyle.fontSize = Math.floor(50 * Math.random() + 20) + "px";
    document.body.appendChild(komaClone);

    //一つのアニメーションが終わったら新しい絵文字を生成
    komaClone.addEventListener("animationend", function() {
        this.parentNode.removeChild(this);
        let koma = document.createElement("div");
        koma.className = "koma";
        let p = '<img src=img/ryu2.png alt="画像" />';
        koma.innerHTML = p;
        komaSet(koma);
    }, false)
}

//絵文字を50個降らせる
komaMaker(50)