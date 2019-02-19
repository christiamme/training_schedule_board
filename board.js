$(document).ready(function() {
  // Crear tabla Tec21
  tabla_tec21 = $("#tabla_oferta_tec21").DataTable({
    responsive: true,
    columnDefs: [
      { responsivePriority: 1, targets: [0, 2, 4, 7] },
      { responsivePriority: 2, targets: [3, 5, 8] },
      { responsivePriority: 2, targets: [1, 6, 9, 10] },
      { targets: -1, className: 'center-cell' }
    ],
    language: {
      decimal: "",
      emptyTable: "Sin información disponible",
      info: "Mostrando registros _START_ a _END_ de _TOTAL_",
      infoEmpty: "Mostrando 0 registros de 0 disponibles",
      infoFiltered: "(filtrado de _MAX_ registros totales)",
      infoPostFix: "",
      thousands: ",",
      lengthMenu: "Mostrar _MENU_ registros",
      loadingRecords: "Cargando...",
      processing: "Procesando...",
      search: "Buscar:",
      zeroRecords: "Ningún registro encontrado",
      paginate: {
        first: "Primero",
        last: "Último",
        next: "Siguiente",
        previous: "Previo"
      },
      aria: {
        sortAscending: ": activar para ordenar ascendente",
        sortDescending: ": activar para ordenar descendente"
      }
    }
  });

  // Crear tabla Transversales
  tabla_transversales = $("#tabla_oferta_transversales").DataTable({
    responsive: true,
    columnDefs: [
      { responsivePriority: 1, targets: [0, 2, 4, 7] },
      { responsivePriority: 2, targets: [3, 5, 8] },
      { responsivePriority: 2, targets: [1, 6, 9, 10] }
    ],
    language: {
      decimal: "",
      emptyTable: "Sin información disponible",
      info: "Mostrando registros _START_ a _END_ de _TOTAL_",
      infoEmpty: "Mostrando 0 registros de 0 disponibles",
      infoFiltered: "(filtrado de _MAX_ registros totales)",
      infoPostFix: "",
      thousands: ",",
      lengthMenu: "Mostrar _MENU_ registros",
      loadingRecords: "Cargando...",
      processing: "Procesando...",
      search: "Buscar:",
      zeroRecords: "Ningún registro encontrado",
      paginate: {
        first: "Primero",
        last: "Último",
        next: "Siguiente",
        previous: "Previo"
      },
      aria: {
        sortAscending: ": activar para ordenar ascendente",
        sortDescending: ": activar para ordenar descendente"
      }
    }
  });

  // Crear tabla PDP
  tabla_pdp = $("#tabla_oferta_pdp").DataTable({
    responsive: true,
    columnDefs: [
      { responsivePriority: 1, targets: [0, 2, 4, 7] },
      { responsivePriority: 2, targets: [3, 5, 8] },
      { responsivePriority: 2, targets: [1, 6, 9, 10] }
    ],
    language: {
      decimal: "",
      emptyTable: "Sin información disponible",
      info: "Mostrando registros _START_ a _END_ de _TOTAL_",
      infoEmpty: "Mostrando 0 registros de 0 disponibles",
      infoFiltered: "(filtrado de _MAX_ registros totales)",
      infoPostFix: "",
      thousands: ",",
      lengthMenu: "Mostrar _MENU_ registros",
      loadingRecords: "Cargando...",
      processing: "Procesando...",
      search: "Buscar:",
      zeroRecords: "Ningún registro encontrado",
      paginate: {
        first: "Primero",
        last: "Último",
        next: "Siguiente",
        previous: "Previo"
      },
      aria: {
        sortAscending: ": activar para ordenar ascendente",
        sortDescending: ": activar para ordenar descendente"
      }
    }
  });

  // Poblar tablas con los datos

  var url =
    "https://spreadsheets.google.com/feeds/list/1gcN__1YV5d1INhFDPZBkbNYMB-rbBjSdcd4oRBjMpdA/3/public/values?alt=json";

  $.getJSON(url, function(data) {
    var entry = data.feed.entry;
    $(entry).each(function() {
      // Determinar nombre del campus
      switch (this.gsx$campussede.$t) {
        case 'AGS':
          campus = 'AGS <small>Aguascalientes</small>';
          break;
        case 'COB':
          campus = 'COB <small>Ciudad Obregón</small>';
          break;
        case 'GDA':
          campus = 'GDA <small>Guadalajara</small>';
          break;
        case 'SIN':
          campus = 'SIN <small>Sinaloa</small>';
          break;
        case 'SON':
          campus = 'SON <small>Sonora</small>';
          break;
        case 'ZAC':
          campus = 'ZAC <small>Zacatecas</small>';
          break;
        default:
          campus = 'Nacional';
      }

      // Si this.gsx$programa.$t == 'TEC 21'
      if (this.gsx$programa.$t == 'TEC 21') {
        // Agregar a la tabla tabla_tec21
        add_a_Row(this, tabla_tec21, campus);
      }
      // Si this.gsx$programa.$t == 'PDP'
      if (this.gsx$programa.$t == 'PDP') {
        // Agregar a la tabla tabla_pdp
        add_a_Row(this, tabla_pdp, campus);
      }
      // Si this.gsx$programa.$t == 'Transversales'
      if (this.gsx$programa.$t == 'Transversales') {
        // Agregar a la tabla tabla_transversales
        add_a_Row(this, tabla_transversales, campus);
      }
    });
  });

  var acc = document.getElementsByClassName("accordion");
  var i;

  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
      this.classList.toggle("active");
      var panel = this.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  }
});

function add_a_Row(objeto, tabla_a_actualizar, campus){
  tabla_a_actualizar.row.add([
    campus,
    objeto.gsx$salón.$t,
    objeto.gsx$nombre.$t,
    objeto.gsx$modalidad.$t,
    objeto.gsx$fechas.$t,
    objeto.gsx$horario.$t,
    objeto.gsx$grupo.$t,
    objeto.gsx$nivel.$t,
    objeto.gsx$inscripción.$t,
    objeto.gsx$programa.$t+': '+objeto.gsx$subprograma.$t,
    objeto.gsx$horasacreditables.$t
  ]).draw();
  return;
}

function updateInputs(text_input){
  var camp = ["AGS", "COB", "GDA", "SIN", "SON", "ZAC"];
  // for each document.getElementsByTagName("input")
  var tablas = [tabla_pdp, tabla_transversales, tabla_tec21];
  var inputs = document.getElementsByTagName("input");
  for (i = 0; i < inputs.length; i++) {
    // get input's current text
    current = inputs[i].value;
    if (camp.includes(current.substring(0,3))) {
      current = current.substring(3);
    }
    // write back current text + text_input
    new_text = text_input + " " + current;
    inputs[i].value = new_text;
    tablas[i].search(new_text).draw();
  }
}

function updateTec21(text_input){
  input_tec21 = document.getElementsByTagName("input")[2];
  var cat = ["Actualizado en la Docencia", "Innovación", "Inspirador", "Semana i", "Semestre i", "Uso de Tecnología", "Vinculado"]
  // get input's current text
  current = input_tec21.value;
  // replace category names
  for (i = 0; i < cat.length; i++) {
    // replace input's current text
    current = current.replace(cat[i],"");
  }
  // write back current text + text_input
  new_text = current + " " + text_input;
  input_tec21.value = new_text;
  tabla_tec21.search(new_text).draw();
}
