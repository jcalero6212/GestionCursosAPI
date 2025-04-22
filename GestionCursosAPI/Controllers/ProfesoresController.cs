using GestionCursosAPI.Models;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
namespace GestionCursosAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProfesoresController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public ProfesoresController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public IActionResult GetProfesores()
        {
            List<Profesores> profesores = new List<Profesores>();
            string connectionString = _configuration.GetConnectionString("Connection");

            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                string query = "SELECT Id, Nombre, Apellido, FechaNacimiento, Email, Direccion, Telefono FROM Profesores";
                SqlCommand cmd = new SqlCommand(query, conn);
                conn.Open();

                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    profesores.Add(new Profesores
                    {
                        Id = reader["Id"].ToString(),
                        Nombre = CapitalizeFirstLetter(reader["Nombre"].ToString()),
                        Apellido = CapitalizeFirstLetter(reader["Apellido"].ToString()),
                        FechaNacimiento = Convert.ToDateTime(reader["FechaNacimiento"]),
                        Email = reader["Email"].ToString(),
                        Direccion = CapitalizeFirstLetter(reader["Direccion"].ToString()),
                        Telefono = reader["Telefono"].ToString(),
                    });
                }

                conn.Close();
            }

            return Ok(profesores);
        }



        [HttpPost]
        public IActionResult InsertarProfesor([FromBody] Profesores nuevoProfesor)
        {
            if (string.IsNullOrEmpty(nuevoProfesor.Id) || nuevoProfesor.Id.Length != 10)
            {
                return BadRequest("La cédula es obligatoria y debe tener 10 dígitos.");
            }

            if (!EsCedulaValida(nuevoProfesor.Id))
            {
                return BadRequest("La cédula ingresada no es válida.");
            }

            nuevoProfesor.Nombre = CapitalizeFirstLetter(nuevoProfesor.Nombre);
            nuevoProfesor.Apellido = CapitalizeFirstLetter(nuevoProfesor.Apellido);
            nuevoProfesor.Direccion = CapitalizeFirstLetter(nuevoProfesor.Direccion);

            string connectionString = _configuration.GetConnectionString("Connection");

            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                string query = @"INSERT INTO Profesores (Id, Nombre, Apellido, FechaNacimiento, Email, Direccion, Telefono)
                         VALUES (@Id, @Nombre, @Apellido, @FechaNacimiento, @Email, @Direccion, @Telefono)";
                SqlCommand cmd = new SqlCommand(query, conn);
                cmd.Parameters.AddWithValue("@Id", nuevoProfesor.Id);
                cmd.Parameters.AddWithValue("@Nombre", nuevoProfesor.Nombre);
                cmd.Parameters.AddWithValue("@Apellido", nuevoProfesor.Apellido);
                cmd.Parameters.AddWithValue("@FechaNacimiento", nuevoProfesor.FechaNacimiento);
                cmd.Parameters.AddWithValue("@Email", nuevoProfesor.Email);
                cmd.Parameters.AddWithValue("@Direccion", nuevoProfesor.Direccion);
                cmd.Parameters.AddWithValue("@Telefono", nuevoProfesor.Telefono);

                conn.Open();
                cmd.ExecuteNonQuery();
                conn.Close();
            }

            return Ok(new { message = "Profesor insertado correctamente ✅" });
        }

        private static bool EsCedulaValida(string cedula)
        {
            if (cedula.Length != 10 || !cedula.All(char.IsDigit))
                return false;

            int digitoRegion = int.Parse(cedula.Substring(0, 2));
            if (digitoRegion < 1 || digitoRegion > 24)
                return false;

            int ultimoDigito = int.Parse(cedula[9].ToString());

            int sumaPares = int.Parse(cedula[1].ToString()) +
                            int.Parse(cedula[3].ToString()) +
                            int.Parse(cedula[5].ToString()) +
                            int.Parse(cedula[7].ToString());

            int sumaImpares = 0;
            for (int i = 0; i < 9; i += 2)
            {
                int num = int.Parse(cedula[i].ToString()) * 2;
                if (num > 9) num -= 9;
                sumaImpares += num;
            }

            int sumaTotal = sumaPares + sumaImpares;
            int digitoValidador = 10 - (sumaTotal % 10);
            if (digitoValidador == 10) digitoValidador = 0;

            return digitoValidador == ultimoDigito;
        }



        [HttpPut("{id}")]
        public IActionResult ActualizarProfesor(string id, [FromBody] Profesores profesor)
        {
            profesor.Nombre = CapitalizeFirstLetter(profesor.Nombre);
            profesor.Apellido = CapitalizeFirstLetter(profesor.Apellido);
            profesor.Direccion = CapitalizeFirstLetter(profesor.Direccion);

            string connectionString = _configuration.GetConnectionString("Connection");

            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                string query = "UPDATE Profesores SET Nombre = @Nombre, Apellido = @Apellido, FechaNacimiento = @FechaNacimiento, Email = @Email, Direccion = @Direccion, Telefono = @Telefono WHERE Id = @Id";
                SqlCommand cmd = new SqlCommand(query, conn);
                cmd.Parameters.AddWithValue("@Id", id);
                cmd.Parameters.AddWithValue("@Nombre", profesor.Nombre);
                cmd.Parameters.AddWithValue("@Apellido", profesor.Apellido);
                cmd.Parameters.AddWithValue("@FechaNacimiento", profesor.FechaNacimiento);
                cmd.Parameters.AddWithValue("@Email", profesor.Email);
                cmd.Parameters.AddWithValue("@Direccion", profesor.Direccion);
                cmd.Parameters.AddWithValue("@Telefono", profesor.Telefono);

                conn.Open();
                cmd.ExecuteNonQuery();
                conn.Close();
            }

            return Ok(new { message = "Profesor actualizado correctamente." });
        }


        [HttpDelete("id/{id}")]
        public IActionResult EliminarPorId(string id)  // Cambiar a string
        {
            string connectionString = _configuration.GetConnectionString("Connection");

            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                string query = "DELETE FROM Profesores WHERE Id = @Id";
                SqlCommand cmd = new SqlCommand(query, conn);
                cmd.Parameters.AddWithValue("@Id", id);  // Asegúrate de que se pase como string

                conn.Open();
                int filas = cmd.ExecuteNonQuery();
                conn.Close();

                if (filas == 0)
                    return NotFound();  // No se encontró el estudiante

                return Ok(new { message = "Profesores eliminado correctamente." });
            }
        }


        [HttpGet("carrera/{carreraId}/semestre/{semestre}/materia/{materiaId}")]
        public IActionResult ObtenerProfesoresPorFiltros(string carreraId, int semestre, int materiaId)
        {
            List<Profesores> profesores = new List<Profesores>();
            string connectionString = _configuration.GetConnectionString("Connection");

            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                string query = @"
            SELECT p.Id, p.Nombre, p.Apellido, p.FechaNacimiento, p.Email, p.Direccion, p.Telefono
            FROM Profesores p
            INNER JOIN MateriasPorCarrera mpc ON p.Id = mpc.ProfesorId
            WHERE mpc.CarreraId = @CarreraId 
              AND mpc.Semestre = @Semestre 
              AND mpc.MateriaId = @MateriaId";

                SqlCommand cmd = new SqlCommand(query, conn);
                cmd.Parameters.AddWithValue("@CarreraId", carreraId);
                cmd.Parameters.AddWithValue("@Semestre", semestre);
                cmd.Parameters.AddWithValue("@MateriaId", materiaId);

                conn.Open();
                SqlDataReader reader = cmd.ExecuteReader();

                while (reader.Read())
                {
                    profesores.Add(new Profesores
                    {
                        Id = reader["Id"].ToString(),
                        Nombre = CapitalizeFirstLetter(reader["Nombre"].ToString()),
                        Apellido = CapitalizeFirstLetter(reader["Apellido"].ToString()),
                        FechaNacimiento = Convert.ToDateTime(reader["FechaNacimiento"]),
                        Email = reader["Email"].ToString(),
                        Direccion = CapitalizeFirstLetter(reader["Direccion"].ToString()),
                        Telefono = reader["Telefono"].ToString(),
                    });
                }

                conn.Close();
            }

            return Ok(profesores);
        }


        private static string CapitalizeFirstLetter(string input)
        {
            return string.IsNullOrEmpty(input) ? input : char.ToUpper(input[0]) + input.Substring(1).ToLower();
        }
    }
}
