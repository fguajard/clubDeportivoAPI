$(document).ready(function () {
  getData();
});

function getData() {
  $("#cuerpo").html("");
  axios.get("http://localhost:3000/deportes").then((data) => {
    let deportes = data.data;
    deportes.forEach((d, i) => {
      $("#cuerpo").append(`
        <tr>
          <th scope="row">${i + 1}</th>
          <td>${d.nombre}</td>
          <td>${d.precio}</td>
          <td>
            <button class="btn btn-warning" onclick='preEdit("${d.nombre}","${
        d.precio}","${i}")' data-toggle="modal" data-target="#exampleModal">Editar</button>
            <button class="btn btn-danger" onclick='eliminar("${i}")'>Eliminar</button>
          </td>
        </tr>
        `);
    });
  });
}

function preEdit(nombre, precio, index) {
  $("#nombreModal").val(nombre);
  $("#precioModal").val(precio);
  $("#indexModal").val(index);
}

function agregar() {
  let nombre = $("#nombre").val();
  let precio = $("#precio").val();
  axios
    .post(`http://localhost:3000/agregar`, {
      nombre,
      precio,
    })
    .then((data) => {
      alert(JSON.stringify(data.data))
      getData();
    });
  $("#exampleModal").modal("hide");
}

function edit() {
  let nombre = $("#nombreModal").val();
  let precio = $("#precioModal").val();
  let index = $("#indexModal").val();
  axios
    .put(`http://localhost:3000/editar?index=${index}`, {
      nombre,
      precio,
    })
    .then((data) => {
      alert(JSON.stringify(data.data))
      getData();
    });
  $("#exampleModal").modal("hide");
}

function eliminar(index) {
  axios.delete(`http://localhost:3000/eliminar?index=${index}`).then((data) => {
    alert(JSON.stringify(data.data))
    getData();
  });
  $("#exampleModal").modal("hide");
}
