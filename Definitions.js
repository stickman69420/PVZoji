			//Running variables
			let SeedC = 8
			let Lawn = []
			let Proj = []
			let Zombies = []
			let Hypnos = []
			let Obstacles = []
			let LevsUnlocked = [0]
			if (localStorage.getItem("Levs")) {
				LevsUnlocked = JSON.parse(localStorage.getItem("Levs"))
			}
			let unlocked = [0]
			if (localStorage.getItem("Unlocked")) {
				unlocked = JSON.parse(localStorage.getItem("Unlocked"))
			}
			let Mowers = [true,true,true,true,true]
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
			let Level = -1
			if (sessionStorage.getItem("Level") != undefined) {
				Level = sessionStorage.getItem("Level")
			}
			let WaveTime = 27
			let WaveHealth = 3
			let WaveHealthO = 1
			let Hard = false
			let zombInWave = []
			let ambushes = []
			if (Level <= 1) {
				sun = 250
			}
			
			//Consts
			const savedVars = ["Lawn","Proj","Zombies","Hypnos","Obstacles","Mowers","selected","recharge","sun","Dead","Pid","Zid","Lid","Aid","Oid","Wave","Level","WaveTime","WaveHealth","WaveHealthO","Hard","zombInWave","ambushes"]
			if (sessionStorage.getItem("load")) {
				sessionStorage.removeItem("load")
				savedVars.forEach((e) => {
					eval(e+" = "+localStorage.getItem(e))
				})
			}
				//Levels
			const Unlocks = [0,1,2,3,-1,4,5,6,7,-1,8,9,10,11,-1,12,13,14,15,-1]
			const AreaBg = [["#00DD33","#00CC22","#00BB55","#00AA44"],["#00AA00","#009900","#008822","#007711"]]
				//Plants
			const plants = [["🫛"],["🌻"],["🍒"],["🌰"],["🥔"],["❄️"],["🟣","👄"],["🫛","🫛"],["🍄"],["🍄‍🟫"],["🍄"],["🪵"],["🍄","","","🩷","🩵"],["🍄","","👁️"],["🍄","❄️"],["🍄","💣"]]
			const Recharges = [7.5,7.5,50,30,30,20,20,7.5,7.5,7.5,7.5,7.5,30,7.5,50,50]
			const InitCharge = [0,0,35,20,20,0,0,0,0,0,0,0,0.20,0,35,35]
			const plantHealth = [300,300,30001,3000,300,30001,300,300,300,300,300,300,25,300,30001,30001]
			const opacity = [[1],[1],[1],[1],[1],[1],[1,1],[1,1],[1],[1],[1,1],[1],[1,0.75,0.75,0.75,0.75],[1,1],[1,1],[1,1]]
			const plantSize = [[1],[1],[1],[1],[0.5,0.25],[0.5],[1,0.75],[1,1],[0.5],[0.5],[1],[1],[0.5,0.325,0.325,0.325,0.325],[0.75,0.5,0.5],[1,0.75],[1,1]]
			const fireRate = [1,24,1,1000,15,1000,42,1,1,24,1,5,1000,1,1,1]
			const fireOff = [0,17,0,0,0,1000,42,0,0,17,0,0,0,0,0,0]
			const value = [20,25,1800,0,1800,0,1800,20,20,15,20,0,0,20,1,1800]
			const ProjImg = ["🟢","☀️","💥","🌰","💥","❄️","👄","🟢","🟣","☀️","🟣🟣🟣🟣🟣🟣🟣🟣🟣🟣🟣🟣🟣🟣🟣🟣🟣🟣","🪵","🍄","🟣","❄️","💥"]
			const projOff = [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]]
			const Lspeed = [7.5,0,0,0,0,0,15,7.5,7.5,0,0,0,0,7.5,0,0]
			const Vspeed = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
			const ProjSize = [25,75,300,0,100,100,75,25,12,50,25,0,0,12,1000,700]
			const CollBox = [[25,25],[75,75],[300,300],[],[100,100],[100,100],[75,75],[25,25],[12,12],[50,50],[450,50],[],[0,0],[12,12],[1000,1000],[700,700]]
			const cost = [100,50,150,50,25,0,150,200,0,25,75,75,75,25,75,125]
			const special = [{"UpgType":0,"range":10,"proj":true},{"range":-1,"sun":true,"lifespan":0,"Threshold":-600},{"range":-1,"proj":true,"selfD":30001,"lifespan":0,"Threshold":-6,"pen":-1,"damageOnce":true,"shrinkOff":1.25},{},{"proj":true,"range":0,"selfD":30001,"lifespan":0,"Threshold":-6,"pen":-1,"delay":500,"transform":{"img":["🥔","❗️"],"health":30001},"damageOnce":true},{"extra":75,"ice":{"chance":1,"dur":10000},"snow":4500,"proj":true,"range":0,"selfD":30001,"lifespan":0,"Threshold":-6,"upgrade":1,"upgradePush":{"opacity":0.5,"size":1,"img":"❄️"},"UpgradeRecharge":7.5,"UpgradeType":0,"upgradeSpec":{"UpgType":-1,"snow":4500,"ice":{"chance":0.25,"dur":3250}}},{"proj":true,"range":1},{"UpgType":0,"range":10,"proj":true,"count":2,"InDelay":100},{"proj":true,"range":3,"night":true},{"sun":true,"night":true,"range":-1,"lifespan":0,"Threshold":-600,"transform":{"count":5,"value":25,"size":[1],"projSize":100}},{"night":true,"range":4,"proj":true,"lifespan":0,"Threshold":-20,"pen":-1,"damageOnce":true},{"grave":true,"destroy":true,"shrinkOff":0.15},{"hypno":true,"night":true,"dayHealth":300},{"night":true,"range":10,"proj":true,"hide":{"size":[3,3],"transform":{"img":["🍄","","–"]},"reset":{"img":["🍄","","👁️"]}}},{"night":true,"ice":{"chance":1,"dur":3250},"snow":4500,"proj":true,"range":-1,"pen":-1,"selfD":30001,"lifespan":0,"Threshold":-10,"dayHealth":300,"damageOnce":true},{"proj":true,"range":-1,"selfD":30001,"lifespan":0,"pen":-1,"Threshold":-60,"dayHealth":300,"night":true,"damageOnce":true}]
				//Zombies
			const Zombs = [{"base":"🧟‍♂️","stages":[]},{"base":"🧟‍♂️","stages":[{"arm":"🚩","health":0}]},{"base":"🧟‍♂️","stages":[{"head":"⚠️","health":200}]},{"base":"🧟‍♂️","stages":[{"arm":"|","health":0,"action":true}]},{"base":"🧟‍♂️","stages":[{"head":"🪣","health":750,"headRot":180},{"head":"🪣","health":200,"headRot":-135,"headPivot":[12,5]}]},{"base":"🧟‍♂️","stages":[],"shields":{"front":{"img":"📰","health":150,"break":"break"}}},{"base":"🧟‍♂️","stages":[],"shields":{"front":{"img":"🚪","health":1100,"break":"break"}}},{"base":"🧟‍♂️","stages":[{"head":"🏈","health":1120,"headRot":45},{"head":"🏈","health":660,"headRot":67.5},{"head":"🏈","health":200,"headPivot":[12,5],"headRot":90}]}]
			const ZombHealth = [200,200,560,340,1300,270,270,1600]
			const SpdRng = [[0.23,0.26],[0.33,0.33],[0.23,0.26],[0.3,0.35],[0.23,0.26],[0.23,0.26],[0.23,0.26],[0.66,0.68]]
			const Weight = [4000,0,3500,3000,3500,3500,3000,3000]
			const Points = [1,1,2,2,4,2,4,7]
			const ZombSpecial = [{},{},{},{"action":true,"jump":true, "AfterSpd":[0.17,0.2]},{},{"shields":{"front":150},"transform":{"break":{"speed":[0.5,0.6],"stun":1}}},{"shields":{"front":1100},"transform":{}},{}]
			
			const AmbushCount = [[0, false],[0,false],[0, false],[0,false],[0, false],[0,false],[0, false],[0,false],[0,false],[0,false],[4,false],[4,false],[4,false],[7,false],[9,true],[7,false],[11,false]]
			const AmbushImg = ["","🪦","","🪦","🎯"]
			const ZombsAllowed = [[[0],[0],[0,2],[0,2],[0,2],[0,2,3],[0,2,3],[0,2,3],[0,2,4],[0,2,3,4],[0,5],[0,2,4,5],[0,2,6],[0,2,6],[0,2,3,6],[0,2,7]],[0,2,6,7]]
			const Waves = [/*Adventure 1*/[/*1-1*/[...Array(3).fill({"points":0,"guaranteed":[0]}),{"points":0,"guaranteed":[0,0]}],/*1-2*/[...Array(3).fill({"points":0,"guaranteed":[0]}),...Array(2).fill({"points":0,"guaranteed":[0,0]}),{"points":0,"guaranteed":[0,0,0,0,1]}],/*1-3*/[...Array(3).fill({"points":0,"guaranteed":[0]}),{"points":2,"guaranteed":[]},{"points":0,"guaranteed":[2]},{"points":2,"guaranteed":[]},{"points":2,"guaranteed":[0]},{"points":0,"guaranteed":[0,2,0,0,0,1]}],/*1-4*/[...Array(3).fill({"points":0,"guaranteed":[0]}),...Array(3).fill({"points":2,"guaranteed":[]}),...Array(3).fill({"points":2,"guaranteed":[0]}),{"points":2,"guaranteed":[0,0,0,0,0,1,2]}],/*1-5*/[...Array(3).fill({"points":4,"guaranteed":[]}),...Array(3).fill({"points":8,"guaranteed":[]}),{"points":12,"guaranteed":[]},{"points":10,"guaranteed":[1,0,0,0,2]}],/*1-6*/[...Array(3).fill({"points":0,"guaranteed":[0]}),...Array(2).fill({"points":2,"guaranteed":[]}),{"points":0,"guaranteed":[3]},...Array(3).fill({"points":2,"guaranteed":[0]}),{"points":0,"guaranteed":[0,0,0,0,0,1,2,3]}],/*1-7*/[...Array(3).fill({"points":0,"guaranteed":[0]}),...Array(3).fill({"points":2,"guaranteed":[]}),...Array(3).fill({"points":2,"guaranteed":[0]}),{"points":4,"guaranteed":[0,0,0,0,0,1]},...Array(2).fill({"points":4,"guaranteed":[]}),...Array(3).fill({"points":4,"guaranteed":[0]}),...Array(3).fill({"points":6,"guaranteed":[]}),{"points":6,"guaranteed":[0]},{"points":5,"guaranteed":[0,0,0,0,0,0,0,1,2,3]}],/*1-8*/[...Array(3).fill({"points":0,"guaranteed":[0]}),...Array(2).fill({"points":2,"guaranteed":[]}),{"points":0,"guaranteed":[4]},...Array(3).fill({"points":2,"guaranteed":[0]}),{"points":0,"guaranteed":[0,0,0,0,1,2,4]}],/*1-9*/[...Array(3).fill({"points":0,"guaranteed":[0]}),...Array(3).fill({"points":2,"guaranteed":[]}),...Array(3).fill({"points":2,"guaranteed":[0]}),{"points":4,"guaranteed":[0,0,0,0,0,1]},...Array(2).fill({"points":4,"guaranteed":[]}),...Array(3).fill({"points":4,"guaranteed":[0]}),...Array(3).fill({"points":6,"guaranteed":[]}),{"points":6,"guaranteed":[0]},{"points":5,"guaranteed":[0,0,0,0,0,0,0,0,1,2,3,4]}],/*1-10*/[...Array(3).fill({"points":2,"guaranteed":[0]}),...Array(3).fill({"points":6,"guaranteed":[]}),...Array(3).fill({"points":8,"guaranteed":[0]}),{"points":14,"guaranteed":[0,0,0,0,0,1]},...Array(2).fill({"points":12,"guaranteed":[]}),...Array(3).fill({"points":14,"guaranteed":[0]}),...Array(3).fill({"points":18,"guaranteed":[]}),{"points":20,"guaranteed":[0]},{"points":18,"guaranteed":[0,0,0,0,0,0,0,0,1,2,3,4]}],/*2-1*/[...Array(3).fill({"points":0,"guaranteed":[0]}),...Array(2).fill({"points":2,"guaranteed":[]}),{"points":0,"guaranteed":[5]},...Array(3).fill({"points":2,"guaranteed":[0]}),{"points":2,"guaranteed":[0,0,0,0,0,1,5],"ambush":[0,0,0,0]}],/*2-2*/[...Array(3).fill({"points":0,"guaranteed":[0]}),...Array(3).fill({"points":2,"guaranteed":[]}),...Array(3).fill({"points":2,"guaranteed":[0]}),{"points":4,"guaranteed":[0,0,0,0,0,1]},...Array(2).fill({"points":4,"guaranteed":[]}),...Array(3).fill({"points":4,"guaranteed":[0]}),...Array(3).fill({"points":6,"guaranteed":[]}),{"points":6,"guaranteed":[0]},{"points":0,"guaranteed":[0,0,0,0,0,0,0,0,1,2,4,5],"ambush":4}],/*2-3*/[...Array(3).fill({"points":0,"guaranteed":[0]}),...Array(2).fill({"points":2,"guaranteed":[]}),{"points":0,"guaranteed":[6]},...Array(3).fill({"points":2,"guaranteed":[0]}),{"points":0,"guaranteed":[0,0,0,0,0,1,6],"ambush":4}],/*2-4*/[...Array(3).fill({"points":0,"guaranteed":[0]}),...Array(3).fill({"points":2,"guaranteed":[]}),...Array(3).fill({"points":2,"guaranteed":[0]}),{"points":4,"guaranteed":[0,0,0,0,0,1]},...Array(2).fill({"points":4,"guaranteed":[]}),...Array(3).fill({"points":4,"guaranteed":[0]}),...Array(3).fill({"points":6,"guaranteed":[]}),{"points":6,"guaranteed":[0]},{"points":0,"guaranteed":[0,0,0,0,0,0,0,0,1,2,4,5],"ambush":7}],/*2-5*/[],/*2-6*/[...Array(3).fill({"points":0,"guaranteed":[0]}),...Array(2).fill({"points":2,"guaranteed":[]}),{"points":0,"guaranteed":[7]},...Array(3).fill({"points":2,"guaranteed":[0]}),{"points":0,"guaranteed":[0,0,0,0,2,1,7],"ambush":7}],/*2-7*/[...Array(3).fill({"points":0,"guaranteed":[0]}),...Array(3).fill({"points":2,"guaranteed":[]}),...Array(3).fill({"points":2,"guaranteed":[0]}),{"points":4,"guaranteed":[0,0,0,0,0,1]},...Array(2).fill({"points":4,"guaranteed":[]}),...Array(3).fill({"points":4,"guaranteed":[0]}),...Array(3).fill({"points":6,"guaranteed":[]}),{"points":7,"guaranteed":[]},{"points":0,"guaranteed":[0,0,0,0,0,0,0,1,2,6,7],"ambush":11}]]]