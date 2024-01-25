"use strict";

 const el = document.createElement("script");//紙吹雪のkamifu.jsを持ってくる
 el.src = "kamifu.js";

 let imglist = [
	"img/2012.jpg",
	"img/231026.jpg",
	"img/WellTobata.jpg",
	"img/kenbun.jpg",
	"img/room.jpg",
	"img/greenRoom.jpg",
	"img/kogetudo.jpg",
	"img/kouji.jpg",
	"img/monaka.jpg",
	"img/didakomen.jpg",
	"img/boad-back2.jpg",
	"img/inakaan.jpg",
	"img/road.jpg",
	"img/sukesan.jpg",
	"img/kaisen.jpg",
	"img/doughnut.jpg",
	"img/neji.jpg",
	"img/macchajin.jpg",
	"img/shiso.jpg",
	"img/koyume.jpg",
	"img/yomiya.jpg",
	"img/cookie.jpg",
	"img/wasei.jpg",
	"img/ichieda.jpg",
	"img/lemony.jpg",
	"img/boad-back.jpg",
	"img/yoitosa.jpg"
	];

	let explist = [
		"2012年1月 第9回小学館全国小学生将棋大会 3年生の部",
		"第36期竜王戦第3局 大盤解説会場 ウェルとばた",
		"第36期竜王戦第3局 大盤解説会場 ウェルとばた",
		"2023年10月24日 第3局 検分",
		"第3局 対局室",
		"旧安川邸 竜王控え室",
		"勝負飯: 明治28年創業 湖月堂特製カレー",
		"鳥町食堂街 中国料理耕治 必勝竜神膳",
		"梅園 門司駅前本店 河豚最中",
		"Labo割烹Mondo 海老香る 門司地ダコの冷製にゅうめん",
		"盤:日向産 榧(かや)厚さ七寸一分天柾(まさ) <br>駒:粷水(きくすい)<制作:桜井和男>",
		"田舎庵 小倉本店 天然鰻の鰻重",
		"北九州市戸畑区一枝 夜宮こもれびロード",
		"資さんうどん 肉ごぼ天うどん",
		"旧松本邸 北の海鮮バターライスっちゃ",
		"Rcafe・つばめドーナツ 気分で選べる焼きドーナツセット",
		"GRAN DA ZUR ネジメカ＆コク旨チーズセット",
		"茶論〜Salon du JAPON MAEDA 茶論ジンジャーエール",
		"Bekk cucina italiana 北九州産の赤紫蘇ジュース",
		"タイガーミルク ブティックスイート アイスラテ濃ゆめ",
		"旧松本邸 夜宮の森の竜玉",
		"あしかクッキー 区ッキー",
		"FutureStudio フューチャースタジオ 北九州 和製コーヒー [焙煎玄米麹]",
		"旧松本邸 一枝アイスティー",
		"カフェ＆ファクトリー レモニー 北九州ハニーレモネード(アイス・ホット)",
		"第36期竜王戦第3局 将棋盤 署名",
		"洋菓子のミロ 戸畑ヨイトサ309-灯"
		];

	let selectnum = Math.floor(Math.random() * imglist.length);
	let element = '<img src="' + imglist[ selectnum ] + '" alt="できあがり図" />';
	target.innerHTML = element;
	console.log(element);

	let exp = explist[ selectnum ];
	explan.innerHTML = exp ;
	console.log(exp);
	
	
window.addEventListener('DOMContentLoaded', function(){

	let size, main_image, panels, cell_w, cell_h, canvas, context, image;

	// 設定
	size = 2;
	main_image = imglist[selectnum];
	panels = [];
	cell_w = 320 / size;
	cell_h = 320 / size;

	// Canvasを取得
	canvas = document.getElementById("puzzle_canvas");
	// コンテキストを取得
	context = canvas.getContext("2d");

	function checkX(idx) {
	// その行に穴があれば，そのindexを返す．なければ-1を返す．
		let i = 0;
		for (i = 0; i < size; i += 1) {
			if (panels[Math.floor(idx / size) * size + (idx + i) % size] === size * size - 1) {
				return Math.floor(idx / size) * size + (idx + i) % size;
			}
		}
		return -1;
	}

	function checkY(idx) {
	// その列に穴があれば，そのindexを返す．なければ-1を返す．
		let i = 0;
		for (i = 0; i < size; i += 1) {
			if (panels[(idx + i * size) % (size * size)] === size * size - 1) {
				return (idx + i * size) % (size * size);
			}
		}
		return -1;
	}

	// パネル番号に応じて描画する
	function drawPanels() {
		let i, px, py, tx, ty;
		for (i = 0; i < size * size; i += 1) {
			px = (panels[i] % size) * cell_w;	// 画像image中の位置
			py = Math.floor(panels[i] / size) * cell_h;
			tx = (i % size) * cell_w;			// カンヴァスpuzzle_canvas上の位置
			ty = Math.floor(i / size) * cell_h;
			if (panels[i] === size * size - 1) {	// 穴の描画
				context.beginPath();
				context.fillStyle = "#cccccc";
				context.fillRect(tx, ty, cell_w, cell_h);
			} else {							// 画像の描画
				context.drawImage(image, px, py, cell_w, cell_h, tx, ty, cell_w, cell_h);
			}

			// 枠の描画
			context.beginPath();
			context.moveTo(tx + cell_w, ty);
			context.lineTo(tx, ty);
			context.lineTo(tx, ty + cell_h);
			context.strokeStyle = "#999999";
			context.stroke();
		}
	}

	function tapPanel(no) {
		let ana, anatmp;

		// 穴の上なら何もしない．
		if (panels[no] === size * size - 1) {
			return;
		}

		// タップした行に穴がある．
		ana = checkX(no);
		if (ana !== -1 && ana < no) {
			for (anatmp = ana; anatmp < no; anatmp += 1) {
				panels[anatmp] = panels[anatmp + 1];
			}
			panels[no] = size * size - 1;
		} else if (ana !== -1) {
			for (anatmp = ana; anatmp > no; anatmp -= 1) {
				panels[anatmp] = panels[anatmp - 1];
			}
			panels[no] = size * size - 1;
		}

		// タップした列に穴がある．
		ana = checkY(no);
		if (ana === -1) {
			return;
		}
		if (ana < no) {
			for (anatmp = ana; anatmp < no; anatmp += size) {
				panels[anatmp] = panels[anatmp + size];
			}
			panels[no] = size * size - 1;
		} else {
			for (anatmp = ana; anatmp > no; anatmp -= size) {
				panels[anatmp] = panels[anatmp - size];
			}
			panels[no] = size * size - 1;
		}

		// 描画
		drawPanels();
	}

	// パネルをシャッフル
	function shufflePanel() {
		let i, j, rnd;
		for (i = 0; i < size * size; i += 1) {
			panels[i] = i;
		}
		for (j = 0; j < 200; j += 1) {
			rnd = Math.floor(Math.random() * size * size);
			tapPanel(rnd);
		}
		document.getElementById("message").innerHTML = "<p ><\/p>";
	}

	// 画像の読み込み
	image = new Image();
	image.src = main_image;
	image.onload = function () {
		context.drawImage(image, 0, 0);
		setTimeout(shufflePanel, 5000);
	};

	// ゲームクリアした？
	function clear(p) {
		let i;
		for (i = 0; i < size * size; i += 1) {
			if (p[i] !== i) {
				return false;
			}
		}
		return true;
	}

	function tap(e) {
		let rect, no;

		// タップされたパネルを取得
		rect = e.target.getBoundingClientRect();
		no = Math.floor((e.clientY - rect.top) / cell_h) * size + Math.floor((e.clientX - rect.left) / cell_w);
		// パネルを移動
		tapPanel(no);
		// 完成か否かを判定して，完成ならメッセージを表示．
		if (clear(panels)) {
			document.getElementById("message").innerHTML = "<p>\\おめでとうございます。/<br>\\完成です！/<\/p>";
			context.drawImage(image, 0, 0);
			document.body.appendChild(el);  //kami.jsで紙吹雪を出す
			
		}
	}

	// ユーザのタッチイベントに反応する
	canvas.ontouchstart = function (e) {
		let t;
		if (e.touches.length > 0) {
			t = e.touches[0];
			tap(t);
		}
		e.preventDefault();
	};

	// PC用
	canvas.onmousedown = function (e) {
		tap(e);
	}}, false );

  let btnReload = document.getElementById('btnReload');
  btnReload.addEventListener('click', function(){
  location.reload();
  });
