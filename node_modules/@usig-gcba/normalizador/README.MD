# Normalizador de direcciones CABA

Esta librería consta de un normalizador de direcciones. Al ingresar un texto, el normalizador devuelve todas las direcciones que coincidan con dicho texto. 

##Instalación
`npm install @usig-gcba/normalizador`
##Uso
Todas las funciones se exportan dentro de un mismo objeto. Para utilizarlas, se debe importar la libreria mediante `import Normalizador from '@usig-gcba/normalizador'`.
###Funciones
#####init(options)
El método init inicializa al componente, y devuelve una Promise que se resuelve al terminar de cargar los datos de las calles, devolviendo una referencia al objeto que contiene todas las funciones. 
```
Normalizador.init(options).then((res) => {
    //Los datos han sido cargados en este punto
})
```
Este inicializador puede recibir un objeto de opciones de configuración.
Los parametros posibles son los siguientes:

|      Parámetro     |                       Descripcion                      | Default |
|:------------------:|:------------------------------------------------------:|---------|
| lazyDataLoad       | Los datos se cargan al inicializarse  en caso de false |  false  |
| loadFullDatabase   | Carga la base de datos de calles completa              |   true  |
| callesEnMinusculas | Carga los nombres de las calles en minuscula           |  false  |
#####normalizar(texto)
Normaliza el texto ingresado y retorna una lista con las calles encontradas. 
```
Normalizador.normalizar("Solis 777") // Retorna una lista de direcciones

```
