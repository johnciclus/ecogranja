(function(){				//Def Coord 
	Coord = function(lat,lng,alt)
	{
		this.lat=lat;
		this.lng=lng;
		this.alt=alt;
		this.rad=this.getRad();
		this.x=this.getX();
		this.y=this.getY();
		this.z=this.getZ();
	};
	Coord.prototype =
	{
		getX: function(){
			return this.rad*Sin((90-this.lat)*RAD)*Cos(this.lng*RAD);
		},
		getY: function(){
			return this.rad*Sin((90-this.lat)*RAD)*Sin(this.lng*RAD);
		},
		getZ: function(){
			return this.rad*Cos((90-this.lat)*RAD);
		},
		getRad: function(){
			return 6378100-(236.66*this.lat)+this.alt;
		}
	};
})();
(function(){ 				//Def FuncLin
	FuncLin = function(locOne,locTwo){
		this.x0=locOne.lng();
		this.x1=locTwo.lng();
		this.y0=locOne.lat();
		this.y1=locTwo.lat();
		this.m=(this.y1-this.y0)/(this.x1-this.x0);
		this.dom = {xi : this.x0, xf : this.x1};
	};
	FuncLin.prototype = {
		eval: function(xArg){
			return this.y0+(this.m*(xArg-this.x0));
		}
	};
})();
(function(){ 				//Def Sector
	Sector = function(locOne,locTwo,locThree){
		this.points=[];
		this.points[0]=new google.maps.LatLng(roundDec(locOne.lat(),5),roundDec(locOne.lng(),5));
		this.points[1]=new google.maps.LatLng(roundDec(locTwo.lat(),5),roundDec(locTwo.lng(),5));
		this.points[2]=new google.maps.LatLng(roundDec(locThree.lat(),5),roundDec(locThree.lng(),5));
		this.Functions=[];
		this.dx=0.0001;
		this.dy=0.0001;
	};
	Sector.prototype = {
		getPointsMap: function(){
			var Map=[];
			var ordLng=[0,1,2];
			var ordLat=[0,1,2];
			var ordAsc=true;
			var aux;
			for(var i=0; i<2; i++){
				for(var j=i+1;j<3;j++){
					if(this.points[ordLng[j]].lng()<this.points[ordLng[i]].lng()){
						aux=ordLng[i];
						ordLng[i]=ordLng[j];
						ordLng[j]=aux;
					}
				}
			}
			for(var i=0; i<2; i++){
				for(var j=i+1;j<3;j++){
					if(this.points[ordLat[j]].lat()<this.points[ordLat[i]].lat()){
						aux=ordLat[i];
						ordLat[i]=ordLat[j];
						ordLat[j]=aux;
					}
				}
			}
			this.Functions[0]=new FuncLin(this.points[ordLng[0]],this.points[ordLng[2]]);	//Identifica la función base
			this.Functions[1]=new FuncLin(this.points[ordLng[0]],this.points[ordLng[1]]);	//Identifica la función izquierda
			this.Functions[2]=new FuncLin(this.points[ordLng[1]],this.points[ordLng[2]]);	//Identifica la función derecha
			if(this.Functions[0].eval(this.points[ordLng[1]].lng())>this.points[ordLng[1]].lat()){
				ordAsc=false;
				this.dy*=-1;
			}
			var x,y;
			var limX,limY;
			var dxAux,dyAux;
			var numPtsX;
			var numPtsY;
            var auxPts=0;
            
            for(var s=0;s<2;s++){
                x=this.points[ordLng[s]].lng(); 
                y=this.Functions[0].eval(x);
                limX=this.points[ordLng[s+1]].lng();
                limY=this.Functions[s+1].eval(x);
                
                numPtsX=Math.round((limX-x)/this.dx);
                if(numPtsX>0){dxAux=(limX-x)/numPtsX;}
                else if(numPtsX<0){dxAux=(limX-x);numPtsX=1}
                else{dxAux=0;}
                dxAux=roundDec(dxAux,5);
                
                numPtsY=Math.round((limY-y)/this.dy);
                if(numPtsY>0){dyAux=(limY-y)/numPtsY;}
                else if(numPtsY<0){dyAux=(limY-y);numPtsY=1}
                else{dyAux=0;}
                dyAux=roundDec(dyAux,5);
                
    			for(var idx=0;idx<numPtsX+s;idx++){
    			    Map[idx+auxPts]=[];
    			    for (var idy=0;idy<=numPtsY;idy++) {
    				   Map[idx+auxPts][idy]=new google.maps.LatLng(y,x);
    				   /*var circle = new google.maps.Circle({
                                    map: map,
                                    center: Map[idx+auxPts][idy],
                                    strokeColor: "#FFFFFF",
                                    clickable: false,
                                    radius: 1 
                       });*/
    				   y+=dyAux;
    				};
    			    x+=dxAux;
                    y=this.Functions[0].eval(x);
                    limY=this.Functions[s+1].eval(x);
                    numPtsY=Math.round((limY-y)/this.dy);
                    if(numPtsY>0){dyAux=(limY-y)/numPtsY;}
                    else if(numPtsY<0){dyAux=(limY-y);numPtsY=1}
                    else{dyAux=0;}
    			};
    			auxPts=numPtsX;
			};
			return Map;
		}
	};
})();
(function(){				//Def Relationer
	Relationer = function(){
		this.rel = [];
	};
	Relationer.prototype = {
		addRel: function(firstNod,seconNod){
			var lngth;
			if(!this.rel[firstNod]){
				this.rel[firstNod]=[];
			}
			lngth = this.rel[firstNod].length;
			this.rel[firstNod][lngth]=seconNod;
			if(!this.rel[seconNod]){
				this.rel[seconNod]=[];
			}
			lngth = this.rel[seconNod].length;
			this.rel[seconNod][lngth]=firstNod;
			
			/*var txt="";
			for(var i=0;i<this.rel.length;i++){
				txt+="["+i+"] : "+this.rel[i]+"  # : "+this.rel[i].length+"\n";
			}
			alert(txt);*/
		},
		getRels: function(idxNod){
			if(this.rel[idxNod]){
				return this.rel[idxNod];
			}
			else{
				return [];
			}
		},
		getlngRelNod: function(idxNod){
			if(this.rel[idxNod]){
				return this.rel[idxNod].length;
			}
			else{
				return 0;
			}
		},
		getLesLonRels: function(idxNod){
			if(this.rel[idxNod]){
				var rst=[];
				var rcn=this.getRels(idxNod);
				var min=this.getlngRelNod(rcn[0]);
				for(var i=1;i<rcn.length;i++){
					min=Math.min(this.getlngRelNod(rcn[i]),min);
				}
				for(var i in rcn){
					if(this.getlngRelNod(rcn[i])==min){
						rst.push(rcn[i]);
					}
				}
				return rst;
			}
			else{
				return [];
			}
		},
		getNotRels: function(idxNod){
			if(this.rel[idxNod]){
				var rst=[];
				var rcn=this.getRels(idxNod);
				var val=true;
				for(var i in this.rel){
					if(i!=idxNod){
						for(var j in rcn){
							if(i==rcn[j]){
								val=false;
								j=rcn.length;
							}
						}
						if(val){
							rst.push(i);
						}
						else{
							val=true;
						}
					}
				}
				
				return rst;
			}
			else{
				return [];
			}
		},
		getNods: function(){
			var rst=[];
			for(var i in this.rel){
				if(this.rel[i]){
					rst.push(i);
				}
			}
			return rst;
		},
		getExcNods: function(nodsExc){
			var rst=[];
			var val=true;
			for(var i in this.rel){
				if(this.rel[i]){
					for(var j in nodsExc){
						if(i==nodsExc[j]){
							val=false;
							j=nodsExc.length;
						}
					}
				}
				if(val){
					rst.push(i);
				}
				else{
					val=true;
				}
			}
			return rst;
		},
		remRel: function(firstNod,seconNod){
			if(this.rel[firstNod]){
				for(var i in this.rel[firstNod]){
					if(this.rel[firstNod][i]==seconNod){
						this.rel[firstNod].splice(i,1);
						this.quantity[firstNod]--;
					}
				}
			}
			if(this.rel[seconNod]){
				for(var i in this.rel[seconNod]){
					if(this.rel[seconNod][i]==firstNod){
						this.rel[seconNod].splice(i,1);
						this.quantity[seconNod]--;
					}
				}
			}
		}
	};
})();

window.addEventListener('load', initialize, false);
window.addEventListener('load', onloadHandler, false);

var map;
var elevator;
var clickedLocs = [];
var markersArray = [];
var polisArray = [];
var functns = [];
var sectors = [];
var MapCoord = [];
var MapsSec =[];
var canvas;
var k3dmain;
var reltnr;					//Relacionador de elementos
var resizeToogle=false;

$(document).ready(function(){
	$("#resize").click(function(){
		if(resizeToogle){
			$("#canvas").animate({
				width:"200px",
				height:"200px",
				top: "372px",
				left: "274px"
			},1000);
			resizeToogle=false;
		}else{
			$("#canvas").animate({
				width:"460px",
				height:"460px",
				top: "132px",
				left: "15px"
			},1000);
			resizeToogle=true;
		};
		//k3dmain.fillStyle = "rgba(128,128,128, 1.0)"; 
		k3dmain.tick();
	});
	//$("#ingresar").click(function(){
	//	$("#autenficacion").css('display','block');
	//});
});
function roundDec(num,dec){
    var fac = Math.pow(10,dec);
    return Math.round(num*fac)/fac;
}
function sectorization(){
	var rcn;		//
	var lessDist;	//
	var distAux;	//	
	var nodoAux;
	var nodInt;
	var nodoAct=0;
	var ver=[];
	var cant = clickedLocs.length;
	for(var i=0;i<cant-1;i++){
		reltnr.addRel(i,i+1);
		functns.push(new FuncLin(clickedLocs[i],clickedLocs[i+1]));
	}
	reltnr.addRel(cant-1,0);
	functns.push(new FuncLin(clickedLocs[cant-1],clickedLocs[0]));
	for(var i=0;i<cant-2;i++){
		ver[0]=nodoAct;
		rcn=reltnr.getLesLonRels(nodoAct);
		if(ver[1]){
			for(var j in rcn){
				if(rcn[j]==ver[1]){
					rcn.splice(j,1);
				}
			}
		}
		lessDist=distNod(clickedLocs[nodoAct],clickedLocs[rcn[0]]);
		nodoAux=rcn[0];
		for(var j=1;j<rcn.length;j++){
			distAux=distNod(clickedLocs[nodoAct],clickedLocs[rcn[j]]);
			if(distAux<lessDist){
				lessDist=distAux;
				nodoAux=rcn[j];
			}
		}
		nodoAct=nodoAux;
		ver[1]=nodoAct;
		rcn=reltnr.getExcNods([ver[0],ver[1]]);
		nodInt=getIntrsctn(nodoAct,rcn);
		for(var j in rcn){
			for(k in nodInt){
				if(rcn[j]==nodInt[k]){
					rcn.splice(j,1);
				}
			}
		}
		nodoAux=rcn[0];
		lessDist=distNod(clickedLocs[nodoAct],clickedLocs[nodoAux]);
		for(var j=1;j<rcn.length;j++){
			distAux=distNod(clickedLocs[nodoAct],clickedLocs[rcn[j]]);
			if(distAux<lessDist){
				lessDist=distAux;
				nodoAux=rcn[j];
			}
		}
		nodoAct=nodoAux;
		ver[2]=nodoAct;
		sectors.push(new Sector(clickedLocs[ver[0]],clickedLocs[ver[1]],clickedLocs[ver[2]]));
		if(cant-3>i){
			reltnr.addRel(ver[2],ver[0])
			functns.push(new FuncLin(clickedLocs[ver[2]],clickedLocs[ver[0]]));		
		}
	}
	MapsSec=[];
	for(var i in sectors){
		MapsSec.push(sectors[i].getPointsMap());
	};
};
function distNod(FirNod,SecNod){
	return Math.sqrt(Math.pow(FirNod.lng()-SecNod.lng(),2)+Math.pow(FirNod.lat()-SecNod.lat(),2));
};
function getIntrsctn(nodoAct,rcn){
	var nodInt=[];
	var val=true;
	var funcAux;
	var x;
	for(var i in rcn){
		funcAux = new FuncLin(clickedLocs[nodoAct], clickedLocs[rcn[i]]);
		for(var j in functns){
			val=true;
			x=(funcAux.y0-functns[j].y0+(functns[j].x0*functns[j].m)-(funcAux.x0*funcAux.m))/(functns[j].m-funcAux.m);
			if(!(funcAux.dom.xi>x)||!(funcAux.dom.xf<x)){
				val=false;
				j=functns.length;
			}
			else if(!(functns[j].dom.xi>x)||!(functns[j].dom.xf<x)){
				val=false;
				j=functns.length;
			}
		}
		if(val){
			nodInt.push(rcn[i])
		}
	}
	return nodInt;
};
K3D.Controller.prototype.removeK3DObject = function(){
	this.objects.pop();
};

function initialize(){
	var mapOptions = {
		zoom: 18,
		center: new google.maps.LatLng(6.99930280854,-73.062759339809),
		mapTypeId: google.maps.MapTypeId.HYBRID,
		panControl: false,
		streetViewControl: false,
		mapTypeControl: true,
		mapTypeControlOptions: {
      		style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
    	},
		zoomControl: true,
  		zoomControlOptions: {
    		style: google.maps.ZoomControlStyle.SMALL
  		},
  		disableDoubleClickZoom: true
	};
	if ($("#google_maps").length > 0) {
    	var map_canvas=document.getElementById("google_maps");
		map_canvas.style.width = "460px";
		map_canvas.style.height = "460px";
		map_canvas.style.margin = "5px";
		map = new google.maps.Map(map_canvas,mapOptions);
		elevator = new google.maps.ElevationService();
		google.maps.event.addListener(map, 'click', getElevation);
		reltnr = new Relationer();
	}
};
function getElevation(event){
	var currentLoct = event.latLng;
	var marker=new google.maps.Marker({
        position: currentLoct, 
        map: map,
        title:"Lat: "+currentLoct.lat()+", Lng: "+currentLoct.lng()
    });
    markersArray.push(marker);
	clickedLocs.push(currentLoct);
		
	if(clickedLocs.length==1){
		if($("#new_farm").length == 1){
			$("#farm_loc_lat").val(currentLoct.lat());	
			$("#farm_loc_lng").val(currentLoct.lng());
			$("#farm_area").val(0);
			$("#lat_0").val(currentLoct.lat());
			$("#lng_0").val(currentLoct.lng());
		}
	}
    else if (clickedLocs.length==2) {
		var proLat=0;
		var proLng=0;
		for(var i=0; i<2; i++){
			proLat+=clickedLocs[i].lat()
			proLng+=clickedLocs[i].lng()
		}
		if($("#new_farm").length == 1){
			$("#farm_loc_lat").val(proLat/2);	
			$("#farm_loc_lng").val(proLng/2);
			$("#farm_area").val(0);
			$("#lat_1").val(currentLoct.lat());
			$("#lng_1").val(currentLoct.lng());
		}
		var pathOptions = {
		  path: clickedLocs,
		  strokeColor: '#000088',
		  opacity: 0.01,
		  map: map
		}
		var polyline = new google.maps.Polyline(pathOptions);
		polisArray.push(polyline);
	}
	else if(clickedLocs.length>2){
		if(clickedLocs.length==3){
			var proLat=0;
			var proLng=0;
			for(var i=0; i<3; i++){
				proLat+=clickedLocs[i].lat()
				proLng+=clickedLocs[i].lng()
			}
			$("#farm_loc_lat").val(proLat/3);	
			$("#farm_loc_lng").val(proLng/3);
			
			$("#farm_area").val(10);
			
			$("#lat_2").val(currentLoct.lat());
			$("#lng_2").val(currentLoct.lng());
		}
		else if(clickedLocs.length>3){
			polisArray[clickedLocs.length-2].setMap(null);
			polisArray.pop();
		}
		pathOptions = {
			path: [clickedLocs[clickedLocs.length-2],clickedLocs[clickedLocs.length-1]],
			strokeColor: '#000088',
			opacity: 0.01,
			map: map
		}
		var polyline = new google.maps.Polyline(pathOptions);
		polisArray.push(polyline);
		pathOptions = {
			path: [clickedLocs[clickedLocs.length-1],clickedLocs[0]],
			strokeColor: '#000088',
			opacity: 0.05,
			map: map
		}
		var polyline = new google.maps.Polyline(pathOptions);
		polisArray.push(polyline);
		
		if(clickedLocs.length==3){
	        sectorization();
	        var locations;
	        for(var i in MapsSec[0]){
	            locations=[];
	            for(var j in MapsSec[0][i]){
	                locations.push(MapsSec[0][i][j]);
	            };
	            var positionalRequest = {
	                'locations': locations
	            }
	            elevator.getElevationForLocations(positionalRequest, function(results, status) {
	            if (status == google.maps.ElevationStatus.OK) {
	                if (results.length!=0) {
	                    
	                    var coordRow=[]; 
	                    for(var j=0;j<results.length;j++){
	                        coordRow[j]=new Coord(roundDec(results[j].location.lat(),5),roundDec(results[j].location.lng(),5),roundDec(results[j].elevation,5));
	                    }
	                    loadMapCoord(coordRow);
	                } else {
	                    alert("No results found");
	                }
	            } else {
	                alert("Elevation service failed due to: " + status);
	            }});
        	};
		};
	};
};
function onloadHandler(){
   if ($("#canvas").length>0) {
	   canvas = document.getElementById('canvas');
	   canvas.addEventListener('mousedown', onDocumentMouseDown, false);
	   k3dmain = new K3D.Controller(canvas, true);
	   k3dmain.fps = 60;
	   k3dmain.fillStyle = "rgba(255,255,255, 0.01)";  
	   k3dmain.paused = false;
	   k3dmain.tick();
   }
};
function loadMapCoord(coordRow){
    var val=true;
    var id;
    var lat,lng;
    for(var i in MapsSec[0]){
        lat=roundDec(MapsSec[0][i][0].lat(),5);
        lng=roundDec(MapsSec[0][i][0].lng(),5);
        if((lat==coordRow[0].lat)&&(lng==coordRow[0].lng)){
            id=i;
            i=MapsSec[0].length;    
        }
    };
    if(!id){
        alert("fallo");
    }
    if(!MapCoord[0]){
        MapCoord[0]=[];
    }
    if(!MapCoord[0][id]){
        MapCoord[0][id]=coordRow;
    }
    for (var i in MapsSec[0]) {
        if(!MapCoord[0][i]){
            val=false;
            i=MapsSec[0].length;
        }
    };
    if(val){
       plotSectors();   
    }
};
function plotSectors(){
    var lng=0;
    var xMed = MapCoord[0][0][0].x, yMed=MapCoord[0][0][0].y, zMed=MapCoord[0][0][0].z;
    var xMin = MapCoord[0][0][0].x, yMin=MapCoord[0][0][0].y, zMin=MapCoord[0][0][0].z;
    var xMax = MapCoord[0][0][0].x, yMax=MapCoord[0][0][0].y, zMax=MapCoord[0][0][0].z;
    for(var i in MapCoord[0]){
        var j=0;
        if(i==0){j=1;}
        for(;j<MapCoord[0][i].length;j++){
            xMed+=MapCoord[0][i][j].x;
            yMed+=MapCoord[0][i][j].y;
            zMed+=MapCoord[0][i][j].z;
            xMin=Math.min(MapCoord[0][i][j].x,xMin);
            xMax=Math.max(MapCoord[0][i][j].x,xMax);
            yMin=Math.min(MapCoord[0][i][j].y,yMin);
            yMax=Math.max(MapCoord[0][i][j].y,yMax);
            zMin=Math.min(MapCoord[0][i][j].z,zMin);
            zMax=Math.max(MapCoord[0][i][j].z,zMax);
        };
        lng+=MapCoord[0][i].length; 
    };
    xMed/=lng;
    yMed/=lng;
    zMed/=lng;
    /*alert("x: "+xMin+", "+xMed+", "+xMax+"\n"+
          "y: "+yMin+", "+yMed+", "+yMax+"\n"+
          "z: "+zMin+", "+zMed+", "+zMax);*/
    
    var maxDif = Math.max(xMax-xMin,yMax-yMin,zMax-zMin);
    var red=250/maxDif;
    var c=0;
    
    var obj = new K3D.K3DObject();
    
    var points = [], edges = [], polys = [];
    obj.color = [0,200,0];
    obj.drawmode = "solid";
    obj.shademode = "depthcue";
    //obj.ophi = 10.0;
    //obj.otheta = 45.0;
    //obj.ogamma = 10.0;
    obj.doublesided = true;
    obj.recalculateNormals = true;
    obj.aboutx = -1.0*xMed*red;
    obj.abouty = -1.0*yMed*red;
    obj.aboutz = -1.0*zMed*red;
    obj.scale = red;
    
    var ptsAux=0;
    var cantAnt=0;
    var cantAct=0;
    var cantSig=0;
    
    for(var i=0;i<MapCoord[0].length;i++){
        if(i>0){
            cantAnt=MapCoord[0][i-1].length;
            cantAct=MapCoord[0][i].length;
            cantSig=0; 
            if(MapCoord[0][i+1]){ cantSig=MapCoord[0][i+1].length; }
        }
        for(var j=0;j<MapCoord[0][i].length;j++){
            points.push({  x: MapCoord[0][i][j].x, 
                           y: MapCoord[0][i][j].y, 
                           z: MapCoord[0][i][j].z });
            if (i>0){
                if(j<cantAct-1){
                    edges.push( {a: c, b: c+1} );
                }
                else{
                    var dif=0;
                    if(cantAct>cantAnt){
                        edges.push( {a: c-cantAct-ptsAux, b: c} );
                        dif=cantAct-cantAnt;
                        polys.push( {vertices:[c-cantAct-ptsAux,c, c-dif]} );
                        ptsAux=0;
                    }
                    else if(cantAct<cantAnt){
                        if(cantAct!=1||cantSig==0){
                            edges.push( {a: c-cantAct, b: c} );
                            dif=cantAnt-cantAct;
                            polys.push( {vertices:[c-cantAct-dif, c-cantAct, c]} );
                        } 
                    }
                    else{
                        if(cantAct==1){
                            ptsAux++;
                            if(cantSig==0){
                                if(c>ptsAux){
                                    edges.push( {a: c-ptsAux-1, b: c} );
                                    polys.push( {vertices:[c-ptsAux-2, c-ptsAux-1, c]} );
                                }
                            }
                        }else{
                            edges.push( {a: c-cantAct, b: c} );
                        }
                    }
                }
                if(j!=0){
                    if(cantAct>cantAnt){
                        if(j<cantAnt){
                            edges.push( {a: c, b: c-cantAnt} );
                            polys.push( {vertices:[c-cantAnt-1, c-cantAnt, c, c-1]} );
                        }
                    }
                    else if(cantAnt>cantAct){
                        if(j<cantAct){
                            edges.push( {a: c, b: c-cantAnt} );
                            polys.push( {vertices:[c-cantAnt-1, c-cantAnt, c, c-1]} );
                        }
                    }
                    else{
                        polys.push( {vertices:[c-cantAnt-1, c-cantAnt, c, c-1]} );
                        if(j<cantAct-1){
                            edges.push( {a: c, b: c-cantAnt} );
                        }
                    }                                                
                }
                else{
                    edges.push( {a: c, b: c-cantAnt} );
                }
            }
            c++;
        };
    };
    obj.init(
        points,
        edges,
        polys
    );
    
    k3dmain.callback = function(){
      obj.ophi += (targetRotationX - (obj.ophi * RAD))/2;
      obj.otheta += (targetRotationY - (obj.otheta * RAD))/2;
    };
    k3dmain.addK3DObject(obj);
    k3dmain.paused = false;
    k3dmain.tick();
};

// nifty drag/touch event capture code borrowed from Mr Doob http://mrdoob.com/

var targetRotationX = 0;
var targetRotationOnMouseDownX = 0;
var mouseX = 0;
var mouseXOnMouseDown = 0;
var targetRotationY = 0;
var targetRotationOnMouseDownY = 0;
var mouseY = 0;
var mouseYOnMouseDown = 0;

var windowHalfX = 200 / 2;
var windowHalfY = 200 / 2;

function onDocumentMouseDown( event ) {

	event.preventDefault();
	
	canvas.addEventListener('mousemove', onDocumentMouseMove, false);
	canvas.addEventListener('mouseup', onDocumentMouseUp, false);
	canvas.addEventListener('mouseout', onDocumentMouseOut, false);
	
	mouseXOnMouseDown = event.clientX - windowHalfX;
	targetRotationOnMouseDownX = targetRotationX;
	mouseYOnMouseDown = event.clientY - windowHalfY;
	targetRotationOnMouseDownY = targetRotationY;
}

function onDocumentMouseMove( event )
{

	mouseX = event.clientX - windowHalfX;
	targetRotationX = targetRotationOnMouseDownX + (mouseX - mouseXOnMouseDown) * 0.02;
	mouseY = event.clientY - windowHalfY;
	targetRotationY = targetRotationOnMouseDownY + (mouseY - mouseYOnMouseDown) * 0.02;
}

function onDocumentMouseUp( event )
{

	document.removeEventListener('mousemove', onDocumentMouseMove, false);
	document.removeEventListener('mouseup', onDocumentMouseUp, false);
	document.removeEventListener('mouseout', onDocumentMouseOut, false);
}

function onDocumentMouseOut( event )
{

	document.removeEventListener('mousemove', onDocumentMouseMove, false);
	document.removeEventListener('mouseup', onDocumentMouseUp, false);
	document.removeEventListener('mouseout', onDocumentMouseOut, false);
}

var KEY = { SHIFT:16, CTRL:17, ESC:27, RIGHT:39, UP:38, LEFT:37, DOWN:40, SPACE:32, A:65, E:69, L:76, P:80, R:82, Z:90 };

document.onkeydown = function(event)
{
  var keyCode = (event === null ? window.event.keyCode : event.keyCode);
      
  switch (keyCode)
  {
     case KEY.SPACE:
     {
        var obj = k3dmain.objects[0];
        switch (obj.drawmode)
        {
            case "point":
                obj.shademode = "depthcue";
                obj.drawmode = "wireframe";
            break;
            case "wireframe":
                obj.shademode = "depthcue";//"lightsource";
                obj.drawmode = "solid";
            break;
            case "solid":
                obj.shademode = "depthcue";
                obj.drawmode = "point";
            break;
        }
        break;
     }
  }
};

