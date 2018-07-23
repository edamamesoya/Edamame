'use strict';

/**
 * Descripción: Obtiene una lista de las provincias de Costa Rica
 * @param: 
 * @return: {String} listaProvincias
 */
function obtenerProvincias(){
    let listaProvincias = '';
    let peticion = $.ajax({
        url: 'http://costa-rica-places.herokuapp.com/api/provinces',
        type: 'get',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async:false,
        data:{
        }
    });
    
    peticion.done(function(response){
        listaProvincias = response;
    });

    peticion.fail(function(response){
    
    });

    return listaProvincias;
};

/**
 * Descripción: Obtiene una lista de los cantones de Costa Rica
 * @param: 
 * @return: {String} listaCantones
 */
function obtenerCantones(){
    let listaCantones = '';
    let peticion = $.ajax({
        url: 'http://costa-rica-places.herokuapp.com/api/cantons',
        type: 'get',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async:false,
        data:{
        }
    });
    
    peticion.done(function(response){
        listaCantones = response;
    });

    peticion.fail(function(response){
    
    });

    return listaCantones;
};

/**
 * Descripción: Obtiene una lista de los distritos de Costa Rica
 * @param: 
 * @return: {String} listaDistritos
 */
function obtenerDistritos(){
  let listaDistritos = '';
  let peticion = $.ajax({
      url: 'http://costa-rica-places.herokuapp.com/api/districts',
      type: 'get',
      contentType: 'application/x-www-form-urlencoded; charset=utf-8',
      dataType : 'json',
      async:false,
      data:{
      }
    });
  
    peticion.done(function(response){
        listaDistritos = response;
    });
  
    peticion.fail(function(response){
     
    });

    return listaDistritos;
};