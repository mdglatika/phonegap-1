angular.module('LugarModel', [])


.factory('Lugar', function(){
	function Lugar(Id, Nombre, Descripcion, Direccion, Latitud, Longitud ){
		this.Id = Id;
		this.Nombre = Nombre;
		this.Descripcion = Descripcion;
		this.Direccion = Direccion;
		this.Latitud = Latitud;
		this.Longitud = Longitud;
	}


	Lugar.build = function(data){
		if(!data){
			return null;
		}
		else{
			return new Lugar(data.Id, data.Nombre, data.Descripcion, data.Direccion, data.Latitud, data.Longitud);
		}
	}

	Lugar.prototype.toJson = function(){
		return angular.toJson(this);
	}

	Lugar.buildAll= function(data){
		if(angular.isArray(data)){
			return data.map(Lugar.build);

		}

		return Lugar.build(data);
	}

	return Lugar;
	//////////////////////////////////////////////////////////
/*	$scope.lugares =   [
	  {id:1, nombre:"Viamonte", direccion:'Viamonte 749 Piso 19 Of4', lat:-34.599953, lng: -58.377418}, 
	  {id:2, nombre:"Amasol", direccion:'Tucuman 540', lat: -34.6011346, lng:-58.376141}, 
	  {id:3, nombre:"ITEVA Debenedetti", direccion:'Debenedetti 3895', lat: -34.5112987, lng: -58.5222914}, 
	  {id:4, nombre:"Santa Rosa Plasticos", direccion:'Maq. Carregal 3151 - Munro', lat: -34.522950, lng: -58.523104}
	  ];
	  */
})