			//Running variables
			let rows = 5
			let SeedC = 6
			if (localStorage.getItem("SeedC")) {
				SeedC = localStorage.getItem("SeedC")
			}
			let shop = {"pclean":true}
			let Lawn = []
			let Proj = []
			let Zombies = []
			let Hypnos = []
			let Obstacles = []
			let LevsUnlocked = [0]
			let Level = -1
			if (sessionStorage.getItem("Level") != undefined) {
				Level = sessionStorage.getItem("Level")
			}
			let lastPlant = -1
			if (localStorage.getItem("Levs")) {
				LevsUnlocked = JSON.parse(localStorage.getItem("Levs"))
			}
			let unlocked = [0]
			if (localStorage.getItem("Unlocked")) {
				unlocked = JSON.parse(localStorage.getItem("Unlocked"))
			}
			if (Level == 0) {
				rows = 1
			} else if (Level <= 2) {
				rows = 3
			} else if (Level%40 >= 20) {
				rows = 6
			}
			let Mowers = Array(rows).fill(true)
			let MowerTrigger = Array(rows).fill(0)
			let selected
			/*alert(localStorage.getItem("SelId")+","+localStorage.getItem("PreSelId")+","+localStorage.getItem("Selected"))
			alert(localStorage.getItem("SelId") == localStorage.getItem("PreSelId"))
			alert(localStorage.getItem("SelId") != undefined)*/
			if (localStorage.getItem("SelId") == localStorage.getItem("PreSelId") && localStorage.getItem("SelId") != undefined) {
				selected = JSON.parse(localStorage.getItem("Selected"))
			} else {
				selected = []
			}
			let recharge = []
			let select2 = -1
			let sun = 50
			let Dead = []
			let Pid = 0
			let Zid = 0
			let Lid = 0
			let Aid = 0
			let Oid = 0
			let Wave = 0
			let WaveTime = 27
			let WaveHealth = 3
			let WaveHealthO = 1
			let Hard = false
			let zombInWave = []
			let ambushes = []
			if (Level <= 1) {
				sun = 150
			}
			let saveloaded = false
			
			//Consts
			const savedVars = ["Lawn","Proj","Zombies","Hypnos","Obstacles","Mowers","lastPlant","MowerTrigger","selected","recharge","sun","Dead","Pid","Zid","Lid","Aid","Oid","Wave","Level","WaveTime","WaveHealth","WaveHealthO","Hard","zombInWave","ambushes","rows"]
			if (sessionStorage.getItem("load")) {
				sessionStorage.removeItem("load")
				saveloaded = true
				savedVars.forEach((e) => {
					eval(e+" = "+localStorage.getItem(e))
				})
			}
			
			const mowerimg = ["mower","pclean","rclean"]
			let mowerImg = []
			mowerimg.forEach((e) => {
				mowerImg.push(new Image())
				mowerImg[mowerImg.length-1].src = "./images/proj/"+e+".png"
			})
			
			const preloaded = ["plants/cherry bomb","plants/wall nut","proj/explosion","proj/ice","proj/sun","ui/grave","ui/hole","zombies/flag","ui/silver coin","ui/gold coin","ui/diamond"]
			let preloadedImg = []
			preloaded.forEach((e) => {
				preloadedImg.push(new Image())
				preloadedImg[preloadedImg.length-1].src = "./images/"+e+".png"
			})
			
				//Levels
			const Unlocks = [0,1,2,3,-2,4,5,6,7,-1,8,9,10,11,-3,12,13,14,15,-1,16,17,18,19,-4]
			const AreaBg = [["#00DD33","#00CC22","#00BB55","#00AA44"],["#00AA00","#009900","#008822","#007711"],["#00DD33","#00CC22","#00BB55","#00AA44","#0BD0FC"]]
			const conveyors = {4:[2,3],9:[0,2,3,4,5,6,7],19:[8,10,11,12,13,14,15]}
				//Plants
			//const plants = [["🫛"],["🌻"],["🍒"],["🌰"],["🥔"],["❄️"],["🟣","👄"],["🫛","🫛"],["🍄"],["🍄‍🟫"],["🍄"],["🪵"],["🍄","","","🩷","🩵"],["🍄","","👁️"],["🍄","❄️"],["🍄","💣"]]
			const plants = ["peashooter","sunflower","cherry bomb","wall nut","potato mine unarmed","iceberg lettuce","chomper","repeater","puff shroom","sun shroom small","fume shroom","grave buster","hypno shroom","scaredy shroom","ice shroom","doom shroom","lily pad","squash","threepeater","tangle kelp"]
			const Recharges = [7.5,7.5,50,30,30,20,20,7.5,7.5,7.5,7.5,7.5,30,7.5,50,50,7.5,30,7.5,20]
			const InitCharge = [0,0,35,20,20,0,0,0,0,0,0,0,20,0,35,35,0,20,0,0]
			const plantHealth = [300,300,30001,3000,300,30001,300,300,300,300,300,300,25,300,30001,30001,300,30001,300,30001]
			/*const opacity = [[1],[1],[1],[1],[1],[1],[1,1],[1,1],[1],[1],[1,1],[1],[1,0.75,0.75,0.75,0.75],[1,1],[1,1],[1,1]]
			const plantSize = [[1],[1],[1],[1],[0.5,0.25],[0.5],[1,0.75],[1,1],[0.5],[0.5],[1],[1],[0.5,0.325,0.325,0.325,0.325],[0.75,0.5,0.5],[1,0.75],[1,1]]*/
			const fireRate = [1.5,24,1,1000,15,1000,42,1.5,1.5,24,1.5,5,1000,1.5,1,1,1000,1,1,1.5,1]
			const fireOff = [0,17,0,0,0,1000,42,0,0,17,0,0,0,0,0,0,0,1,0,1]
			const value = [20,25,1800,0,1800,0,1800,20,20,15,20,0,0,20,20,1800,0,1800,20,1800]
			//const ProjImg = ["🟢","☀️","💥","🌰","💥","❄️","👄","🟢","🟣","☀️","🟣🟣🟣🟣🟣🟣🟣🟣🟣🟣🟣🟣🟣🟣🟣🟣🟣🟣","🪵","🍄","🟣","❄️","💥"]
			const ProjImg = ["pea","sun","explosion","","explosion","ice","","pea","spore","sun","fume","","","spore","ice","doom explosion","","squash","pea","kelp"]
			const projOff = [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]]
			const Lspeed = [7.5,0,0,0,0,0,0,7.5,7.5,0,0,0,0,7.5,0,0,0,0,7.5,0]
			const Vspeed = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,[-3.25,0,3.25],0]
			const ProjSize = [25,75,300,0,100,100,0,25,12,50,25,0,0,12,1000,700,0,100,25,100]
			const CollBox = [[25,25],[75,75],[300,300],[],[100,100],[100,100],[],[25,25],[12,12],[50,50],[350,50],[],[0,0],[12,12],[1000,1000],[700,500],[0,0],[100,50],[25,25],[100,100]]
			const cost = [100,50,150,50,25,0,150,200,0,25,75,75,75,25,75,125,25,50,325,25]
			const special = [{"UpgType":0,"range":10,"proj":true},{"range":-1,"sun":true,"lifespan":0,"Threshold":-600},{"range":-1,"proj":true,"selfD":30001,"lifespan":0,"Threshold":-6,"pen":-1,"damageOnce":true,"shrinkOff":1.25},{},{"proj":true,"range":1,"selfD":30001,"lifespan":0,"Threshold":-6,"pen":-1,"delay":500,"transform":{"img":"potato mine armed","health":30001},"damageOnce":true},{"extra":75,"ice":{"chance":1,"dur":10000},"snow":4500,"proj":true,"range":1,"selfD":30001,"lifespan":0,"Threshold":-6,"upgrade":1,"upgradeApp":{"img":" snow","projImg":" snow"},"UpgradeRecharge":7.5,"UpgradeType":0,"upgradeSpec":{"UpgType":-1,"snow":4500,"ice":{"chance":0.1,"dur":3250}}},{"range":2},{"UpgType":0,"range":10,"proj":true,"count":2,"InDelay":100},{"proj":true,"range":4,"night":true},{"sun":true,"night":true,"range":-1,"lifespan":0,"Threshold":-600,"transform":{"count":5,"value":25,"img":"sun shroom big","projSize":100}},{"night":true,"range":5,"proj":true,"lifespan":0,"Threshold":-20,"pen":-1,"damageOnce":true},{"grave":true,"destroy":true,"shrinkOff":0.15},{"hypno":true,"night":true,"dayHealth":300},{"night":true,"range":10,"proj":true,"hide":{"size":[2,3],"transform":{"img":"scaredy shroom hidden"},"reset":{"img":"scaredy shroom"}}},{"night":true,"ice":{"chance":1,"dur":3250},"snow":4500,"proj":true,"range":-1,"pen":-1,"selfD":30001,"lifespan":0,"Threshold":-10,"dayHealth":300,"damageOnce":true},{"proj":true,"range":-1,"selfD":30001,"lifespan":0,"pen":-1,"Threshold":-60,"dayHealth":300,"night":true,"damageOnce":true},{"water":true,"under":true},{"proj":true,"selfD":30001,"lifespan":0,"pen":-1,"Threshold":-30,"damageOnce":true,"range":1.5,"negRange":0.5,"delay":1000,"goto":true},{"proj":true,"range":10,"InDelay":0,"count":3,"lifespan":16,"Threshold":-(10**10),"vRange":3,"UpgType":0,"bounce":true},{"proj":true,"selfD":30001,"range":1,"lifespan":0,"Threshold":-6,"water":true}]
				//Zombies
			let Zombs = [{"base":/*🧟‍♂️*/"base","stages":[]},{"base":/*🧟‍♂️*/"base","stages":[{"arm":"flag","health":0,"armPivot":[-25,-35]}]},{"base":/*🧟‍♂️*/"base","stages":[{"head":"cone","headPivot":[0,-50],"health":400/*example value change later*/ /*nvm it's the correct value*/},{"head":"cone","headRot":45,"headPivot":[50,-45],"health":200}]},{"base":/*🧟‍♂️*/"base","stages":[{"arm":"pole","armPivot":[-75,-50],"head":"pole","headPivot":[35,-15],"health":0,"action":true}]},{"base":/*🧟‍♂️*/"base","stages":[{"head":"bucket","health":750,"headPivot":[0,-45]},{"head":"bucket","health":500/*example value change later*/ /*nvm that's also the correct value*/,"headRot":23,"headPivot":[25,-45]},{"head":"bucket","health":200,"headRot":45,"headPivot":[45,-40]}]},{"base":/*🧟‍♂️*/"base","stages":[],"shields":{"front":{"img":"newspaper","health":150,"Pivot":[25,-50],"break":"break"}}},{"base":/*🧟‍♂️*/"base","stages":[],"shields":{"front":{"img":"door","health":1100,"Pivot":[0,-50],"break":"break"}}},{"base":/*🧟‍♂️*/"base","stages":[{"head":"football","health":1120,"headRot":0},{"head":"football","health":660,"headRot":45,"headPivot":[25,0]},{"head":"football","health":200,"headPivot":[40,15],"headRot":90}]},{"base":"dancer","stages":[]},{"base":"backup dancer","stages":[]}]
			Zombs.forEach((e) => {
				e.Img = new Image()
				e.Img.src = "./images/zombies/"+e.base+".png"
				e.stages.forEach((ee) => {
					if (ee.head) {
						ee.headImg = new Image()
						ee.headImg.src = "./images/zombies/"+ee.head+".png"
					}
					if (ee.arm) {
						ee.armImg = new Image()
						ee.armImg.src = "./images/zombies/"+ee.arm+".png"
					}
				})
				if (e.shields) {
					for (const [key,value] of Object.entries(e.shields)) {
						value.Img = new Image()
						value.Img.src = "./images/zombies/"+value.img+".png"
					}
				}
			})
			const ZombHealth = [200,200,560,340,1300,270,270,1600,340,190]
			const SpdRng = [[0.23,0.26],[0.33,0.33],[0.23,0.26],[0.3,0.35],[0.23,0.26],[0.23,0.26],[0.23,0.26],[0.66,0.68],[1,1],[0.3,0.3]]
			const Weight = [4000,0,3500,3000,3500,3500,3000,3000,2000,0]
			const Points = [1,1,2,2,4,2,4,7,6,0]
			const ZombSpecial = [{"pool":1},{"pool":1},{"pool":1},{"action":true,"jump":true, "AfterSpd":[0.17,0.2]},{"pool":1},{"shields":{"front":150},"transform":{"break":{"speed":[0.5,0.6],"stun":1}}},{"shields":{"front":1100},"transform":{}},{},{"spawn":9,"pattern":[[0,1],[1,0],[0,-1],[-1,0]],"AfterSpd":[0.3,0.3],"lastSummon":-6000,"links":[]},{}]
			
			const AmbushArea = [false,true,[6,2,9,3],[6,2,9,3]]
			const AmbushCount = {10:[4,0],11:[4,0],12:[4,0],13:[7,0],14:[9,5],15:[7,0],16:[11,0],17:[7,0],18:[11,0],19:[13,0]}
			const ZombsAllowed = [[[0],[0],[0,2],[0,2],[0,2],[0,2,3],[0,2,3],[0,2,3],[0,2,4],[0,2,3,4],[0,5],[0,2,4,5],[0,2,6],[0,2,6],[0,2,3,6],[0,2,7],[0,2,6,7],[0,2,8],[0,2,6,8],[0,2,6,7,8],[0,2],[0,2,4,5,7]]]
			const Waves = [/*Adventure 1*/[/*1-1*/[...Array(3).fill({"points":0,"guaranteed":[0]}),{"points":0,"guaranteed":[0,0]}],/*1-2*/[...Array(3).fill({"points":0,"guaranteed":[0]}),...Array(2).fill({"points":0,"guaranteed":[0,0]}),{"points":0,"guaranteed":[0,0,0,0,1]}],/*1-3*/[...Array(3).fill({"points":0,"guaranteed":[0]}),{"points":2,"guaranteed":[]},{"points":0,"guaranteed":[2]},{"points":2,"guaranteed":[]},{"points":2,"guaranteed":[0]},{"points":0,"guaranteed":[0,2,0,0,0,1]}],/*1-4*/[...Array(3).fill({"points":0,"guaranteed":[0]}),...Array(3).fill({"points":2,"guaranteed":[]}),...Array(3).fill({"points":2,"guaranteed":[0]}),{"points":2,"guaranteed":[0,0,0,0,0,1,2]}],/*1-5*/[...Array(3).fill({"points":4,"guaranteed":[]}),...Array(3).fill({"points":8,"guaranteed":[]}),{"points":12,"guaranteed":[]},{"points":10,"guaranteed":[1,0,0,0,2]}],/*1-6*/[...Array(3).fill({"points":0,"guaranteed":[0]}),...Array(2).fill({"points":2,"guaranteed":[]}),{"points":0,"guaranteed":[3]},...Array(3).fill({"points":2,"guaranteed":[0]}),{"points":0,"guaranteed":[0,0,0,0,0,1,2,3]}],/*1-7*/[...Array(3).fill({"points":0,"guaranteed":[0]}),...Array(3).fill({"points":2,"guaranteed":[]}),...Array(3).fill({"points":2,"guaranteed":[0]}),{"points":4,"guaranteed":[0,0,0,0,0,1]},...Array(2).fill({"points":4,"guaranteed":[]}),...Array(3).fill({"points":4,"guaranteed":[0]}),...Array(3).fill({"points":6,"guaranteed":[]}),{"points":6,"guaranteed":[0]},{"points":5,"guaranteed":[0,0,0,0,0,0,0,1,2,3]}],/*1-8*/[...Array(3).fill({"points":0,"guaranteed":[0]}),...Array(2).fill({"points":2,"guaranteed":[]}),{"points":0,"guaranteed":[4]},...Array(3).fill({"points":2,"guaranteed":[0]}),{"points":0,"guaranteed":[0,0,0,0,1,2,4]}],/*1-9*/[...Array(3).fill({"points":0,"guaranteed":[0]}),...Array(3).fill({"points":2,"guaranteed":[]}),...Array(3).fill({"points":2,"guaranteed":[0]}),{"points":4,"guaranteed":[0,0,0,0,0,1]},...Array(2).fill({"points":4,"guaranteed":[]}),...Array(3).fill({"points":4,"guaranteed":[0]}),...Array(3).fill({"points":6,"guaranteed":[]}),{"points":6,"guaranteed":[0]},{"points":5,"guaranteed":[0,0,0,0,0,0,0,0,1,2,3,4]}],/*1-10*/[...Array(3).fill({"points":2,"guaranteed":[0]}),...Array(3).fill({"points":6,"guaranteed":[]}),...Array(3).fill({"points":8,"guaranteed":[0]}),{"points":14,"guaranteed":[0,0,0,0,0,1]},...Array(2).fill({"points":12,"guaranteed":[]}),...Array(3).fill({"points":14,"guaranteed":[0]}),...Array(3).fill({"points":18,"guaranteed":[]}),{"points":20,"guaranteed":[0]},{"points":18,"guaranteed":[0,0,0,0,0,0,0,0,1,2,3,4]}],/*2-1*/[...Array(3).fill({"points":0,"guaranteed":[0]}),...Array(2).fill({"points":2,"guaranteed":[]}),{"points":0,"guaranteed":[5]},...Array(3).fill({"points":2,"guaranteed":[0]}),{"points":2,"guaranteed":[0,0,0,0,0,1,5],"ambush":[0,0,0,0]}],/*2-2*/[...Array(3).fill({"points":0,"guaranteed":[0]}),...Array(3).fill({"points":2,"guaranteed":[]}),...Array(3).fill({"points":2,"guaranteed":[0]}),{"points":4,"guaranteed":[0,0,0,0,0,1]},...Array(2).fill({"points":4,"guaranteed":[]}),...Array(3).fill({"points":4,"guaranteed":[0]}),...Array(3).fill({"points":6,"guaranteed":[]}),{"points":6,"guaranteed":[0]},{"points":0,"guaranteed":[0,0,0,0,0,0,0,0,1,2,4,5],"ambush":4}],/*2-3*/[...Array(3).fill({"points":0,"guaranteed":[0]}),...Array(2).fill({"points":2,"guaranteed":[]}),{"points":0,"guaranteed":[6]},...Array(3).fill({"points":2,"guaranteed":[0]}),{"points":0,"guaranteed":[0,0,0,0,0,1,6],"ambush":4}],/*2-4*/[...Array(3).fill({"points":0,"guaranteed":[0]}),...Array(3).fill({"points":2,"guaranteed":[]}),...Array(3).fill({"points":2,"guaranteed":[0]}),{"points":4,"guaranteed":[0,0,0,0,0,1]},...Array(2).fill({"points":4,"guaranteed":[]}),...Array(3).fill({"points":4,"guaranteed":[0]}),...Array(3).fill({"points":6,"guaranteed":[]}),{"points":6,"guaranteed":[0]},{"points":0,"guaranteed":[0,0,0,0,0,0,0,0,1,2,4,5],"ambush":7}],/*2-5*/[...Array( 24 ).fill({"points":0,"guaranteed":[],"ambush":[0]}), ...Array( 3 ).fill({"points":0,"guaranteed":[],"ambush":[0,0]}), ...Array( 2 ).fill({"points":0,"guaranteed":[],"ambush":[0]}), {"points":0,"guaranteed":[],"ambush":[0,0]}, ...Array( 5 ).fill({"points":0,"guaranteed":[],"ambush":[0]}), ...Array( 2 ).fill({"points":0,"guaranteed":[],"ambush":[0,0]}), {"points":0,"guaranteed":[],"ambush":[0]}, {"points":0,"guaranteed":[],"ambush":[0,0]}, ...Array( 11 ).fill({"points":0,"guaranteed":[],"ambush":[0]}), ...Array( 2 ).fill({"points":0,"guaranteed":[],"ambush":[0,0]}), ...Array( 2 ).fill({"points":0,"guaranteed":[],"ambush":[0]}), {"points":0,"guaranteed":[],"ambush":[0,0]}, ...Array( 12 ).fill({"points":0,"guaranteed":[],"ambush":[0]}), {"points":0,"guaranteed":[],"ambush":[2]}, ...Array( 2 ).fill({"points":0,"guaranteed":[],"ambush":[0]}), ...Array( 2 ).fill({"points":0,"guaranteed":[],"ambush":[2]}), ...Array( 3 ).fill({"points":0,"guaranteed":[],"ambush":[0]}), {"points":0,"guaranteed":[],"ambush":[2]}, ...Array( 6 ).fill({"points":0,"guaranteed":[],"ambush":[0]}), {"points":0,"guaranteed":[],"ambush":[2,2]}, {"points":0,"guaranteed":[],"ambush":[0]}, {"points":0,"guaranteed":[],"ambush":[4]}, {"points":0,"guaranteed":[],"ambush":[0]}, ...Array( 3 ).fill({"points":0,"guaranteed":[],"ambush":[2]}), {"points":0,"guaranteed":[],"ambush":[4]}, {"points":0,"guaranteed":[],"ambush":[0]}, {"points":0,"guaranteed":[],"ambush":[4]}, ...Array( 3 ).fill({"points":0,"guaranteed":[],"ambush":[0]}), ...Array( 2 ).fill({"points":0,"guaranteed":[],"ambush":[0,0]}), {"points":0,"guaranteed":[],"ambush":[0]}, {"points":0,"guaranteed":[],"ambush":[0,0]}, {"points":0,"guaranteed":[],"ambush":[0]}, {"points":0,"guaranteed":[],"ambush":[4,4,4,2,2,2,2,2,2]}],/*2-6*/[...Array(3).fill({"points":0,"guaranteed":[0]}),...Array(2).fill({"points":2,"guaranteed":[]}),{"points":0,"guaranteed":[7]},...Array(3).fill({"points":2,"guaranteed":[0]}),{"points":0,"guaranteed":[0,0,0,0,2,1,7],"ambush":7}],/*2-7*/[...Array(3).fill({"points":0,"guaranteed":[0]}),...Array(3).fill({"points":2,"guaranteed":[]}),...Array(3).fill({"points":2,"guaranteed":[0]}),{"points":4,"guaranteed":[0,0,0,0,0,1]},...Array(2).fill({"points":4,"guaranteed":[]}),...Array(3).fill({"points":4,"guaranteed":[0]}),...Array(3).fill({"points":6,"guaranteed":[]}),{"points":7,"guaranteed":[]},{"points":0,"guaranteed":[0,0,0,0,0,0,0,1,2,6,7],"ambush":11}],/*2-8*/[...Array(3).fill({"points":0,"guaranteed":[0]}),...Array(2).fill({"points":2,"guaranteed":[]}),{"points":0,"guaranteed":[8]},...Array(3).fill({"points":2,"guaranteed":[0]}),{"points":0,"guaranteed":[0,0,0,0,1,2,8],"ambush":7}],/*2-9*/[...Array(3).fill({"points":0,"guaranteed":[0]}),...Array(3).fill({"points":2,"guaranteed":[]}),...Array(3).fill({"points":2,"guaranteed":[0]}),{"points":4,"guaranteed":[0,0,0,0,0,1]},...Array(2).fill({"points":4,"guaranteed":[]}),...Array(3).fill({"points":5,"guaranteed":[]}),...Array(3).fill({"points":6,"guaranteed":[]}),{"points":7,"guaranteed":[]},{"points":0,"ambush":11,"guaranteed":[0,0,0,0,0,0,0,1,2,6,8]}],/*2-10*/[...Array(3).fill({"points":2,"guaranteed":[0]}),...Array(3).fill({"points":6,"guaranteed":[]}),...Array(3).fill({"points":9,"guaranteed":[]}),{"points":15,"guaranteed":[0,0,0,0,1]},...Array(2).fill({"points":12,"guaranteed":[]}),...Array(3).fill({"points":15,"guaranteed":[]}),...Array(3).fill({"points":18,"guaranteed":[]}),{"points":21,"guaranteed":[]},{"points":9,"ambush":13,"guaranteed":[0,0,0,0,0,0,0,1,2,6,7,8]}],/*3-1*/[...Array(3).fill({"points":0,"guaranteed":[0]}),...Array(3).fill({"points":2,"guaranteed":[]}),...Array(3).fill({"points":2,"guaranteed":[0]}),{"points":2,"ambush":2,"guaranteed":[0,0,0,0,0,1,2]}],[...Array(3).fill({"guaranteed":[0],"points":0}),...Array(3).fill({"guaranteed":[],"points":2}),...Array(3).fill({"guaranteed":[0],"points":2}),{"points":4,"guaranteed":[0,0,0,0,0,1]},...Array(2).fill({"guaranteed":[],"points":4}),...Array(3).fill({"guaranteed":[0],"points":4}),...Array(3).fill({"guaranteed":[],"points":6}),{"points":7,"guaranteed":[]},{"points":0,"guaranteed":[0,0,0,0,0,0,0,1,2,4,5,7]}],[],[],[]]]