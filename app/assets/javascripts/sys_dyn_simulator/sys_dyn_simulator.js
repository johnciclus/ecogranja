/********************************
Librerias Integradas de Evolucion
********************************/
var PI = Math.PI;
var TRUE= true;
var FALSE= false;
var LN2= Math.LN2;
function ABS(x){
	return Math.abs(x);
}
function ACOS(x){
	return Math.acos(x);
}
function ACOSH(x){
	return Math.log(x + Math.sqrt(x * x - 1));
}
function AND(){
	var rst;
	if(arguments[0]==0 || arguments[0]==1 || typeof(arguments[0])=="boolean"){
			rst=arguments[0];
		}
		else{
			return undefined;
		}
	for(var i=1; i<arguments.length; i++){
		if(arguments[i]==0 || arguments[i]==1 || typeof(arguments[i])=="boolean"){
			rst*=arguments[i];
		}
		else{
			return undefined;
		}
	}
	return rst;
}
function ASIN(x){
	return Math.asin(x);
}
function ASINH(x){
	return Math.log(x + Math.sqrt(x * x + 1));
}
function ATAN(x){
	return Math.atan(x);
}
function ATANH(x){
	return 0.5 * Math.log((1 + x) / (1 - x))
}
function BINOM(n,k){
	if(n>=0 && k>=0 && (n-k)>=0){
		return FACT(n)/((FACT(k))*(FACT(n-k)));
	}
	else{
		return undefined;
	}
}
function BOOL(x){
	if(x>0){
		return true;
	}
	else{
		return false;
	}
}
function CHS(x){
	return -x;
}
function COS(x){
	return Math.cos(x);
}
function COSH(x){
	return (Math.exp(x) + Math.exp(-x)) / 2; 
}
function COSWAVE(amplitud,periodo,t){
	if(periodo>0){
		return amplitud*COS(2*PI*(t/periodo));
	}
	else{
		return undefined; 
	}
}
function COTAN(x){
	return 1/Math.tan(x);
}
function CUBE(x){
	return x*x*x;
}
function DEGTOGRAD(x){
	return 100*(x/90);
}
function DEGTORAD(x){
	return PI*(x/180);
}
function EXP(x){
	return Math.exp(x);
}
function EXPRND(media){
	var lambda = 1/media;
	return (-1*Math.log(Math.random()))/lambda;
}
function FACT(x){
	var rst=x;
	if(x==0){
		return 1;
	}
	else if(x<0){
		return undefined;
	}
	for(var i=x-1; i>=1; i--){
		rst*=i;
	}
	return rst;
}
function FRAC(x){
	return x-INT(x);
}
function int(x){
	return parseInt(roundDec(x,10));
}
function INT(x){
	return parseInt(roundDec(x,10));
}
function GRADTODEG(x){
	return 90*(x/100);
}
function GRADTORAD(x){
	return PI*(x/200);
}
function IF(condicion,valor1,valor2){
	if(condicion){
		return valor1;
	}
	else{
		return valor2;
	}
}
function INTLINEAL(){
	var tipoExtra, x1, dx, y=[];;
	if(arguments.length>=4){
		if(isFinite(arguments[0])){
			tipoExtra=arguments[0];
		}
		else{
			return undefined;
		}
		if(isFinite(arguments[1])){
			x1=arguments[1];
		}
		else{
			return undefined;
		}
		if(isFinite(arguments[2])){
			dx=arguments[2];
		}
		else{
			return undefined;
		}
		for(var i=3;i<arguments.length;i++){
			if(isFinite(arguments[i])){
				y.push(arguments[i]);
			}
			else{
				return undefined;
			}
		}
	}
	function evalIntLineal(x){
		var y1;
		var x2=x1+(dx*(y.length-1));
		if(x<x1 || x>x2){
			switch(tipoExtra){
				case 0:		//ciclica
					if(x<x1){
						x=x2+((x-x2)%(x1-x2));
					}
					else if(x>x2){
						x=x1+((x-x1)%(x2-x1));
					}
					y1=evalIntLineal(x);
				break;
				case 1:		//nula
					y1=0;
				break;
				case 2:		//extremos
					if(x<x1){
						y1=y[0];
					}
					else if(x>x2){
						y1=y[y.length-1];
					}
				break;
			}
		}
		else{
			var xa, ya, xs, ys;
			var ind=roundDec(((x-x1)/dx),4);
			ind=INT(ind);
			if(ind==(y.length-1)){
				ind--;
			}	
			xa=ind*dx;
			xs=(ind+1)*dx;
			ya=y[ind];
			ys=y[ind+1];
			y1=((ys-ya)/(xs-xa))*(x-xa)+ya;
			//alert(x+'-'+xa+'-'+xs+'-'+ya+'-'+ys);
		}
		return y1;
	}
	return evalIntLineal;
}
function INTPASO(){
	var tipoExtra, x1, dx, y=[];;
	if(arguments.length>=4){
		if(isFinite(arguments[0])){
			tipoExtra=arguments[0];
		}
		else{
			return undefined;
		}
		if(isFinite(arguments[1])){
			x1=arguments[1];
		}
		else{
			return undefined;
		}
		if(isFinite(arguments[2])){
			dx=arguments[2];
		}
		else{
			return undefined;
		}
		for(var i=3;i<arguments.length;i++){
			if(isFinite(arguments[i])){
				y.push(arguments[i]);
			}
			else{
				return undefined;
			}
		}
	}
	function evalIntPaso(x){
		var y1;
		var x2=x1+(dx*(y.length-1));
		if(x<x1 || x>x2){
			switch(tipoExtra){
				case 0:		//ciclica
					if(x<x1){
						x=x2+((x-x2)%(x1-x2));
					}
					else if(x>x2){
						x=x1+((x-x1)%(x2-x1));
					}
					y1=evalIntPaso(x);
				break;
				case 1:		//nula
					y1=0;
				break;
				case 2:		//extremos
					if(x<x1){
						y1=y[0];
					}
					else if(x>x2){
						y1=y[y.length-1];
					}
				break;
			}
		}
		else{
			var ind=roundDec(((x-x1)/dx),4);
			ind=INT(ind);
			if(ind==(y.length-1)){
				ind--;
			}
			y1=y[ind];
		}
		return y1;
	}
	return evalIntPaso;
}
function INTSPLINE(){
	var tipoExtra, x1, dx, y=[];
	var a=[], b=[], c=[], d=[], h=[], n;
	var A=[], B=[];
	if(arguments.length>=4){
		if(isFinite(arguments[0])){
			tipoExtra=arguments[0];
		}
		else{
			return undefined;
		}
		if(isFinite(arguments[1])){
			x1=arguments[1];
		}
		else{
			return undefined;
		}
		if(isFinite(arguments[2])){
			dx=arguments[2];
		}
		else{
			return undefined;
		}
		for(var i=3;i<arguments.length;i++){
			if(isFinite(arguments[i])){
				y.push(arguments[i]);
			}
			else{
				return undefined;
			}
		}
		n=y.length;
		for(var i=0; i<(n-1); i++){
			h[i]=dx;
		}
		for(var i=0; i<n; i++){
			a[i]=y[i];
			c[i]=0;
			
			A[i]=[];
			if(i==0){
				A[i][0]=1;
				for(var j=1; j<n; j++){
					A[i][j]=0;
				}
			}
			if(i>0&&i<n-1){
				for(var j=0; j<i-1; j++){
					A[i][j]=0;
				}
				A[i][i-1]=h[i-1];
				A[i][i]  =2*(h[i-1]+h[i]);
				A[i][i+1]=h[i];
				for(var j=i+2; j<n; j++){
					A[i][j]=0;
				}
			}
			if(i==(n-1)){
				for(var j=0; j<n-1; j++){
					A[i][j]=0;
				}
				A[i][n-1]=1;
			}
		}
		for(var i=0; i<n; i++){
			if(i==0){
				B[i]=0;
			}
			if(i>0&&i<n-1){
				B[i]= ((3/h[i])*(a[i+1]-a[i]))-((3/h[i-1])*(a[i]-a[i-1]));
			}
			if(i==(n-1)){
				B[i]=0;
			}
		}
		var tmp=0;
		var error=1;
		var tol=0.0001;
		var e=[];
		while(error>tol){
			for(var i=0; i<n; i++){
				tmp=B[i];
				for(var j=0; j<i; j++){
					tmp-=(A[i][j]*c[j]);
				}
				for(var j=i+1; j<n; j++){
					tmp-=(A[i][j]*c[j]);
				}
				c[i]=(tmp/A[i][i]);
			}
			for(var i=0; i<n; i++){
				e[i]=B[i];
				for(var j=0; j<n; j++){
					e[i]-=(A[i][j]*c[j]);
				}
			}
			error=e[0];
			for(var i=1; i<n; i++){
				if(e[i]>error){
					error=e[i];
				}
			}
		}
		for(var i=0; i<(n-1); i++){
			b[i]=((1/h[i])*(a[i+1]-a[i]))-((h[i]/3)*((2*c[i])+c[i+1]));
			d[i]=(c[i+1]-c[i])/(3*h[i]);
		}
	}
	function evalIntSpline(x){
		var y1;
		var x2=x1+(dx*(y.length-1));
		if(x<x1 || x>x2){
			switch(tipoExtra){
				case 0:		//ciclica
					if(x<x1){
						x=x2+((x-x2)%(x1-x2));
					}
					else if(x>x2){
						x=x1+((x-x1)%(x2-x1));
					}
					y1=evalIntSpline(x);
				break;
				case 1:		//nula
					y1=0;
				break;
				case 2:		//extremos
					if(x<x1){
						y1=y[0];
					}
					else if(x>x2){
						y1=y[y.length-1];
					}
				break;
			}
		}
		else{
			var ind=roundDec(((x-x1)/dx),4);
			ind=INT(ind);
			if(ind==(y.length-1)){
				ind--;
			}
			var xi=(x1+ind*dx);
			y1=a[ind]+(b[ind]*(x-xi))+(c[ind]*(x-xi)*(x-xi))+(d[ind]*(x-xi)*(x-xi)*(x-xi));
		}
		return y1;
	}
	return evalIntSpline;
}
function INVPCT(x){
	return x*100;
}
function LG(x){
	return (Math.log(x)/Math.log(10));
}
function LN(x){
	return Math.log(x);
}
function MAX(){
	var max=arguments[0];
	for(var i=1; i<arguments.length; i++){
		if(arguments[i]>max){
			max=arguments[i];
		}
	}
	return max;
}
function MIN(){
	var min=arguments[0];
	for(var i=1; i<arguments.length; i++){
		if(arguments[i]<min){
			min=arguments[i];
		}
	}
	return min;
}
function MOD(x,y){
	return x%y;
}
function NORMAL(media,des){	//Pendiente
	
}
function NOT(x){
	if(x==0 || x==1){
		return 1-x;
	}
	else if(typeof(x)=="boolean"){
		return !x;
	}
}
function NUMEROACIERTOS(pob, pro){	//Pendiente
	
}
function OR(){
	var rst;
	if(arguments[0]==0 || arguments[0]==1 || typeof(arguments[0])=="boolean"){
			rst=arguments[0];
		}
		else{
			return undefined;
		}
	for(var i=1; i<arguments.length; i++){
		if(arguments[i]==0 || arguments[i]==1 || typeof(arguments[i])=="boolean"){
			rst=arguments[i]||rst;
		}
		else{
			return undefined;
		}
	}
	return rst;
}
function PCT(x){
	return x/100;
}
function POWER(base, exp){
	return Math.pow(base,exp);
}
function PRED(x){
	return Math.floor(roundDec(x,10));
}
function PROD(){
	var p;
	if(isFinite(arguments[0])){
		p=arguments[0];
	}
	for(var i=1; i<arguments.length; i++){
		if(isFinite(arguments[i])){
			p*=arguments[i];
		}
	}
	return p;
}
function PULSE(vol,pri,intlo,t,dt){
	if(t>=pri){
		if(((t-pri)%intlo)==0){
			return vol/dt;
		}
	}
	return 0;
}
function PULSEIF(cond,vol,dt){
	if(cond || eval(cond)){
		return vol/dt;
	}
	return 0;
}
function RADTODEG(x){
	return (180*x)/Math.PI;
}
function RADTOGRAD(x){
	return (200*x)/Math.PI;
}
function RAMPA(m,pri,t){
	if(t>=pri){
		return m*(t-pri);
	}
	return 0;
}
function RANDOM(min,max){
	return min+(Math.random()*(max-min));
}
function RETARDO(datos, t_ajuste, orden, v_ini){ //Pendiente
	
}
function ROUND(x){
	return roundDec(x,0);
}
function SIGN(x){
	return x/Math.abs(x);
}
function SIN(x){
	return Math.sin(x);
}
function SINH(x){
	return (Math.exp(x) - Math.exp(-x)) / 2;
}
function SINWAVE(amplitud,periodo,t){
	if(periodo>0){
		return amplitud*SIN(2*PI*(t/periodo));
	}
	else{
		return undefined; 
	}
}
function SQR(x){
	return x*x;
}
function SQRT(x){
	return Math.sqrt(x);
}
function STEP(altura,tiempo_paso,t){
	if(t>=tiempo_paso){
		return altura;
	}
	else{
		return 0;
	}
}
function SUC(x){
	return Math.ceil(x);
}
function SUM(){
	var s;
	if(isFinite(arguments[0])){
		s=arguments[0];
	}
	for(var i=1; i<arguments.length; i++){
		if(isFinite(arguments[i])){
			s+=arguments[i];
		}
	}
	return s;
}
function SUMARETARDO(ret){ //Pendiente
	
}
function TAN(x){
	return Math.tan(x);
}
function TANH(x){
	return (Math.exp(x) - Math.exp(-x)) / (Math.exp(x) + Math.exp(-x));
}
function XOR(x,y){
	return (x+y)%2;
}
/********************************
********************************/

function roundDec(num,dec){
    var fac=Math.pow(10,dec);
    return Math.round(num*fac)/fac;
}

var sysDyn = {};

sysDyn.elementos=[];
sysDyn.parametros=[], sysDyn.auxiliares=[], sysDyn.niveles=[], sysDyn.flujos=[], sysDyn.multiplicadores=[];
sysDyn.estaticos=[];
sysDyn.pri, sysDyn.ti=0, sysDyn.tf=30, sysDyn.dt=1;
sysDyn.viewer;
sysDyn.chart;

sysDyn.load = function(urlModel, viewer, divs, controls){
	var response = $.get('/modelo_agricola.xml', modelLoaded);
	sysDyn.viewer = viewer;
	function modelLoaded(data, textStatus, jqXHR){
		if(textStatus == 'success'){
			var model = response.responseXML;
			
			$(divs.parametros).empty();
			$(divs.auxiliares).empty();
			$(divs.niveles).empty();
			$(divs.flujos).empty();
			$(divs.multiplicadores).empty();
			
			$(model).find('flujonivel').each(function(){
				$(this).children('parametro').each(function(){ 
					sysDyn.anaElem($(this), 'parametro');
				});
				$(this).children('auxiliar').each(function(){ 
					sysDyn.anaElem($(this), 'auxiliar');
				});
				$(this).children('nivel').each(function(){ 
					sysDyn.anaElem($(this), 'nivel');
				});
				$(this).children('flujo').each(function(){ 
					sysDyn.anaElem($(this), 'flujo');
				});
				$(this).children('multiplicador').each(function(){ 
					sysDyn.anaElem($(this), 'multiplicador');
				});
			});
			
			$(divs.accordion).accordion({ header: "h2",  collapsible: true});
			$(divs.accordion+' .ui-accordion-content').css('height', '470px');
			$(divs.accordion+' .ui-accordion-content').css('overflow-y', 'scroll'); 
			
			$(controls.ti).val(sysDyn.ti);
			$(controls.tf).val(sysDyn.tf);
			$(controls.dt).val(sysDyn.dt); 
			
			$(controls.ti).change(function(){
				sysDyn.ti=$(controls.ti).val();
				sysDyn.adapVisualizador();
				sysDyn.simular(sysDyn.viewer);
			});
			$(controls.tf).change(function(){
				sysDyn.tf=$(controls.tf).val();
				sysDyn.adapVisualizador();
				sysDyn.simular(sysDyn.viewer);
			});
			$(controls.dt).change(function(){
				sysDyn.dt=$(controls.dt).val();
				if(sysDyn.dt==0){
					sysDyn.dt=1;
				}
				sysDyn.adapVisualizador();
				sysDyn.simular(sysDyn.viewer);
			});
			
			sysDyn.estaElementos();
			sysDyn.pri=sysDyn.estaPrioridad();
			
			for(var i=0;i<sysDyn.elementos.length;i++){
				if(sysDyn.elementos[i].tipo=='parametro'){
					//$("#"+sysDyn.elementos[i].id).spinner({step: 0.01});
					//$("#"+sysDyn.elementos[i].id).addClass('ui-widget-content');
				}
				$("#"+sysDyn.elementos[i].id+"_cb").unbind();
				$("#"+sysDyn.elementos[i].id+"_cb").change(function(){
					sysDyn.simular(sysDyn.viewer);
					console.log('change');
				});
				$("#"+sysDyn.elementos[i].id+"_tx").unbind();
				$("#"+sysDyn.elementos[i].id+"_tx").change(function(){
					sysDyn.camDef($(this).attr('id'), $(this).val());
					sysDyn.simular(sysDyn.viewer);
				});
			};
		};
	};
};

sysDyn.reset = function(){
	sysDyn.elementos=[];
	sysDyn.parametros=[], sysDyn.auxiliares=[], sysDyn.niveles=[], sysDyn.flujos=[], sysDyn.multiplicadores=[];
	sysDyn.estaticos=[];
	sysDyn.pri, sysDyn.ti=0, sysDyn.tf=30, sysDyn.dt=1;
	sysDyn.viewer = '';
	if(sysDyn.chart){	
		sysDyn.chart.destroy();
	}
	sysDyn.chart = undefined;
}

sysDyn.anaElem = function(elemAna, tipo){
	var elem = new Object();
	elemAna.children('id').each(function(){
		elem.id = $(this).text();
	});
	elemAna.children('dim').each(function(){
		elem.dim = parseInt($(this).text());
	});
	elemAna.children('def').each(function(){
		elem.def = $(this).text();
	});
	elemAna.children('des').each(function(){
		elem.des = $(this).text();
	});
	elemAna.children('flujos').each(function(){
		$(this).children('entran').each(function(){
			elem.flujosIng=[];
			$(this).children('ing').each(function(){
				elem.flujosIng.push($(this).text());
			});
		});
		$(this).children('salen').each(function(){
			elem.flujosSal=[];
			$(this).children('sal').each(function(){
				elem.flujosSal.push($(this).text());
			});
		});
	});
	elemAna.children('conexiones').each(function(){
		$(this).children('entran').each(function(){
			elem.conexIng=[];
			$(this).children('ing').each(function(){
				elem.conexIng.push($(this).text());
			});
		});
		$(this).children('salen').each(function(){
			elem.conexSal=[];
			$(this).children('sal').each(function(){
				elem.conexSal.push($(this).text());
			});
		});
	});
	elem.tipo = tipo;
	var div;
	switch(tipo){
		case 'parametro':
			sysDyn.parametros.push(elem);
			div = '#divParametros';
		break;
		case 'auxiliar':
			sysDyn.auxiliares.push(elem);
			div = '#divAuxiliares';
		break;
		case 'nivel':
			sysDyn.niveles.push(elem);
			div = '#divNiveles';
		break;
		case 'flujo':
			sysDyn.flujos.push(elem);
			div = '#divFlujos';
		break;
		case 'multiplicador':
			sysDyn.multiplicadores.push(elem);
			div = '#divMultiplicadores';
		break;
		
	}
	$('<div class="campo"></div>').html('<label for="'+elem.id+'_tx"><input type="checkbox" id="'+elem.id+'_cb"/>'+elem.id+': </label><input id="'+elem.id+'_tx" type="text" value="'+elem.def+'">').appendTo(div);
};
sysDyn.estaElementos = function(){
	for(var i=0;i<sysDyn.parametros.length;i++){
		sysDyn.elementos.push(sysDyn.parametros[i]);
	}
	for(var i=0;i<sysDyn.auxiliares.length;i++){
		sysDyn.elementos.push(sysDyn.auxiliares[i]);
	}
	for(var i=0;i<sysDyn.niveles.length;i++){
		sysDyn.elementos.push(sysDyn.niveles[i]);
	}
	for(var i=0;i<sysDyn.flujos.length;i++){
		sysDyn.elementos.push(sysDyn.flujos[i]);
	}
	for(var i=0;i<sysDyn.multiplicadores.length;i++){
		sysDyn.elementos.push(sysDyn.multiplicadores[i]);
	}
};
sysDyn.estaPrioridad = function(){
	var pilaAdm=[], pilaEsp=[];
	for(var i=0; i<sysDyn.elementos.length; i++){
		pilaEsp.push(i);
	}	
	while(pilaAdm.length<sysDyn.elementos.length){
		for(var i=0; i<pilaEsp.length; i++){
			if(!sysDyn.elementos[pilaEsp[i]].conexIng){
				pilaAdm.push(pilaEsp[i]);
				pilaEsp.splice(i,1);
				i--;
			}
			else if(sysDyn.elementos[pilaEsp[i]].conexIng.length == 0){
				pilaAdm.push(pilaEsp[i]);
				pilaEsp.splice(i,1);
				i--;
			}
			else if(sysDyn.esAdmitido(sysDyn.elementos[pilaEsp[i]].conexIng,pilaAdm)){
				pilaAdm.push(pilaEsp[i]);
				pilaEsp.splice(i,1);
				i--;
			}
		}
	}
	return pilaAdm;
};
sysDyn.esAdmitido = function(conexIng, pilaAdm){
	var esAdmAct=false;
	var esAdmAnt;
	for(var i=0;i<conexIng.length;i++){
		esAdmAnt=esAdmAct;
		esAdmAct=false;
		for(var j=0;j<pilaAdm.length;j++){
			if(conexIng[i] == sysDyn.elementos[pilaAdm[j]].id){
				if(i!=0){
					if(!esAdmAnt){
						return false;
					}
				}
				esAdmAct=true;
				j=pilaAdm.length;
			}
		}
	}
	return esAdmAct;
};
sysDyn.esEstatico = function(elem){
	var estAct = false;
	var estAnt;
	if(elem.conexIng){
		for(var i=0; i<elem.conexIng.length; i++){
			estAnt=estAct;
			estAct=false;
			for(var j=0; j<sysDyn.parametros.length; j++){
				if(elem.conexIng[i]==sysDyn.parametros[j].id){
					if((i!=0) && (!estAnt)){
						return false;
					}
					estAct=true;
					break;
				}
			}
			for(var j=0; j<sysDyn.estaticos.length; j++){
				if(elem.conexIng[i]==sysDyn.estaticos[j]){
					if((i!=0) && (!estAnt)){
						return false;
					}
					estAct=true;
					break;
				}
			}
		}
	}
	return estAct;
}
sysDyn.sepVector = function(cadena){
	var llave=0;   	//[ ]
	var paren=0;	//( )
	var corche=0;	//{ }
	var ini=0;
	var fin=0;
	var vector=[];
	for(var i=0; i<cadena.length; i++){
		switch(cadena[i]){
			case '[':
				llave++;
			break;
			case ']':
				llave--;
			break;
			case '(':
				paren++;
			break;
			case ')':
				paren--;
			break;
			case '{':
				corche++;
			break;
			case '}':
				corche--;
			break;
			case ',':
				if(llave==1 && paren==0 && corche==0){
					ini=fin;
					fin=i;
					vector.push(cadena.substring(ini+1,fin));
				}
			break;
		}
	}
	ini=fin;
	fin=cadena.length-1;
	vector.push(cadena.substring(ini+1,fin));
	return vector;
}
sysDyn.adapVector = function(cadena){
	var j=0;
	var num;
	var val;
	/*var vCad=[];
	for(var i=0; i<cadena.length; i++){
		vCad.push(cadena[i]);
	}*/ 
	//falta definir funci�n para numero con m�s de un digito
	
	for(var i=0; i<cadena.length; i++){
		if(cadena[i]=='['){
			for(j=i+1; j<cadena.length; j++){
				if(cadena[j]==']'){
					val=cadena.substring(i+1,j)
					if(isFinite(val)){
						num=parseInt(val);
						num--;
						cadena=cadena.substring(0,i+1)+num+cadena.substring(j,cadena.length);
					}
					i=j+1;
					j=cadena.length;
				}
				else if(cadena[j]=='['){
					i=j;
				}
			}
		}
	}
	return cadena;
}
sysDyn.genCodigo = function(pri){
	var codigo=
	'\n'+'var t_serie=[];'+
	'\n'+'var ti='+sysDyn.ti+';'+
	'\n'+'var tf='+sysDyn.tf+';'+
	'\n'+'var dt='+sysDyn.dt+';'+
	'\n'+'var t=ti;'+
	'\n';
	for(var i=0; i<sysDyn.elementos.length;i++){
		if($("#"+sysDyn.elementos[sysDyn.pri[i]].id+'_cb').is(':checked')){
			if(sysDyn.elementos[sysDyn.pri[i]].dim == 1){
				codigo+=
				'\n'+'var '+sysDyn.elementos[sysDyn.pri[i]].id+'_serie=[];';
			}
			else if(sysDyn.elementos[sysDyn.pri[i]].dim > 1){
				for(var j=0; j<sysDyn.elementos[sysDyn.pri[i]].dim; j++){
					codigo+=
					'\n'+'var '+sysDyn.elementos[sysDyn.pri[i]].id+'_'+j+'_serie=[];';
				}
			}
		}
		
		if(	sysDyn.elementos[sysDyn.pri[i]].tipo=='parametro' || 
			sysDyn.elementos[sysDyn.pri[i]].tipo=='nivel' || 
			sysDyn.elementos[sysDyn.pri[i]].tipo=='flujo' || 
			sysDyn.elementos[sysDyn.pri[i]].tipo=='auxiliar'){
			/*if(esEstatico(elementos[pri[i]])){
				estaticos.push(elementos[pri[i]].id);
			}*/
			codigo+=
			'\n'+'var '+sysDyn.elementos[sysDyn.pri[i]].id+'='+sysDyn.adapVector(sysDyn.elementos[sysDyn.pri[i]].def)+';';
		}
		else if(sysDyn.elementos[sysDyn.pri[i]].tipo=='multiplicador'){
			if(sysDyn.elementos[sysDyn.pri[i]].dim == 1){
				codigo+=
				'\n'+'var '+sysDyn.elementos[sysDyn.pri[i]].id+'_func='+sysDyn.adapVector(sysDyn.elementos[sysDyn.pri[i]].def)+';';
				codigo+=
				'\n'+'var '+sysDyn.elementos[sysDyn.pri[i]].id+'='+sysDyn.elementos[sysDyn.pri[i]].id+'_func('+sysDyn.elementos[sysDyn.pri[i]].conexIng[0]+');';
			}
			else if(sysDyn.elementos[sysDyn.pri[i]].dim > 1){
				// Falta definir codigo para multiplicadores con dimensi�n mayor que uno.
			}
		}
	}

	codigo+=
	'\n'+
	'\n'+'while(t<=tf){'+
	'\n\t'+'t_serie.push(roundDec(t,2));'+
	'\n\t'+'t=t+dt;';
	for(var i=0; i<sysDyn.elementos.length;i++){
		if($("#"+sysDyn.elementos[sysDyn.pri[i]].id+'_cb').is(':checked')){
			if(sysDyn.elementos[sysDyn.pri[i]].dim == 1){
				codigo+=
				'\n\t'+sysDyn.elementos[sysDyn.pri[i]].id+'_serie.push(roundDec('+sysDyn.elementos[sysDyn.pri[i]].id+',4));';
			}
			else if(sysDyn.elementos[sysDyn.pri[i]].dim > 1){
				for(var j=0; j<sysDyn.elementos[sysDyn.pri[i]].dim; j++){
					codigo+=
					'\n\t'+sysDyn.elementos[sysDyn.pri[i]].id+'_'+j+'_serie.push(roundDec('+sysDyn.elementos[sysDyn.pri[i]].id+'['+j+']'+',4));';
				}
			}
		}
		
		if(sysDyn.elementos[sysDyn.pri[i]].tipo=='auxiliar' || sysDyn.elementos[sysDyn.pri[i]].tipo=='flujo'){
			if(sysDyn.elementos[sysDyn.pri[i]].dim == 1){
				codigo+=
				'\n\t'+sysDyn.elementos[sysDyn.pri[i]].id+'='+sysDyn.adapVector(sysDyn.elementos[sysDyn.pri[i]].def)+';';
			}
			else if(sysDyn.elementos[sysDyn.pri[i]].dim > 1){
				var vector=sysDyn.sepVector(sysDyn.elementos[sysDyn.pri[i]].def);
				for(var j=0; j<sysDyn.elementos[sysDyn.pri[i]].dim; j++){
					vector[j]=sysDyn.adapVector(vector[j]);
					codigo+=
					'\n\t'+sysDyn.elementos[sysDyn.pri[i]].id+'['+j+']='+vector[j]+';';
				}
			}
		}
		else if(sysDyn.elementos[sysDyn.pri[i]].tipo=='multiplicador'){
			if(sysDyn.elementos[sysDyn.pri[i]].dim == 1){
				codigo+=
				'\n\t'+sysDyn.elementos[sysDyn.pri[i]].id+'='+sysDyn.elementos[sysDyn.pri[i]].id+'_func('+sysDyn.elementos[sysDyn.pri[i]].conexIng[0]+');';
			}
			else if(sysDyn.elementos[sysDyn.pri[i]].dim > 1){
				// Falta definir codigo para multiplicadores con dimensión mayor que uno.
			}
		}
		else if(sysDyn.elementos[sysDyn.pri[i]].tipo=='nivel'){
			if(sysDyn.elementos[sysDyn.pri[i]].dim == 1){
				codigo+=			
				'\n\t'+sysDyn.elementos[sysDyn.pri[i]].id+'='+sysDyn.elementos[sysDyn.pri[i]].id+'+(';
				
				var flujosIng=sysDyn.elementos[sysDyn.pri[i]].flujosIng;
				var flujosSal=sysDyn.elementos[sysDyn.pri[i]].flujosSal;
				
				for(var j=0; j<flujosIng.length-1;j++){
					codigo+=
					flujosIng[j]+'+';
				}
				if(flujosIng.length>0){
					codigo+=
					flujosIng[flujosIng.length-1];
				}
				for(var j=0; j<flujosSal.length;j++){
					codigo+=
					'-'+flujosSal[j];
				}
				codigo+=
				')*dt;';
			}
			else if(sysDyn.elementos[sysDyn.pri[i]].dim > 1){
				for(var k=0; k<sysDyn.elementos[sysDyn.pri[i]].dim; k++){
					codigo+=			
					'\n\t'+sysDyn.elementos[sysDyn.pri[i]].id+'['+k+']='+sysDyn.elementos[sysDyn.pri[i]].id+'['+k+']+'+'(';
					
					var flujosIng=sysDyn.elementos[sysDyn.pri[i]].flujosIng;
					var flujosSal=sysDyn.elementos[sysDyn.pri[i]].flujosSal;
					
					for(var j=0; j<flujosIng.length-1;j++){
						codigo+=
						flujosIng[j]+'['+k+']+';
					}
					if(flujosIng.length>0){
						codigo+=
						flujosIng[flujosIng.length-1]+'['+k+']';
					}
					for(var j=0; j<flujosSal.length;j++){
						codigo+=
						'-'+flujosSal[j]+'['+k+']';
					}
					codigo+=
					')*dt;';
				}
			}
		}
	}
	codigo+=
	'\n'+'}';
	return codigo;
}
sysDyn.simular = function(viewer){
	var codigo = sysDyn.genCodigo(sysDyn.pri);
	var elementos_series, tiempo_serie;
	/*$('#codigo').empty();
	$('<pre id="modEcu" class="code" lang="js"></pre>').appendTo('#codigo');
	$('#modEcu').text('//Modelo en lenguaje de ecuaciones:'+codigo);*/
	jQuery.globalEval(codigo);
	
	tiempo_serie=eval('t_serie');
	elementos_series=[];
	
	for(var i=0; i<sysDyn.elementos.length;i++){
		if($("#"+sysDyn.elementos[i].id+"_cb").is(':checked')){
			if(sysDyn.elementos[i].dim == 1){
				elementos_series.push({                
					name: sysDyn.elementos[i].id,                               
					data: eval(sysDyn.elementos[i].id+'_serie')               
				});
			}
			else if(sysDyn.elementos[i].dim > 1){
				for(var j=0; j<sysDyn.elementos[i].dim; j++){
					elementos_series.push({
						name: sysDyn.elementos[i].id+'['+j+']',                               
						data: eval(sysDyn.elementos[i].id+'_'+j+'_serie')               
					});
				}
			}
		}	
	}
	sysDyn.chart = new Highcharts.Chart({            
		chart: {                
			renderTo: viewer,                
			type: 'line'            
		},            
		title: {                
			text: 'Modelo de producción agrícola.'            
		},            
		xAxis: {                
			categories: tiempo_serie            
		},            
		yAxis: {                
			title: {                    
				text: 'Valor'                
			}           
		},            
		tooltip: {                
			crosshairs: true,                
			shared: true            
		},            
		series: elementos_series        
	});
	$('#viewer_simulations > div').css('z-index', 1);
	/*$('#modEcu').highlight({source:1, zebra:1, indent:'space', list:'ol'});*/	
}

sysDyn.camDef = function(idArg, valArg){
	for(var i=0; i<sysDyn.elementos.length;i++){
		if(sysDyn.elementos[i].id==idArg){
			sysDyn.elementos[i].def=valArg;
			i=sysDyn.elementos.length;
		}
	}
};
sysDyn.adapVisualizador = function(){
	var cant=(sysDyn.tf-sysDyn.ti)/sysDyn.dt;
	var anchoContVis=$('#viewer_simulations_container').css('width');
	anchoContVis=anchoContVis.substring(0,anchoContVis.length-2);
	
	if(cant*28>anchoContVis){
		$('#viewer_simulations').css('width',(25*cant)+'px');
	}
	else{
		$('#viewer_simulations').css('width','');
	}
}