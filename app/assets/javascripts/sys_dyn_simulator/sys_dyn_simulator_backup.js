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
sysDyn.parametros=[], sysDyn.auxiliares=[], sysDyn.niveles=[], sysDyn.flujos=[], sysDyn.Multiplicadores=[];
sysDyn.estaticos=[];
sysDyn.pri, ti=0, tf=30, dt=1;
sysDyn.chart;

function anaElem(elemAna, tipo){
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
			parametros.push(elem);
			div = '#divParametros';
		break;
		case 'auxiliar':
			auxiliares.push(elem);
			div = '#divAuxiliares';
		break;
		case 'nivel':
			niveles.push(elem);
			div = '#divNiveles';
		break;
		case 'flujo':
			flujos.push(elem);
			div = '#divFlujos';
		break;
		case 'multiplicador':
			Multiplicadores.push(elem);
			div = '#divMultiplicadores';
		break;
		
	}
	$('<div class="campo"></div>').html('<label for="'+elem.id+'_tx"><input type="checkbox" id="'+elem.id+'_cb"/>'+elem.id+': </label><input id="'+elem.id+'_tx" type="text" value="'+elem.def+'">').appendTo(div);
};
function estaElementos(){
	for(var i=0;i<parametros.length;i++){
		elementos.push(parametros[i]);
	}
	for(var i=0;i<auxiliares.length;i++){
		elementos.push(auxiliares[i]);
	}
	for(var i=0;i<niveles.length;i++){
		elementos.push(niveles[i]);
	}
	for(var i=0;i<flujos.length;i++){
		elementos.push(flujos[i]);
	}
	for(var i=0;i<Multiplicadores.length;i++){
		elementos.push(Multiplicadores[i]);
	}
};
function estaPrioridad(){
	var pilaAdm=[], pilaEsp=[];
	for(var i=0; i<elementos.length; i++){
		pilaEsp.push(i);
	}	
	while(pilaAdm.length<elementos.length){
		for(var i=0; i<pilaEsp.length; i++){
			if(!elementos[pilaEsp[i]].conexIng){
				pilaAdm.push(pilaEsp[i]);
				pilaEsp.splice(i,1);
				i--;
			}
			else if(elementos[pilaEsp[i]].conexIng.length == 0){
				pilaAdm.push(pilaEsp[i]);
				pilaEsp.splice(i,1);
				i--;
			}
			else if(esAdmitido(elementos[pilaEsp[i]].conexIng,pilaAdm)){
				pilaAdm.push(pilaEsp[i]);
				pilaEsp.splice(i,1);
				i--;
			}
		}
	}
	return pilaAdm;
};
function esAdmitido(conexIng, pilaAdm){
	var esAdmAct=false;
	var esAdmAnt;
	for(var i=0;i<conexIng.length;i++){
		esAdmAnt=esAdmAct;
		esAdmAct=false;
		for(var j=0;j<pilaAdm.length;j++){
			if(conexIng[i] == elementos[pilaAdm[j]].id){
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
function esEstatico(elem){
	var estAct = false;
	var estAnt;
	if(elem.conexIng){
		for(var i=0; i<elem.conexIng.length; i++){
			estAnt=estAct;
			estAct=false;
			for(var j=0; j<parametros.length; j++){
				if(elem.conexIng[i]==parametros[j].id){
					if((i!=0) && (!estAnt)){
						return false;
					}
					estAct=true;
					break;
				}
			}
			for(var j=0; j<estaticos.length; j++){
				if(elem.conexIng[i]==estaticos[j]){
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
function sepVector(cadena){
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
function adapVector(cadena){
	var j=0;
	var num;
	var val;
	/*var vCad=[];
	for(var i=0; i<cadena.length; i++){
		vCad.push(cadena[i]);
	}*/ //falta definir funci�n para numero con m�s de un digito
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
function genCodigo(pri){
	var codigo=
	'\n'+'var t_serie=[];'+
	'\n'+'var ti='+ti+';'+
	'\n'+'var tf='+tf+';'+
	'\n'+'var dt='+dt+';'+
	'\n'+'var t=ti;'+
	'\n';
	for(var i=0; i<elementos.length;i++){
		if($("#"+elementos[pri[i]].id+'_cb').is(':checked')){
			if(elementos[pri[i]].dim == 1){
				codigo+=
				'\n'+'var '+elementos[pri[i]].id+'_serie=[];';
			}
			else if(elementos[pri[i]].dim > 1){
				for(var j=0; j<elementos[pri[i]].dim; j++){
					codigo+=
					'\n'+'var '+elementos[pri[i]].id+'_'+j+'_serie=[];';
				}
			}
		}
		
		if(elementos[pri[i]].tipo=='parametro' || elementos[pri[i]].tipo=='nivel' || elementos[pri[i]].tipo=='flujo' || elementos[pri[i]].tipo=='auxiliar'){
			/*if(esEstatico(elementos[pri[i]])){
				estaticos.push(elementos[pri[i]].id);
			}*/
			codigo+=
			'\n'+'var '+elementos[pri[i]].id+'='+adapVector(elementos[pri[i]].def)+';';
		}
		else if(elementos[pri[i]].tipo=='multiplicador'){
			if(elementos[pri[i]].dim == 1){
				codigo+=
				'\n'+'var '+elementos[pri[i]].id+'_func='+adapVector(elementos[pri[i]].def)+';';
				codigo+=
				'\n'+'var '+elementos[pri[i]].id+'='+elementos[pri[i]].id+'_func('+elementos[pri[i]].conexIng[0]+');';
			}
			else if(elementos[pri[i]].dim > 1){
				// Falta definir codigo para multiplicadores con dimensi�n mayor que uno.
			}
		}
	}

	codigo+=
	'\n'+
	'\n'+'while(t<=tf){'+
	'\n\t'+'t_serie.push(roundDec(t,2));'+
	'\n\t'+'t=t+dt;';
	for(var i=0; i<elementos.length;i++){
		if($("#"+elementos[pri[i]].id+'_cb').is(':checked')){
			if(elementos[pri[i]].dim == 1){
				codigo+=
				'\n\t'+elementos[pri[i]].id+'_serie.push(roundDec('+elementos[pri[i]].id+',4));';
			}
			else if(elementos[pri[i]].dim > 1){
				for(var j=0; j<elementos[pri[i]].dim; j++){
					codigo+=
					'\n\t'+elementos[pri[i]].id+'_'+j+'_serie.push(roundDec('+elementos[pri[i]].id+'['+j+']'+',4));';
				}
			}
		}
		
		if(elementos[pri[i]].tipo=='auxiliar' || elementos[pri[i]].tipo=='flujo'){
			if(elementos[pri[i]].dim == 1){
				codigo+=
				'\n\t'+elementos[pri[i]].id+'='+adapVector(elementos[pri[i]].def)+';';
			}
			else if(elementos[pri[i]].dim > 1){
				var vector=sepVector(elementos[pri[i]].def);
				for(var j=0; j<elementos[pri[i]].dim; j++){
					vector[j]=adapVector(vector[j]);
					codigo+=
					'\n\t'+elementos[pri[i]].id+'['+j+']='+vector[j]+';';
				}
			}
		}
		else if(elementos[pri[i]].tipo=='multiplicador'){
			if(elementos[pri[i]].dim == 1){
				codigo+=
				'\n\t'+elementos[pri[i]].id+'='+elementos[pri[i]].id+'_func('+elementos[pri[i]].conexIng[0]+');';
			}
			else if(elementos[pri[i]].dim > 1){
				// Falta definir codigo para multiplicadores con dimensi�n mayor que uno.
			}
		}
		else if(elementos[pri[i]].tipo=='nivel'){
			if(elementos[pri[i]].dim == 1){
				codigo+=			
				'\n\t'+elementos[pri[i]].id+'='+elementos[pri[i]].id+'+(';
				
				var flujosIng=elementos[pri[i]].flujosIng;
				var flujosSal=elementos[pri[i]].flujosSal;
				
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
			else if(elementos[pri[i]].dim > 1){
				for(var k=0; k<elementos[pri[i]].dim; k++){
					codigo+=			
					'\n\t'+elementos[pri[i]].id+'['+k+']='+elementos[pri[i]].id+'['+k+']+'+'(';
					
					var flujosIng=elementos[pri[i]].flujosIng;
					var flujosSal=elementos[pri[i]].flujosSal;
					
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
function simular(){
	var codigo=genCodigo(pri);
	var elementos_series, tiempo_serie;
	/*$('#codigo').empty();
	$('<pre id="modEcu" class="code" lang="js"></pre>').appendTo('#codigo');
	$('#modEcu').text('//Modelo en lenguaje de ecuaciones:'+codigo);*/
	jQuery.globalEval(codigo);
	
	tiempo_serie=eval('t_serie');
	elementos_series=[];
	
	for(var i=0; i<elementos.length;i++){
		if($("#"+elementos[i].id+"_cb").is(':checked')){
			if(elementos[i].dim == 1){
				elementos_series.push({                
					name: elementos[i].id,                               
					data: eval(elementos[i].id+'_serie')               
				});
			}
			else if(elementos[i].dim > 1){
				for(var j=0; j<elementos[i].dim; j++){
					elementos_series.push({
						name: elementos[i].id+'['+j+']',                               
						data: eval(elementos[i].id+'_'+j+'_serie')               
					});
				}
			}
		}	
	}        
	chart = new Highcharts.Chart({            
		chart: {                
			renderTo: 'visualizador',                
			type: 'line'            
		},            
		title: {                
			text: 'Modelo de producción agricola.'            
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
	$('#modEcu').highlight({source:1, zebra:1, indent:'space', list:'ol'});	
}
function camDef(idArg, valArg){
	for(var i=0; i<elementos.length;i++){
		if(elementos[i].id==idArg){
			elementos[i].def=valArg;
			i=elementos.length;
		}
	}
}
function adapVisualizador(){
	var cant=(tf-ti)/dt;
	var anchoContVis=$('#contVisualizador').css('width');
	anchoContVis=anchoContVis.substring(0,anchoContVis.length-2);
	
	if(cant*28>anchoContVis){
		$('#visualizador').css('width',(25*cant)+'px');
	}
	else{
		$('#visualizador').css('width','');
	}
}