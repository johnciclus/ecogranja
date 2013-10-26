var Node = Class.extend({
	init: function(id, lat, lng){
		this.id = id;
		this.lat = lat;
		this.lng = lng;
		this.con = [];
	},
	addCon: function(conn){
		this.con.push(conn);
	},
	remCon: function(coon){
		if(coon.id == this.con[0].id){
			this.con[0] = this.con[1];
			this.con.pop();
		}
		else if(coon.id == this.con[1].id){
			this.con.pop();
		}
	}
});

var Coord = Class.extend({
	init: function(lat, lng, alt){
		this.lat = lat;
		this.lng = lng;
		this.alt = alt;
		this.rad = this.getRad();
		this.x = this.getX();
		this.y = this.getY();
		this.z = this.getZ();
	},
	getRad: function(){
		return 6378100-(236.66*this.lat)+this.alt;
	},
	getX: function(){
		return this.rad*Sin((90-this.lat)*RAD)*Cos(this.lng*RAD);
	},
	getY: function(){
		return this.rad*Sin((90-this.lat)*RAD)*Sin(this.lng*RAD);
	},
	getZ: function(){
		return this.rad*Cos((90-this.lat)*RAD);
	}
});

var FuncLin = Class.extend({
	init: function(locOne,locTwo){
		this.x0=locOne.lng();
		this.x1=locTwo.lng();
		this.y0=locOne.lat();
		this.y1=locTwo.lat();
		this.m=(this.y1-this.y0)/(this.x1-this.x0);
		this.dom = {xi : this.x0, xf : this.x1};
	},
	eval: function(xArg){
		return this.y0+(this.m*(xArg-this.x0));
	}
});

var Triangle = Class.extend({
	init: function(locOne, locTwo, locThree){
		this.points=[];
		this.points[0]=locOne;   //new google.maps.LatLng(roundDec(locOne.lat(),5),roundDec(locOne.lng(),5));
		this.points[1]=locTwo;   //new google.maps.LatLng(roundDec(locTwo.lat(),5),roundDec(locTwo.lng(),5));
		this.points[2]=locThree; //new google.maps.LatLng(roundDec(locThree.lat(),5),roundDec(locThree.lng(),5));
		this.Functions=[];
		this.dx=0.0001;
		this.dy=0.0001;
	}
});

function initializeMap(){
	
	if(map){
		google.maps.event.clearInstanceListeners(map);
		google.maps.event.clearListeners(map, 'click');
	}
	
	map = undefined;
	elevator = undefined;
	coord_params = undefined;
	
	locations = [];
	polisArray = [];
	elevations = [];
	markersArray = [];
	
	var mapOptions = {
		zoom: 18,
		center: new google.maps.LatLng(6.99930280854,-73.062759339809),
		mapTypeId: google.maps.MapTypeId.HYBRID,
		noClear: false,
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
	
	$('#google_maps').replaceWith("<div id='google_maps'></div>");
	if ($("#google_maps").length > 0) {
    	var map_canvas=document.getElementById("google_maps");
		map_canvas.style.width = "460px";
		map_canvas.style.height = "460px";
		map_canvas.style.margin = "5px";
		map = new google.maps.Map(map_canvas,mapOptions);
		elevator = new google.maps.ElevationService();
		google.maps.event.addListener(map, 'click', getLocation);
	}
};

function getLocation(event){
	var currentLoct = event.latLng;
	var marker=new google.maps.Marker({
        position: currentLoct, 
        map: map,
        title:"Lat: "+roundDec(currentLoct.lat(),8)+", Lng: "+roundDec(currentLoct.lng(),8)
    });
    locations.push(currentLoct);
    markersArray.push(marker);
	
	if(locations.length > 1){
		if(locations.length > 2){
			polisArray[polisArray.length-1].setMap(null);
			polisArray.pop();
		};
		if(locations.length > 3){
			addCoordDiv(locations.length-1);
		};
		var union =    [locations[locations.length-2],
					    locations[locations.length-1]];
		var endUnion = [locations[locations.length-1],
					    locations[0]];
		var pathOptions = {
			path: union,
			strokeColor: '#000088',
			opacity: 0.01,
			map: map
		}
		var polyline = new google.maps.Polyline(pathOptions);
		polisArray.push(polyline);
		
		pathOptions = {
			path: endUnion,
			strokeColor: '#000088',
			opacity: 0.01,
			map: map
		}
		polyline = new google.maps.Polyline(pathOptions);
		polisArray.push(polyline);
	}
};

function roundDec(num,dec){
    var fac = Math.pow(10,dec);
    return Math.round(num*fac)/fac;
}

function distNodes(node1, node2){
	return Math.sqrt(Math.pow(node1.lng - node2.lng, 2) + Math.pow(node1.lat - node2.lat, 2));
};

function intConjuntos(list1, list2){
	var list = [];
	var exists = false;
	
	for(var i=0; i<list1.length; i++){
		for(var j=0; j<list2.length; j++){
			if(list1[i].id == list2[j].id){
				exists = true;
				j = list2.length;
			}
		}
		if(exists){
			list.push(list1[i]);
			exists = false;
		}
	}
	return list;
};

function difConjuntos(list1, list2){
	var list = [];
	var exists = false;
	
	for(var i=0; i<list1.length; i++){
		for(var j=0; j<list2.length; j++){
			if(list1[i].id == list2[j].id){
				exists = true;
				j = list2.length;
			}
		}
		if(!exists){
			list.push(list1[i]);
		}
		else{
			exists = false;
		}
	}
	return list;
};

function triangulation(loctns){
	var listNodes = [];
	var listTrian = [];
	var listTmp = [];
	
	for (var l=0; l<loctns.length; l++){
			listNodes.push(new Node(l, loctns[l].lat(), loctns[l].lng()));
		};
	for (var l=0; l<listNodes.length; l++){
		if(l == 0){
			listNodes[l].addCon(listNodes[listNodes.length-1]);
			listNodes[l].addCon(listNodes[l+1]);
		}
		else if(l == (listNodes.length-1)){
			listNodes[l].addCon(listNodes[l-1]);
			listNodes[l].addCon(listNodes[0]);
		}
		else{
			listNodes[l].addCon(listNodes[l-1]);
			listNodes[l].addCon(listNodes[l+1]);
		}
	};
	
	if (loctns.length > 3){
		
		var eleAct, eleSig, eleCon,
			distMin, distTmp;
		
		var i=0;
		
		eleAct = listNodes[0];
		
		while(i<listNodes.length - 3){
			for(var c=0; c<2; c++){
				for(var cc=0; cc<2; cc++){
					listTmp.push(eleAct.con[c].con[cc]);
				}
			}
			listTmp = difConjuntos(listTmp, [eleAct]);
					
			distMin = distNodes(eleAct, listTmp[0]);
			eleSig = listTmp[0];
			distTmp = distNodes(eleAct, listTmp[1]);
			if(distTmp < distMin){
				eleSig = listTmp[1];
			}
			
			eleCon = intConjuntos(eleAct.con, eleSig.con);
			
			if(eleCon){
				eleCon = eleCon[0];
				listTrian.push(new Triangle(eleAct, eleSig, eleCon));
				eleCon.remCon(eleAct);
				eleCon.remCon(eleSig);
				eleAct.remCon(eleCon);
				eleAct.addCon(eleSig);
				eleSig.remCon(eleCon);
				eleSig.addCon(eleAct);
			}
			
			listTmp = difConjuntos(eleAct.con, [eleSig]);
			eleAct = eleSig;
			eleSig = listTmp[0];
			listTmp = [];
			i++;
		}
		eleCon = intConjuntos(eleAct.con, eleSig.con);
		if(eleCon){
			eleCon = eleCon[0];
			listTrian.push(new Triangle(eleAct, eleSig, eleCon));
			eleCon.remCon(eleAct);
			eleCon.remCon(eleSig);
			eleAct.remCon(eleCon);
			eleAct.addCon(eleSig);
			eleSig.remCon(eleCon);
			eleSig.addCon(eleAct);
		}
		return listTrian;
	}
	else if(loctns.length == 3){
		listTrian.push(new Triangle(listNodes[0], listNodes[1], listNodes[2]));
		return listTrian;	
	}
	else{
		return false;
	}
};

function elevations_request (results, status) {
	if (status == google.maps.ElevationStatus.OK) {
        if (results.length!=0) {
            elevations = [];
            for(var i=0; i<results.length; i++){
            	elevations.push(results[i].elevation);
            }
            elevations_complete();
        } else {
            alert("No se encontraron resultados");
        }
    } else {
    	alert("El servicio de obtención de elevación falló: " + status);
    }
};

function elevations_complete(){
	var lat_avg   = 0;
	var lng_avg   = 0;
	var alt_avg   = 0;
	var slope_avg = 0
	var area, coord_avg, dist, dif_alt;
	
	area = google.maps.geometry.spherical.computeArea(locations);
	
	for(var i=0; i<locations.length; i++){
		lat_avg+=locations[i].lat();
	}
	lat_avg/=locations.length;
	
	for(var i=0; i<locations.length; i++){
		lng_avg+=locations[i].lng();
	}
	lng_avg/=locations.length;
	
	for(var i=0; i<elevations.length; i++){
		alt_avg+=elevations[i];
	}
	alt_avg/=elevations.length;
	
	coord_avg = new google.maps.LatLng(lat_avg, lng_avg);
	
	for(var i=0; i<locations.length; i++){
		dist 	= google.maps.geometry.spherical.computeDistanceBetween(coord_avg, locations[i]);
		dif_alt = Math.abs(alt_avg-elevations[i]);
		slope_avg += dif_alt/dist;
	}
	slope_avg/=locations.length;
	
	$('#'+coord_params.area).val(area);
	$('#'+coord_params.loc_lat).val(lat_avg);
	$('#'+coord_params.loc_lng).val(lng_avg);
	$('#'+coord_params.loc_alt).val(alt_avg);
	$('#'+coord_params.avg_slope).val(slope_avg);
	for(var i=0; i<coord_params.coord_count; i++){
		$('#'+coord_params.coord+'_'+i+'_lat').val(locations[i].lat());
		$('#'+coord_params.coord+'_'+i+'_lng').val(locations[i].lng());
		$('#'+coord_params.coord+'_'+i+'_alt').val(elevations[i]);
	}
};

function setCoordinates(params){
	var lisTriangles = triangulation(locations);
	
	if(lisTriangles){
		for(var t=0; t<lisTriangles.length; t++){ 
			var p0 = lisTriangles[t].points[0].id,
				p1 = lisTriangles[t].points[1].id,
				p2 = lisTriangles[t].points[2].id;
			
			var path = [locations[p0], locations[p1], locations[p2], locations[p0]];
			
			var pathOptions = {
				path: path,
				strokeColor: '#880000',
				opacity: 0.01,
				map: map
			}
			var polyline = new google.maps.Polyline(pathOptions);
		};
		coord_params = params;
		var positionalRequest = {
		    'locations': locations
		}
		elevator.getElevationForLocations(positionalRequest, elevations_request);
	}
}

function addCoordDiv(id){
	$('#farm .actions').before(
	"<fieldset class='ui-state-default ui-corner-all'>"+
    "	<legend>Coordenada "+(id+1)+" </legend>"+
    "	<input id='farm_coordinates_attributes_"+(id)+"_ind' name='farm[coordinates_attributes]["+(id)+"][ind]' type='hidden' value='"+(id)+"'>"+
	"    <div class='cell'>"+
	"    	<label for='farm_coordinates_attributes_"+(id)+"_lat' class='ui-state-default ui-corner-all'>Latitud</label><br>"+
	"    	<input id='farm_coordinates_attributes_"+(id)+"_lat' name='farm[coordinates_attributes]["+(id)+"][lat]' size='30' type='text' class='ui-widget-content'>"+
	"    </div>"+
	"    <div class='cell'>"+
	"    	<label for='farm_coordinates_attributes_"+(id)+"_lng' class='ui-state-default ui-corner-all'>Longitud</label><br>"+
	"    	<input id='farm_coordinates_attributes_"+(id)+"_lng' name='farm[coordinates_attributes]["+(id)+"][lng]' size='30' type='text' class='ui-widget-content'>"+
	"    </div>"+
	"    <div class='cell'>"+
	"    	<label for='farm_coordinates_attributes_"+(id)+"_alt' class='ui-state-default ui-corner-all'>Altitud</label><br>"+
	"    	<input id='farm_coordinates_attributes_"+(id)+"_alt' name='farm[coordinates_attributes]["+(id)+"][alt]' size='30' type='text' class='ui-widget-content'>"+
	"    </div>"+
    "</fieldset>");
}

var map;
var locations = [];
var markersArray = [];
var polisArray = [];
var elevations = [];
var coord_params;
