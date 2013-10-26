
var divs = {parametros: 	 '#divParametros', 
			auxiliares: 	 '#divAuxiliares',
			niveles:		 '#divNiveles',
			flujos:			 '#divFlujos',
			multiplicadores: '#divMultiplicadores',
			accordion:		 '#accordion'};

var controls = {	ti: '#ti',
					tf: '#tf',
					dt: '#dt'
								};
var viewer = 'viewer_simulations';

sysDyn.load('/modelo_agricola.xml', viewer, divs, controls);

function estaModelo(){
	//var sel = $('#modelo').find('option:selected').text();
	//Seleccionador de modelo	
	$('#modelo').change(function(){
		sel = $('#modelo').find('option:selected').text();
		elementos=[];
		parametros=[], auxiliares=[], niveles=[], flujos=[], Multiplicadores=[];
		$("#divParametros").empty();
		$("#divAuxiliares").empty();
		$("#divNiveles").empty();
		$("#divFlujos").empty();
		$("#divMultiplicadores").empty();
		$.ajax(paramConsulta(sel));
	});
};


function ajaxComplete() {
	for(var i=0;i<elementos.length;i++){
		if(elementos[i].tipo=='parametro'){
			$("#"+elementos[i].id).spinner({step: 0.01});
			$("#"+elementos[i].id).addClass('ui-widget-content');
		}
		$("#"+elementos[i].id+"_cb").change(function(){
			simular();
		});
		$("#"+elementos[i].id+"_tx").change(function(){
			camDef($(this).attr('id'), $(this).val());
			simular();
		});
	};
	$("#ti").spinner({step: 1});
	$("#tf").spinner({step: 1});
	$("#dt").spinner({step: 0.1});
	$("#ti").addClass('ui-widget-content');
	$("#tf").addClass('ui-widget-content');
	$("#dt").addClass('ui-widget-content');
	
	$("#ti").val(ti);
	$("#tf").val(tf);
	$("#dt").val(dt);
	$("#ti").change(function(){
		ti=$("#ti").val();
		adapVisualizador();
		simular();
	});
	$("#tf").change(function(){
		tf=$("#tf").val();
		adapVisualizador();
		simular();
	});
	$("#dt").change(function(){
		dt=$("#dt").val();
		if(dt==0){
			dt=1;
		}
		adapVisualizador();
		simular();
	});
	for(var i=0;i<auxiliares.length;i++){
		$("#"+auxiliares[i].id).addClass('ui-widget-content');
	};
	for(var i=0;i<niveles.length;i++){
		$("#"+niveles[i].id).addClass('ui-widget-content');
	};
	for(var i=0;i<flujos.length;i++){
		$("#"+flujos[i].id).addClass('ui-widget-content');
	};
	for(var i=0;i<Multiplicadores.length;i++){
		$("#"+Multiplicadores[i].id).addClass('ui-widget-content');
	};
}
