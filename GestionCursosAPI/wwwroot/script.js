// RELOJ Y FECHA
function updateClock() {
    const now = new Date();
    document.getElementById('clock').textContent = now.toLocaleTimeString('es-ES');
    document.getElementById('date').textContent = now.toLocaleDateString('es-ES', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
}

function ocultarTodo() {
  // Ocultamos todas las secciones
  document.getElementById('students-list').style.display = 'none';
  document.getElementById('professors-list').style.display = 'none';
  document.getElementById('courses-list').style.display = 'none';
  document.getElementById('addStudentForm').style.display = 'none';
  document.getElementById('addProfessorForm').style.display = 'none';
  document.getElementById('formularioCurso').style.display = 'none';
  document.getElementById('asignacion-section').style.display = 'none'; // Ocultar asignación
  document.getElementById('matricula-section').style.display = 'none';
  document.getElementById('filter-students-by-subject').style.display = 'none'; // Ocultar filtro de estudiantes por materia
}

function mostrarFormularioEstudiante() {
    // Ocultamos todas las secciones primero
  const formulario = document.getElementById('addStudentForm');
  formulario.style.display = 'block';  // Mostramos el formulario de estudiante
}

function mostrarFormularioMatricula() {
  // Ocultamos todas las secciones primero
const formulario = document.getElementById('matricula-section');
formulario.style.display = 'block';  // Mostramos el formulario de estudiante
}

function mostrarFormularioProfesor() {
    // Ocultamos todas las secciones primero
  const formulario = document.getElementById('addProfessorForm');
  formulario.style.display = 'block';  // Mostramos el formulario de profesor
}

function mostrarFormularioCurso() {
    // Ocultamos todas las secciones primero
  const formulario = document.getElementById('formularioCurso');
  formulario.style.display = 'block';  // Mostramos el formulario de curso
}

function mostrarAsignacion() {
   // Ocultamos todas las secciones primero
  document.getElementById('asignacion-section').style.display = 'block';  // Mostramos la sección de asignación
  formulario.style.display = 'block';
}

function showAsignacion() {
  document.getElementById('asignacion-section').style.display = 'block';

  document.getElementById('students-list').style.display = 'none';
  document.getElementById('professors-list').style.display = 'none';
  document.getElementById('courses-list').style.display = 'none';

  document.getElementById('addStudentForm').style.display = 'none';
  document.getElementById('addProfessorForm').style.display = 'none';
  document.getElementById('formularioCurso').style.display = 'none';
  document.getElementById('matricula-section').style.display = 'none'; // Ocultar matrícula
  document.getElementById('filter-students-by-subject').style.display = 'none';
}


function showMatricula() {
  document.getElementById('matricula-section').style.display = 'block';
  document.getElementById('asignacion-section').style.display = 'none';

  document.getElementById('students-list').style.display = 'none';
  document.getElementById('professors-list').style.display = 'none';
  document.getElementById('courses-list').style.display = 'none';

  document.getElementById('addStudentForm').style.display = 'none';
  document.getElementById('addProfessorForm').style.display = 'none';
  document.getElementById('formularioCurso').style.display = 'none';
  document.getElementById('filter-students-by-subject').style.display = 'none';
}



function showStudents() {
    document.getElementById('students-list').style.display = 'block';
    document.getElementById('professors-list').style.display = 'none';
    document.getElementById('courses-list').style.display = 'none';

    // Ocultar formularios al cambiar de sección
    document.getElementById('addProfessorForm').style.display = 'none';
    document.getElementById('formularioCurso').style.display = 'none';
    document.getElementById('addStudentForm').style.display = 'none';
    document.getElementById('asignacion-section').style.display = 'none'; 
    document.getElementById('matricula-section').style.display = 'none';
    document.getElementById('filter-students-by-subject').style.display = 'none';
    obtenerEstudiantes();
}

function showProfessors() {
    document.getElementById('professors-list').style.display = 'block';
    document.getElementById('students-list').style.display = 'none';
    document.getElementById('courses-list').style.display = 'none';

    document.getElementById('addStudentForm').style.display = 'none';
    document.getElementById('formularioCurso').style.display = 'none';
    document.getElementById('addProfessorForm').style.display = 'none';
    document.getElementById('asignacion-section').style.display = 'none';
    document.getElementById('matricula-section').style.display = 'none';
    document.getElementById('filter-students-by-subject').style.display = 'none';
    obtenerProfesores();
}

function showCourses() {
    document.getElementById('courses-list').style.display = 'block';
    document.getElementById('students-list').style.display = 'none';
    document.getElementById('professors-list').style.display = 'none';

    document.getElementById('addStudentForm').style.display = 'none';
    document.getElementById('addProfessorForm').style.display = 'none';
    document.getElementById('formularioCurso').style.display = 'none';
    document.getElementById('asignacion-section').style.display = 'none';
    document.getElementById('matricula-section').style.display = 'none';
    document.getElementById('filter-students-by-subject').style.display = 'none';
    cargarCursos();
}



function showMateriasEstudiantes() {
  document.getElementById('courses-list').style.display = 'none';
  document.getElementById('students-list').style.display = 'none';
  document.getElementById('professors-list').style.display = 'none';

  document.getElementById('addStudentForm').style.display = 'none';
  document.getElementById('addProfessorForm').style.display = 'none';
  document.getElementById('formularioCurso').style.display = 'none';
  document.getElementById('asignacion-section').style.display = 'none';
  document.getElementById('matricula-section').style.display = 'none';
  document.getElementById('filter-students-by-subject').style.display = 'block';
  cargarCursos();
}


// GUARDAR CURSO
document.getElementById('courseForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const nombre = document.getElementById('nombreCurso').value;
    const credito = parseInt(document.getElementById('creditoCurso').value);
    const mensaje = document.getElementById('msg');

    fetch('/api/cursos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: nombre, creditos: credito })
    })
    .then(res => {
        if (!res.ok) throw new Error('Error al guardar');
        return res.json();
    })
    .then(data => {
        mensaje.style.color = 'lime';
        mensaje.textContent = 'Curso guardado correctamente ✅';
        document.getElementById('courseForm').reset();
        cargarCursos();
    })
    .catch(err => {
        mensaje.style.color = 'red';
        mensaje.textContent = 'Error al guardar el curso ❌';
    });
});

// CARGAR CURSOS
function cargarCursos() {
    const tbody = document.querySelector('#courses-list tbody');
    tbody.innerHTML = '';

    fetch('/api/cursos')
        .then(res => res.json())
        .then(cursos => {
            cursos.forEach(curso => {
                const fila = document.createElement('tr');
                fila.setAttribute('id', `fila-${curso.id}`);
                fila.innerHTML = `
                    <td>${curso.id}</td>
                    <td><span>${curso.nombre}</span><input type="text" value="${curso.nombre}" style="display:none" /></td>
                    <td><span>${curso.creditos}</span><input type="number" value="${curso.creditos}" style="display:none" /></td>
                    <td>
                        <button onclick="activarEdicion(${curso.id})">Editar</button>
                        <button onclick="eliminarCurso(${curso.id})">Eliminar</button>
                        <button style="display:none" onclick="guardarEdicion(${curso.id})">Guardar</button>
                        <button style="display:none" onclick="cancelarEdicion(${curso.id})">Cancelar</button>
                    </td>
                `;
                tbody.appendChild(fila);
            });
        })
        .catch(err => console.error('Error al cargar cursos:', err));
}

function activarEdicion(id) {
    const fila = document.getElementById(`fila-${id}`);
    const spans = fila.querySelectorAll('span');
    const inputs = fila.querySelectorAll('input');
    const botones = fila.querySelectorAll('button');
    spans.forEach(s => s.style.display = 'none');
    inputs.forEach(i => i.style.display = 'inline');
    botones[0].style.display = 'none';
    botones[1].style.display = 'none';
    botones[2].style.display = 'inline';
    botones[3].style.display = 'inline';
}

function cancelarEdicion(id) {
    cargarCursos();
}

function guardarEdicion(id) {
    const fila = document.getElementById(`fila-${id}`);
    const inputs = fila.querySelectorAll('input');
    const nombre = inputs[0].value;
    const creditos = parseInt(inputs[1].value);

    fetch(`/api/cursos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, nombre, creditos })
    })
    .then(res => {
        if (!res.ok) throw new Error('Error al actualizar');
        return res.json();
    })
    .then(() => cargarCursos())
    .catch(err => {
        alert('Error al actualizar el curso ❌');
    });
}

function eliminarCurso(id) {
    if (!confirm('¿Seguro que quieres eliminar este curso?')) return;

    fetch(`/api/cursos/${id}`, { method: 'DELETE' })
        .then(res => {
            if (!res.ok) throw new Error('Error al eliminar');
            return res.json();
        })
        .then(() => {
            alert('Curso eliminado ✅');
            cargarCursos();
        })
        .catch(() => alert('Error al eliminar el curso ❌'));
}

// ESTUDIANTES

function obtenerEstudiantes() {
    fetch(`/api/Estudiantes`)
      .then(res => res.json())
      .then(data => {
        const tabla = document.querySelector("#students-list tbody");
        tabla.innerHTML = "";
  
        data.forEach(estudiante => {
          const fila = document.createElement("tr");
          fila.setAttribute("id", `fila-${estudiante.id}`);
          fila.setAttribute("data-carrera-id", estudiante.carreraId);
  
          const carrera = carreras.find(c => c.id === estudiante.carreraId);
          const nombreCarrera = carrera ? carrera.nombre : "No asignada";
  
          let opcionesCarrera = carreras
            .map(c => `<option value="${c.id}" ${c.id === estudiante.carreraId ? "selected" : ""}>${c.nombre}</option>`)
            .join("");
  
          fila.innerHTML = `
            <td><span>${estudiante.id}</span><input type="text" value="${estudiante.id}" style="display:none;" readonly></td>
            <td><span>${estudiante.nombre}</span><input type="text" value="${estudiante.nombre}" style="display:none;"></td>
            <td><span>${estudiante.apellido}</span><input type="text" value="${estudiante.apellido}" style="display:none;"></td>
            <td><span>${new Date(estudiante.fechaNacimiento).toLocaleDateString()}</span><input type="date" value="${estudiante.fechaNacimiento.split('T')[0]}" style="display:none;"></td>
            <td><span>${estudiante.email}</span><input type="email" value="${estudiante.email}" style="display:none;"></td>
            <td><span>${estudiante.direccion}</span><input type="text" value="${estudiante.direccion}" style="display:none;"></td>
            <td><span>${estudiante.telefono}</span><input type="text" value="${estudiante.telefono}" style="display:none;"></td>
            <td>
              <span>${nombreCarrera}</span>
              <select style="display:none; pointer-events: none; background-color: #eee;">
                ${opcionesCarrera}
              </select>
            </td>
            <td>
              <button onclick="activarEdicionEstudiante('${estudiante.id}')">Editar</button>
              <button onclick="eliminarEstudiantePorId('${estudiante.id}')">Eliminar</button>
              <button onclick="guardarEdicionEstudiante('${estudiante.id}')" style="display:none;">Guardar</button>
              <button onclick="cancelarEdicionEstudiante('${estudiante.id}')" style="display:none;">Cancelar</button>
            </td>
          `;
          tabla.appendChild(fila);
        });
      })
      .catch(() => alert("❌ Error al cargar los estudiantes"));
  }
  
  


function cancelarEdicionEstudiante(id) {
    obtenerEstudiantes();
}

function editarEstudiante(id) {
    // Llamada a la API para obtener los datos del estudiante
    fetch(`/api/Estudiantes/${id}`)
      .then(response => response.json())  // Parseamos la respuesta JSON
      .then(estudiante => {
        // Referencias a los campos del formulario
        const nombreInput = document.getElementById("nombreEstudiante");
        const apellidoInput = document.getElementById("apellidoEstudiante");
        const fechaNacimientoInput = document.getElementById("fechaNacimientoEstudiante");
        const emailInput = document.getElementById("emailEstudiante");
        const direccionInput = document.getElementById("direccionEstudiante");
        const telefonoInput = document.getElementById("telefonoEstudiante");
        const carreraSelect = document.getElementById("carreraEstudiante");
  
        // Rellenamos los campos del formulario con los datos del estudiante
        nombreInput.value = estudiante.nombre;
        apellidoInput.value = estudiante.apellido;
        fechaNacimientoInput.value = estudiante.fechaNacimiento;
        emailInput.value = estudiante.email;
        direccionInput.value = estudiante.direccion;
        telefonoInput.value = estudiante.telefono;
  
        // Seleccionamos la carrera del estudiante en el combo box
        carreraSelect.value = estudiante.carreraId;
      })
      .catch(error => console.log("Error al obtener los datos del estudiante:", error));
  }
  
  // Función para guardar los cambios del estudiante editado
  function guardarEdicionEstudiante(id) {
    const fila = document.getElementById(`fila-${id}`);
    const inputs = fila.querySelectorAll("input");
    const selectCarrera = fila.querySelector("select");
    const carreraIdSeleccionada = selectCarrera.value;
  
    if (!carreraIdSeleccionada) {
      alert("❌ Debes seleccionar una carrera");
      return;
    }
  
    const estudiante = {
      id: id,  // ✅ IMPORTANTE: incluir el id
      nombre: inputs[1].value,
      apellido: inputs[2].value,
      fechaNacimiento: inputs[3].value,
      email: inputs[4].value,
      direccion: inputs[5].value,
      telefono: inputs[6].value,
      carreraId: carreraIdSeleccionada
    };
  
    console.log("Enviando estudiante:", estudiante);
  
    fetch(`/api/Estudiantes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(estudiante)
    })
      .then(async res => {
        if (!res.ok) {
          const errorMsg = await res.text();
          throw new Error(errorMsg || "Error al actualizar el estudiante");
        }
        return res.json();
      })
      .then(() => {
        alert("✅ Estudiante actualizado correctamente");
        obtenerEstudiantes();
      })
      .catch(error => {
        console.error("Error:", error);
        alert("❌ Error al guardar los cambios del estudiante:\n" + error.message);
      });
  }
  
  
  

  function cargarCarreras() {
    fetch(`/api/Carreras`) // Verifica que esta URL sea correcta
      .then(response => response.json())
      .then(data => {
        carreras = data; // Almacenamos las carreras recibidas en la variable global `carreras`
  
        const selectFiltro = document.getElementById("carreraSelect");
        const selectFormulario = document.getElementById("carreraEstudiante");
  
        // Limpiar los selects
        selectFiltro.innerHTML = '<option value="">-- Todas las carreras --</option>';
        selectFormulario.innerHTML = '<option value="">-- Selecciona una carrera --</option>';
  
        data.forEach(carrera => {
          const optionFiltro = document.createElement("option");
          optionFiltro.value = carrera.id; // ID de la carrera
          optionFiltro.textContent = carrera.nombre; // Nombre de la carrera
          selectFiltro.appendChild(optionFiltro);
  
          const optionForm = document.createElement("option");
          optionForm.value = carrera.id; // ID de la carrera
          optionForm.textContent = carrera.nombre; // Nombre de la carrera
          selectFormulario.appendChild(optionForm);
        });
      })
      .catch(error => {
        console.error("❌ Error al cargar las carreras:", error);
        alert("❌ No se pudieron cargar las carreras.");
      });
  }
  

  


function eliminarEstudiantePorId(id) {
    if (!confirm(`¿Seguro que deseas eliminar al estudiante con ID ${id}?`)) return;

    fetch(`/api/Estudiantes/id/${id.toString()}`, {  // Convertir el id a string
        method: 'DELETE'
    })
    .then(res => {
        if (!res.ok) {
            return res.text().then(errorMessage => {
                throw new Error(errorMessage || "No se pudo eliminar el estudiante");
            });
        }
        return res.text(); // Solo texto si no devuelve JSON
    })
    .then(data => {
        alert(data || 'Estudiante eliminado correctamente ✅');
        obtenerEstudiantes(); // Recargar la lista después de eliminar
    })
    .catch(err => {
        console.error("Error:", err);
        alert(`❌ Error al eliminar el estudiante: ${err.message}`);
    });
}

function activarEdicionEstudiante(id) {
    const fila = document.getElementById(`fila-${id}`);
    const spans = fila.querySelectorAll("span");
    const inputs = fila.querySelectorAll("input, select");
    const botones = fila.querySelectorAll("button");
  
    spans.forEach(span => span.style.display = "none");
    inputs.forEach(input => input.style.display = "inline");
  
    botones[0].style.display = "none"; // Editar
    botones[1].style.display = "none"; // Eliminar
    botones[2].style.display = "inline"; // Guardar
    botones[3].style.display = "inline"; // Cancelar
  }
  
  


// Función para enviar los datos del formulario
document.getElementById("estudianteForm").addEventListener("submit", function (event) {
    event.preventDefault();  // Evitar el comportamiento por defecto
  
    const estudiante = {
      id: document.getElementById("id").value,
      nombre: document.getElementById("nombre").value,
      apellido: document.getElementById("apellido").value,
      fechaNacimiento: document.getElementById("fechaNacimiento").value,
      email: document.getElementById("email").value,
      direccion: document.getElementById("direccion").value,
      telefono: document.getElementById("telefono").value,
      carreraId: document.getElementById("carreraEstudiante").value  // Carrera seleccionada
    };
  

    fetch(`/api/Estudiantes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(estudiante)
    })
      .then(response => response.json())
      .then(data => {
        alert("Estudiante agregado con éxito");
        obtenerEstudiantes(); // Actualizar la lista de estudiantes
      })
      .catch(error => console.log("Error al agregar estudiante:", error));
  });
  
  function filtrarEstudiantesPorCarrera() {
    const carreraSeleccionada = document.getElementById("carreraSelect").value;
  
    fetch('/api/Estudiantes')
      .then(res => res.json())
      .then(data => {
        const estudiantesFiltrados = carreraSeleccionada
          ? data.filter(est => est.carreraId === carreraSeleccionada)
          : data;
  
        mostrarEstudiantes(estudiantesFiltrados); // o tu lógica personalizada
      });
  }
  
 

  
  function mostrarEstudiantes(estudiantes) {
    const tbody = document.querySelector("#students-list tbody");
    tbody.innerHTML = ""; // Limpiar la tabla antes de agregar nuevos estudiantes
  
    estudiantes.forEach(estudiante => {
      const row = document.createElement("tr");
  
      // 🔍 Buscar el nombre de la carrera a partir del ID
      const carrera = carreras.find(c => c.id === estudiante.carreraId);
      const nombreCarrera = carrera ? carrera.nombre : "No asignada";
  
      // 🗓️ Formatear fecha
      const fechaFormateada = new Date(estudiante.fechaNacimiento).toLocaleDateString('es-ES');
  
      row.innerHTML = `
        <td>${estudiante.id}</td>
        <td>${estudiante.nombre}</td>
        <td>${estudiante.apellido}</td>
        <td>${fechaFormateada}</td>
        <td>${estudiante.email}</td>
        <td>${estudiante.direccion}</td>
        <td>${estudiante.telefono}</td>
        <td>${nombreCarrera}</td>
        <td>
          <button onclick="editarEstudiante('${estudiante.id}')">Editar</button>
          <button onclick="eliminarEstudiantePorId('${estudiante.id}')">Eliminar</button>
        </td>
      `;
      tbody.appendChild(row);
    });
  }
  
  let carreras = [];  

  function cargarCarrerasFormulario() {
    fetch("/api/Carreras")
      .then(response => response.json())  // Parseamos la respuesta JSON
      .then(data => {
        carreras = data;  // Guardamos todas las carreras en la variable `carreras`
        const carreraSelect = document.getElementById("carreraEstudiante");  // Referencia al select de carrera
  
        // Limpiamos el select y agregamos una opción por defecto
        carreraSelect.innerHTML = '<option value="">-- Selecciona una carrera --</option>';
  
        // Llenamos el select con las opciones de carrera
        data.forEach(carrera => {
          const option = document.createElement("option");
          option.value = carrera.id; // ID de la carrera
          option.textContent = carrera.nombre; // Nombre de la carrera
          carreraSelect.appendChild(option);
        });
      })
      .catch(error => console.log("Error al cargar las carreras:", error));  // Manejo de errores
  }

// PROFESORES (mismo patrón)
document.getElementById("profesoresForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const profesor = {
        id: document.getElementById("idProfesor").value,
        nombre: document.getElementById("nombreProfesor").value,
        apellido: document.getElementById("apellidoProfesor").value,
        fechaNacimiento: document.getElementById("fechaNacimientoProfesor").value,
        email: document.getElementById("emailProfesor").value,
        direccion: document.getElementById("direccionProfesor").value,
        telefono: document.getElementById("telefonoProfesor").value
    };

    const mensaje = document.getElementById("mensajeProfesores");
    
    fetch(`/api/profesores`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profesor)
    })
    .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
    })
    .then(() => {
        mensaje.style.color = "lime";
        mensaje.textContent = "Profesor guardado correctamente ✅";
        document.getElementById("profesoresForm").reset();
        obtenerProfesores();
    })
    .catch(() => {
        mensaje.style.color = "red";
        mensaje.textContent = "❌ Error al guardar el profesor";
    });
});

function obtenerProfesores() {
    fetch(`/api/profesores`)
        .then(res => res.json())
        .then(data => {
            const tabla = document.querySelector("#professors-list tbody");
            tabla.innerHTML = "";
            data.forEach(profesor => {
                const fila = document.createElement("tr");
                fila.setAttribute('id', `fila-${profesor.id}`);
                fila.innerHTML = `
                    <td><span>${profesor.id}</span><input type="text" value="${profesor.id}" disabled style="display:none;"></td>
                    <td><span>${profesor.nombre}</span><input type="text" value="${profesor.nombre}" style="display:none;"></td>
                    <td><span>${profesor.apellido}</span><input type="text" value="${profesor.apellido}" style="display:none;"></td>
                    <td><span>${new Date(profesor.fechaNacimiento).toLocaleDateString()}</span><input type="date" value="${profesor.fechaNacimiento.split('T')[0]}" style="display:none;"></td>
                    <td><span>${profesor.email}</span><input type="email" value="${profesor.email}" style="display:none;"></td>
                    <td><span>${profesor.direccion}</span><input type="text" value="${profesor.direccion}" style="display:none;"></td>
                    <td><span>${profesor.telefono}</span><input type="text" value="${profesor.telefono}" style="display:none;"></td>
                    <td>
                        <button onclick="activarEdicionProfesor('${profesor.id}')">Editar</button>
                        <button onclick="eliminarProfesor('${profesor.id}')">Eliminar</button>
                        <button style="display:none;" onclick="guardarEdicionProfesor('${profesor.id}')">Guardar</button>
                        <button style="display:none;" onclick="cancelarEdicionProfesor('${profesor.id}')">Cancelar</button>
                    </td>
                `;
                tabla.appendChild(fila);
            });
        })
        .catch(() => alert("Error al obtener los profesores ❌"));
    }

    function activarEdicionProfesor(id) {
        const fila = document.getElementById(`fila-${id}`);
        const spans = fila.querySelectorAll("span");
        const inputs = fila.querySelectorAll("input");
        const botones = fila.querySelectorAll("button");
    
        spans.forEach(span => span.style.display = "none");
        inputs.forEach(input => input.style.display = "inline");
        botones[0].style.display = "none";  // Editar
        botones[1].style.display = "none";  // Eliminar
        botones[2].style.display = "inline"; // Guardar
        botones[3].style.display = "inline"; // Cancelar
    }
    
    function cancelarEdicionProfesor(id) {
        obtenerProfesores();  // Recarga la tabla y restaura todo
    }
    
    function guardarEdicionProfesor(id) {
        const fila = document.getElementById(`fila-${id}`);
        const inputs = fila.querySelectorAll("input");
    
        const profesor = {
            id: id,
            nombre: inputs[1].value,
            apellido: inputs[2].value,
            fechaNacimiento: inputs[3].value,
            email: inputs[4].value,
            direccion: inputs[5].value,
            telefono: inputs[6].value
        };
    
        fetch(`/api/profesores/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(profesor)
        })
        .then(() => obtenerProfesores())
        .catch(() => alert("❌ Error al guardar los cambios del profesor"));
    }
    
    function eliminarProfesor(id) {
        if (!confirm(`¿Seguro que deseas eliminar al profesor con ID ${id}?`)) return;
    
        fetch(`/api/profesores/id/${id}`, {
            method: "DELETE"
        })
        .then(res => {
            if (!res.ok) throw new Error("No se pudo eliminar el profesor");
            return res.json();
        })
        .then(() => {
            alert("✅ Profesor eliminado correctamente");
            obtenerProfesores();
        })
        .catch(err => {
            console.error("Error:", err);
            alert("❌ Error al eliminar el profesor");
        });
    }    

    
      



    function cargarAsignaciones() {
      fetch(`/api/MatriculaCarrera`)
        .then(res => res.json())
        .then(asignaciones => {
          const tbody = document.getElementById("tablaAsignaciones");
          tbody.innerHTML = "";
    
          // Fetch los datos de referencia para mostrar nombres
          Promise.all([
            fetch("/api/Carreras").then(r => r.json()),
            fetch("/api/Cursos").then(r => r.json()),
            fetch("/api/Profesores").then(r => r.json())
          ]).then(([carreras, materias, profesores]) => {
            asignaciones.forEach(a => {
              const carrera = carreras.find(c => c.id === a.carreraId);
              const materia = materias.find(m => m.id === a.materiaId);
              const profesor = profesores.find(p => p.id === a.profesorId);
    
              const tr = document.createElement("tr");
    
              tr.innerHTML = `
                <td style="padding: 10px;">${carrera ? carrera.nombre : "❓"}</td>
                <td style="padding: 10px;">${materia ? materia.nombre : "❓"}</td>
                <td style="padding: 10px;">${profesor ? profesor.nombre + " " + profesor.apellido : "❓"}</td>
                <td style="padding: 10px;">${a.semestre}</td>
                <td style="padding: 10px;">
                  <button onclick="eliminarAsignacion(${a.id})" style="background:red;color:white;border:none;padding:5px 10px;border-radius:5px;">🗑 Eliminar</button>
                </td>
              `;
    
              tbody.appendChild(tr);
            });
          });
        })
        .catch(err => console.error("❌ Error cargando asignaciones:", err));
    }
    

    function eliminarAsignacion(id) {
      if (!confirm("¿Estás seguro de que quieres eliminar esta asignación?")) return;
    
      fetch(`/api/MatriculaCarrera/${id}`, {
        method: "DELETE"
      })
        .then(res => {
          if (res.ok) {
            cargarAsignaciones();
            alert("✅ Asignación eliminada correctamente");
          } else {
            alert("❌ Error al eliminar");
          }
        })
        .catch(err => {
          console.error("Error:", err);
          alert("❌ Error de red");
        });
    }
    


    function mostrarAsignacion() {
      ocultarTodo();
      document.getElementById('asignacion-section').style.display = 'block';
      cargarCarrerasAsignacion();
      cargarMateriasAsignacion();
      cargarProfesoresAsignacion();
      cargarAsignaciones();  // 👈 Aquí también
    }
    
    
    
    document.getElementById("formAsignacion").addEventListener("submit", function (e) {
      e.preventDefault();
      guardarAsignacion();
    });
    
    function guardarAsignacion() {
      const asignacion = {
          carreraId: document.getElementById("carreraAsignacion").value,  // Esto obtiene el ID de la carrera seleccionada
          materiaId: document.getElementById("materiaAsignacion").value,  // Esto obtiene el ID de la materia seleccionada
          profesorId: document.getElementById("profesorAsignacion").value, // Esto obtiene el ID del profesor seleccionado
          semestre: document.getElementById("semestreAsignacion").value   // Esto obtiene el semestre
      };
  
      fetch(`/api/MatriculaCarrera`, {  // Usa el endpoint de tu API que maneja la creación de asignaciones
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(asignacion)  // Enviamos los datos como JSON
      })
      .then(res => {
          if (res.ok) {
              document.getElementById("msgAsignacion").textContent = "✅ Asignación guardada correctamente";
              document.getElementById("formAsignacion").reset();  // Limpia el formulario
              cargarAsignaciones();  // Recarga la tabla de asignaciones
          } else {
              document.getElementById("msgAsignacion").textContent = "❌ Error al guardar";
          }
      })
      .catch(err => {
          console.error(err);
          document.getElementById("msgAsignacion").textContent = "❌ Error de red";
      });
  }
  




    
    // 🔽 Estas funciones llenan los combos
    function cargarCarrerasAsignacion() {
      fetch(`/api/Carreras`)  // ✅ endpoint correcto
        .then(response => response.json())
        .then(carreras => {
          const select = document.getElementById("carreraAsignacion");
          select.innerHTML = "<option value=''>-- Selecciona una carrera --</option>";
          carreras.forEach(c => {
            const option = document.createElement("option");
            option.value = c.id;
            option.textContent = c.nombre;
            select.appendChild(option);
          });
        })
        .catch(error => console.error("❌ Error cargando carreras:", error));
    }
    
    
    function cargarMateriasAsignacion() {
      fetch("/api/cursos")
        .then(response => response.json())
        .then(materias => {
          const select = document.getElementById("materiaAsignacion");
          select.innerHTML = "<option value=''>-- Selecciona una materia --</option>";
          materias.forEach(m => {
            const option = document.createElement("option");
            option.value = m.id;
            option.textContent = m.nombre;
            select.appendChild(option);
          });
        })
        .catch(error => console.error("Error cargando materias:", error));
    }
    
    function cargarProfesoresAsignacion() {
      fetch("/api/Profesores")
        .then(response => response.json())
        .then(profesores => {
          const select = document.getElementById("profesorAsignacion");
          select.innerHTML = "<option value=''>-- Selecciona un profesor --</option>";
          profesores.forEach(p => {
            const option = document.createElement("option");
            option.value = p.id;
            option.textContent = `${p.nombre} ${p.apellido}`;
            select.appendChild(option);
          });
        })
        .catch(error => console.error("Error cargando profesores:", error));
    }
    













// Declaración global de la variable, solo una vez
// Declaración global de la variable, solo una vez
let carrerasMat = [];  

function cargarCarrerasMatr() {
  // Verifica si `carrerasMat` ya tiene datos cargados, si no, hace el fetch
  if (carrerasMat.length === 0) {
    fetch("/api/matricula/carreraMatricula") // Endpoint correcto para obtener las carreras desde el controlador de Matricula
      .then(response => response.json())
      .then(data => {
        carrerasMat = data; // Almacenamos las carreras recibidas en la variable global `carrerasMat`

        const selectFiltro = document.getElementById("carreraSelect");
        const selectFormulario = document.getElementById("carreraEstudiante");

        // Limpiar los selects
        selectFiltro.innerHTML = '<option value="">-- Todas las carreras --</option>';
        selectFormulario.innerHTML = '<option value="">-- Selecciona una carrera --</option>';

        data.forEach(carrera => {
          const optionFiltro = document.createElement("option");
          optionFiltro.value = carrera.id; // ID de la carrera
          optionFiltro.textContent = carrera.nombre; // Nombre de la carrera
          selectFiltro.appendChild(optionFiltro);

          const optionForm = document.createElement("option");
          optionForm.value = carrera.id; // ID de la carrera
          optionForm.textContent = carrera.nombre; // Nombre de la carrera
          selectFormulario.appendChild(optionForm);
        });
      })
      .catch(error => {
        console.error("❌ Error al cargar las carreras:", error);
        alert("❌ No se pudieron cargar las carreras.");
      });
  } else {
    // Si ya tenemos datos en `carrerasMat`, solo actualizamos los selects
    const selectFiltro = document.getElementById("carreraSelect");
    const selectFormulario = document.getElementById("carreraEstudiante");

    // Limpiar los selects
    selectFiltro.innerHTML = '<option value="">-- Todas las carreras --</option>';
    selectFormulario.innerHTML = '<option value="">-- Selecciona una carrera --</option>';

    carrerasMat.forEach(carrera => {
      const optionFiltro = document.createElement("option");
      optionFiltro.value = carrera.id;
      optionFiltro.textContent = carrera.nombre;
      selectFiltro.appendChild(optionFiltro);

      const optionForm = document.createElement("option");
      optionForm.value = carrera.id;
      optionForm.textContent = carrera.nombre;
      selectFormulario.appendChild(optionForm);
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  cargarCarrerasMatr();  // Cargar todas las carreras al inicio

  // Cuando se cambia la selección de la carrera, filtrar estudiantes y cursos
  document.getElementById("carrera").addEventListener("change", function() {
      const carreraId = this.value;
      const semestre = document.getElementById("semestre").value;

      console.log("Carrera seleccionada:", carreraId);

      if (carreraId) {
          document.getElementById("matricula-section").style.display = "block";  // Muestra la sección

          // Filtrar estudiantes y cursos para la carrera seleccionada
          filtrarEstudiantesPorCarreraMatricula(carreraId);
          filtrarCursosPorCarreraYSemestre(carreraId, semestre);  // Filtrar cursos también
      } else {
          document.getElementById("matricula-section").style.display = "none";  // Ocultar la sección si no hay carrera seleccionada
      }
  });

  // Cuando se cambia el semestre, filtrar los cursos
  document.getElementById("semestre").addEventListener("change", function() {
      const carreraId = document.getElementById("carrera").value;
      const semestre = this.value;

      if (carreraId && semestre) {
          filtrarCursosPorCarreraYSemestre(carreraId, semestre);
      }
  });
});

// Filtrar los estudiantes por la carrera seleccionada
function filtrarEstudiantesPorCarreraMatricula(carreraId) {
  console.log("Filtrando estudiantes para la carrera con ID:", carreraId);

  if (!carreraId) {
      console.log("No se ha seleccionado una carrera válida.");
      return;
  }

  fetch(`/api/matricula/carreraMat/${carreraId}`)
  .then(res => res.json())
  .then(estudiantes => {
      const estudianteSelect = document.getElementById("estudiante");
      estudianteSelect.innerHTML = "<option value=''>-- Selecciona un estudiante --</option>";  // Limpiar el select

      if (estudiantes.length === 0) {
          estudianteSelect.innerHTML = "<option value=''>-- No hay estudiantes --</option>";
          return;
      }

      estudiantes.forEach(estudiante => {
          const option = document.createElement("option");
          option.value = estudiante.id;  // Usamos el ID del estudiante
          option.textContent = `${estudiante.nombre} ${estudiante.apellido}`;  // Nombre completo del estudiante

          estudianteSelect.appendChild(option);
      });
  })
  .catch(err => {
      console.error("Error al filtrar estudiantes:", err);
      const estudianteSelect = document.getElementById("estudiante");
      estudianteSelect.innerHTML = "<option value=''>-- Error al cargar estudiantes --</option>";
  });
}







// Filtrar los profesores por la carrera, semestre y materia seleccionada
// Filtrar los profesores por la carrera, semestre y materia seleccionada
function filtrarProfesoresPorCarreraSemestreMateria(carreraId, semestre, materiaId) {
  console.log("Filtrando profesores para la carrera:", carreraId, "semestre:", semestre, "y materia:", materiaId);

  if (!carreraId || !semestre || !materiaId) {
      console.log("Faltan parámetros necesarios");
      return; // No hacer nada si no hay carrera, semestre o materia seleccionada
  }

  const profesorSelect = document.getElementById("profesor");
  profesorSelect.innerHTML = "<option value=''>-- Selecciona un profesor --</option>"; // Limpiar el select de profesores

  // Realizar la solicitud a la API para obtener los profesores
  fetch(`/api/matricula/profesores/carrera/${carreraId}/semestre/${semestre}/materia/${materiaId}`)
      .then(res => res.json())
      .then(profesores => {
          console.log("Profesores recibidos:", profesores);

          // Si no hay profesores disponibles, muestra un mensaje
          if (profesores.length === 0) {
              profesorSelect.innerHTML = "<option value=''>-- No hay profesores disponibles --</option>";
              return;
          }

          // Agregar los profesores al select
          profesores.forEach(profesor => {
              const option = document.createElement("option");
              option.value = profesor.profesorId;  // Usar el 'profesorId' de la respuesta de la API
              option.textContent = profesor.profesorId;  // Mostrar solo el 'profesorId' (la cédula)
              profesorSelect.appendChild(option);
          });
      })
      .catch(err => {
          console.error("Error al filtrar profesores:", err);
          profesorSelect.innerHTML = "<option value=''>-- Error al cargar profesores --</option>";  // Mensaje de error
      });
}



// Llamada al cambiar la carrera
document.getElementById("carrera").addEventListener("change", function() {
  const carreraId = this.value;
  const semestre = document.getElementById("semestre").value;
  const materiaId = document.getElementById("materia").value;

  if (carreraId) {
      // Si la carrera está seleccionada, filtra estudiantes, cursos y profesores
      filtrarEstudiantesPorCarreraMatricula(carreraId);
      filtrarCursosPorCarreraYSemestre(carreraId, semestre);
      filtrarProfesoresPorCarreraSemestreMateria(carreraId, semestre, materiaId);
  } else {
      // Si no hay carrera seleccionada, ocultar la sección
      document.getElementById("matricula-section").style.display = "none";
  }
});

// Llamada al cambiar el semestre
document.getElementById("semestre").addEventListener("change", function() {
  const carreraId = document.getElementById("carrera").value;
  const semestre = this.value;
  const materiaId = document.getElementById("materia").value;

  if (carreraId && semestre) {
      filtrarCursosPorCarreraYSemestre(carreraId, semestre);
      filtrarProfesoresPorCarreraSemestreMateria(carreraId, semestre, materiaId);
  }
});

// Llamada al cambiar la materia
document.getElementById("materia").addEventListener("change", function() {
  const carreraId = document.getElementById("carrera").value;
  const semestre = document.getElementById("semestre").value;
  const materiaId = this.value;

  if (carreraId && semestre && materiaId) {
      filtrarProfesoresPorCarreraSemestreMateria(carreraId, semestre, materiaId);
  }
});



document.getElementById('matriculaForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const estudianteId = document.getElementById('estudiante').value;
  const carreraId = document.getElementById('carrera').value;
  const semestre = document.getElementById('semestre').value;
  const materiaId = document.getElementById('materia').value;
  const profesorId = document.getElementById('profesor').value;
  const horario = document.getElementById('horario').value;
  const fechaMatricula = document.getElementById('fecha').value;

  const mensaje = document.getElementById("mensajeMatricula");
  mensaje.innerHTML = ""; // Limpiar mensaje anterior

  if (!estudianteId || !carreraId || !semestre || !materiaId || !profesorId || !horario || !fechaMatricula) {
    mensaje.innerHTML = "⚠️ Por favor, completa todos los campos.";
    return;
  }

  // 🔍 Buscar el ID de la materiaPorCarrera
  fetch(`/api/Matricula/materiasporcarrera/buscar?materiaId=${materiaId}&carreraId=${carreraId}&semestre=${semestre}&profesorId=${profesorId}`)
    .then(response => response.json())
    .then(data => {
      if (!data || !data.id) {
        mensaje.innerHTML = "❌ No se encontró una asignación válida de la materia con esos datos.";
        return;
      }

      const materiaPorCarreraId = data.id;

      // 🎯 Hacer la matrícula
      fetch("/api/Matricula", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          estudianteId: estudianteId,
          matriculaCarreraId: materiaPorCarreraId,
          fechaMatricula: fechaMatricula,
          horario: horario
        })
      })
        .then(response => response.json().then(data => ({ status: response.status, body: data })))
        .then(res => {
          if (res.status === 200) {
            mensaje.innerHTML = `✅ ${res.body.message}`;
          } else {
            mensaje.innerHTML = `❌ ${res.body.message || "Error al matricular al estudiante."}`;
          }
        })
        .catch(error => {
          console.error("❌ Error al enviar la matrícula:", error);
          mensaje.innerHTML = "⚠️ Error al conectar con el servidor.";
        });
    })
    .catch(error => {
      console.error("❌ Error al buscar MateriaPorCarrera:", error);
      mensaje.innerHTML = "⚠️ Error al buscar datos de la materia.";
    });
});











document.addEventListener("DOMContentLoaded", () => {
  cargarCarrerass(); // Cargar las carreras disponibles al inicio

  // Evento para cargar materias cuando cambia la carrera o semestre
  document.getElementById("filterCarrera").addEventListener("change", cargarMateriasFiltro);
  document.getElementById("filterSemestre").addEventListener("change", cargarMateriasFiltro);

  // Evento para filtrar estudiantes
  document.getElementById("filterForm").addEventListener("submit", function(e) {
    e.preventDefault(); // Prevenir el envío tradicional del formulario

    const carreraId = document.getElementById("filterCarrera").value;
    const semestre = document.getElementById("filterSemestre").value;
    const materiaId = document.getElementById("filterMateria").value;
    const profesorId = document.getElementById("filterProfesor").value;

    filtrarEstudiantes(carreraId, semestre, materiaId, profesorId);
  });
});

// Cargar las carreras desde la API
function cargarCarrerass() {
  fetch('/api/carreras') // Asegúrate de que esta URL sea correcta
    .then(response => response.json())
    .then(data => {
      const carreraSelect = document.getElementById("filterCarrera");
      data.forEach(carrera => {
        const option = document.createElement("option");
        option.value = carrera.id;
        option.textContent = carrera.nombre;
        carreraSelect.appendChild(option);
      });
    })
    .catch(error => console.error('Error al cargar las carreras:', error));
}

function cargarMateriasFiltro() {
  const carreraId = document.getElementById("filterCarrera").value;
  const semestre = document.getElementById("filterSemestre").value;
  const selectMateria = document.getElementById("filterMateria");

  // Limpiar el select
  selectMateria.innerHTML = '<option value="">-- Selecciona una materia --</option>';

  if (!carreraId || !semestre) return;

  // ✅ Usamos el endpoint correcto
  fetch(`/api/Cursos/carrera/${carreraId}/semestre/${semestre}`)
    .then(response => {
      if (!response.ok) {
        throw new Error("No se pudieron cargar las materias");
      }
      return response.json();
    })
    .then(data => {
      console.log("📚 Cursos recibidos:", data);

      if (data.length === 0) {
        const option = document.createElement("option");
        option.value = "";
        option.textContent = "No hay materias disponibles";
        selectMateria.appendChild(option);
        return;
      }

      data.forEach(curso => {
        const option = document.createElement("option");
        option.value = curso.id || curso.ID;
        option.textContent = curso.nombre || curso.Nombre;
        selectMateria.appendChild(option);
      });
    })
    .catch(error => {
      console.error("❌ Error cargando cursos:", error);
      alert("❌ No se pudieron cargar las materias: " + error.message);
    });
}


document.getElementById("filterMateria").addEventListener("change", cargarProfesoresFiltro);

function cargarProfesoresFiltro() {
  const carreraId = document.getElementById("filterCarrera").value;
  const semestre = document.getElementById("filterSemestre").value;
  const materiaId = document.getElementById("filterMateria").value;
  const selectProfesor = document.getElementById("filterProfesor");

  // Limpiar select
  selectProfesor.innerHTML = '<option value="">-- Selecciona un profesor --</option>';

  if (!carreraId || !semestre || !materiaId) return;

  // 💥 Usamos el nuevo endpoint con toda la info
  fetch(`/api/Profesores/carrera/${carreraId}/semestre/${semestre}/materia/${materiaId}`)
    .then(response => {
      if (!response.ok) throw new Error("No se pudieron cargar los profesores");
      return response.json();
    })
    .then(profesores => {
      if (profesores.length === 0) {
        const option = document.createElement("option");
        option.value = "";
        option.textContent = "No hay profesores disponibles";
        selectProfesor.appendChild(option);
        return;
      }

      profesores.forEach(profesor => {
        const option = document.createElement("option");
        option.value = profesor.id;
        option.textContent = `${profesor.nombre} ${profesor.apellido}`;
        selectProfesor.appendChild(option);
      });
    })
    .catch(error => {
      console.error("❌ Error cargando profesores:", error);
      alert("❌ No se pudieron cargar los profesores: " + error.message);
    });
}


function filtrarEstudiantes(carreraId, semestre, materiaId) {
  if (!carreraId || !semestre || !materiaId) {
    alert("Por favor, selecciona Carrera, Semestre y Materia antes de filtrar.");
    return;
  }

  const url = `/api/EstudiantesMaterias/carrera/${carreraId}/semestre/${semestre}/materia/${materiaId}`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("No se pudieron obtener los estudiantes");
      }
      return response.json();
    })
    .then(data => {
      console.log("🎓 Estudiantes recibidos:", data);

      const tbody = document.getElementById("filteredStudentsTable");
      tbody.innerHTML = ''; // Limpiar siempre antes de renderizar

      if (!Array.isArray(data) || data.length === 0) {
        tbody.innerHTML = '<tr><td colspan="9" style="text-align:center;">😕 No se encontraron estudiantes con los criterios seleccionados.</td></tr>';
        return;
      }

      data.forEach(estudiante => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${estudiante.id}</td>
          <td>${estudiante.nombre}</td>
          <td>${estudiante.apellido}</td>
          <td>${new Date(estudiante.fechaNacimiento).toLocaleDateString()}</td>
          <td>${estudiante.email}</td>
          <td>${estudiante.direccion}</td>
          <td>${estudiante.telefono}</td>
          <td>${estudiante.carreraId}</td>
          <td><button onclick="verDetalles('${estudiante.id}')">Ver detalles</button></td>
        `;
        tbody.appendChild(row);
      });
    })
    .catch(error => {
      console.error("❌ Error cargando estudiantes:", error);
      const tbody = document.getElementById("filteredStudentsTable");
      tbody.innerHTML = '<tr><td colspan="9" style="text-align:center;">❌ Error al cargar estudiantes.</td></tr>';
      alert("❌ No se pudieron cargar los estudiantes: " + error.message);
    });
}



// Función para ver detalles del estudiante (puedes personalizarla)
function verDetalles(estudianteId) {
  console.log("Ver detalles de estudiante ID:", estudianteId);
  // Aquí puedes redirigir a una página de detalles o abrir un modal, etc.
}



      window.onload = function () {
        cargarCarreras(); 
        cargarCarrerasMatr();   
        //cargarCarrerass();        // Llenar combo filtro y formulario
        cargarCarrerasFormulario();   // Solo si es distinto (aunque ya podrías integrarlo en el anterior)
        obtenerEstudiantes();
        obtenerProfesores();
        cargarCursos();
        updateClock();
        setInterval(updateClock, 1000);
      };
      
  
      
      
