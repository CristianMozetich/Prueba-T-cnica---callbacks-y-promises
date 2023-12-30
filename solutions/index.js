import fs from 'fs'
import fsp from 'fs/promises'


//1 - Arregla esta función para que el código posterior funcione como se espera:


import net from 'node:net'

export const ping = (ip, callback) => {
  const startTime = process.hrtime()

  const client = net.connect({ port: 80, host: ip }, () => {
    client.end()
    //return { time: process.hrtime(startTime), ip }
    callback(null, { time: process.hrtime(startTime), ip } )
  })
  
  client.on('error', (err) => {
    client.end()
    callback(err)
    //throw err
  })
} 

ping('midu.dev', (err, info) => {
  if (err) console.error(err)
  else console.log(info)
})


//2 - Transforma la siguiente función para que funcione con promesas en lugar de callbacks:

export function obtenerDatosPromise() {
  return new Promise ((resolve)=>{
    setTimeout(() => {
      resolve({ data: 'datos importantes' });
    }, 2000);
  })
}

obtenerDatosPromise()
  .then(info => console.log(info))



// 3 - Explica qué hace la funcion. Identifica y corrige los errores en el siguiente código. Si ves algo innecesario, elimínalo. Luego mejoralo para que siga funcionando con callback y luego haz lo que consideres para mejorar su legibilidad.


// ( fsp = file sistem promise )

  export async function procesarArchivo() {
    let contenido = ''
      
    try{
      contenido = await fsp.readFile('input.txt', 'utf8')

    } catch(error){
      console.error('Error leyendo archivo:', error.message);
      throw error
    }

    const textoProcesado = contenido.toUpperCase ();

    try{
      await  fsp.writeFile('output.txt', textoProcesado)

    } catch (error){
      console.error('Error guardando archivo:', error.message);
      throw error
    }
}

await procesarArchivo()



// 4 - ¿Cómo mejorarías el siguiente código y por qué? Arregla los tests si es necesario:


export async function leerArchivos() {
  console.time(leerArchivos)

  const [archivo1, archivo2, archivo3] = await Promise.all([
  fsp.readFile('archivo1.txt', 'utf8'),
  fsp.readFile('archivo2.txt', 'utf8'),
  fsp.readFile('archivo3.txt', 'utf8'),
  ])


  console.timeEnd(leerArchivos)
  return `${archivo1} ${archivo2} ${archivo3}`
}

leerArchivos();


  
