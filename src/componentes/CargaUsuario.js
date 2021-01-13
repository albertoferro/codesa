import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaTrash, FaPen } from 'react-icons/fa'; // npm i react-icons
import axios from 'axios'; // npm i axios


function CargaPost() {

  const [lista, setLista] = useState([]);
  const [nombre, setNombre] = useState('');
  const [rol, setRol] = useState([]);
  const [id_rol, setIdRol] = useState('');
  const [activo, setActivo] = useState('');
  const [id, setId] = useState('');
  const [bandera, setBandera] = useState(true);

  
  useEffect(() => {
    getProductos();
    getRol();
  }, [])

  async function getProductos() {
    const res = await axios.get('http://purosoft.net/apirest_codesa/');
    setLista(res.data)
    console.log(res.data)
  }

  async function getRol() {
    const res = await axios.get('http://purosoft.net/apirest_codesa/index2.php');
    setRol(res.data)
    console.log(res.data)
  }

  async function addProducto() {
    const obj = { nombre, id_rol, activo };
    const res = await axios.post('http://purosoft.net/apirest_codesa/', obj);
    console.log(res.data)
    getProductos();
  }

  async function UpdateProducto(e) {
    const obj = { id, nombre, id_rol, activo };
    const res = await axios.put('http://purosoft.net/apirest_codesa/', obj);
    console.log(res.data)
    getProductos();

  }

  function addUpdate(e) {
    e.preventDefault();
    bandera ? addProducto() : UpdateProducto();
    limpiarEstado();
  }

  async function deleteProducto(id) {

    if (window.confirm('Quieres eliminar?')) {
      const res = await axios.delete('http://purosoft.net/apirest_codesa/?id=' + id);
      getProductos();
      console.log(res.data)
    }
  }

  async function getProducto(id) {
    const res = await axios.get('http://purosoft.net/apirest_codesa/?id=' + id);
    setId(res.data.id);
    setNombre(res.data.nombre);
    setIdRol(res.data.id_rol);
    setActivo(res.data.activo);
    setBandera(false)
  }

  function limpiarEstado() {
    setId('');
    setNombre('');
    setIdRol('');
    setActivo('');
    setBandera(true);
  }

 
  return (

    <div className="container ">

      <div className="col-md-12 p-2 ">
        <form className="card p-2 mt-3 border-secondary">
          <h2>Crear Usuario</h2>
          <div className="form-group">
            Nombres: <input type="text" placeholder="Nombre" className="form-control"
              onChange={(e) => setNombre(e.target.value)}
              value={nombre} /></div>

          <div className="form-group">
           {/* Rol: <input type="text" placeholder="Id_rol" className="form-control"
              onChange={(e) => setIdRol(e.target.value)}
              value={id_rol} /> */}
              Rol:
              <select name="roles" className="form-control" onChange={(e) => setIdRol(e.target.value)}>
                <option >Seleccione..</option>
                {rol.map(e =>(
                  <option key={e.id_rol} value={e.id_rol}>{e.nombre}</option>
                )
                )}
              </select>
              </div>
          <div className="form-group">
            Estado:  
            
            {/* 
              <input type="text" placeholder="activo" className="form-control"
              onChange={(e) => setActivo(e.target.value)}
              value={activo} /> 
              <Select 
              onInputChange={(e) => setActivo(e.target.value)}
              value={activo} 
              options={optionsActivo} />

              <Select 
              options={optionsActivo}
              onChange={(e) => setActivo(e.value)}
              /> */}
              <select name="select_activo" className="form-control" onChange={(e) => setActivo(e.target.value)}>
                <option >Seleccione..</option>
                <option value="1">Activo</option>
                <option value="0">Inactivo</option>
              </select>
              </div>

          <button className="btn btn-outline-success btn-sm"
            onClick={(e) => addUpdate(e)} >
            {bandera ? "Agregar" : "Editar"}
            <FaCheckCircle /></button>
        </form>
      </div>

      <div className="col-md-12 p-2">
        {lista.map(producto => (
          <div className="card p-2 mt-2 border-primary" key={producto.id}>
            <div className="card-body">
              <h5 className="text-primary"> Usuario: </h5><hr />
              <h1> ID:{producto.id} - {producto.nombre}</h1> <hr />
              <h2> Rol: {producto.rol}</h2> <hr />
              <h2> Estado: {(producto.activo == 1) ? 'Activo' : 'Inactivo'}</h2> <hr />
              
               <hr />
              <div className="d-flex flex-row-reverse" >
                <button className="btn btn-outline-danger btn-sm "
                  onClick={() => deleteProducto(producto.id)} ><FaTrash />
                </button>
                <button className="btn btn-outline-secondary btn-sm mr-2"
                  onClick={() => getProducto(producto.id)} ><FaPen />
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>

  );
}

export default CargaPost;
