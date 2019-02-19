$(document).ready(function() {
  // Crear tabla Tec21
  var tabla_tec21 = $("#tabla_oferta_tec21").DataTable({
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
  var tabla_transversales = $("#tabla_oferta_transversales").DataTable({
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
  var tabla_pdp = $("#tabla_oferta_pdp").DataTable({
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
      // Si this.gsx$programa.$t == 'TEC 21'
      if (this.gsx$programa.$t == 'TEC 21') {
        // Agregar a la tabla tabla_tec21
        add_a_Row(this, tabla_tec21);
      }
      // Si this.gsx$programa.$t == 'PDP'
      else if (this.gsx$programa.$t == 'PDP') {
        // Agregar a la tabla tabla_pdp
        tabla_pdp.row.add([
          this.gsx$campussede.$t,
          this.gsx$salón.$t,
          this.gsx$nombre.$t,
          this.gsx$modalidad.$t,
          this.gsx$fechas.$t,
          this.gsx$horario.$t,
          this.gsx$grupo.$t,
          this.gsx$nivel.$t,
          this.gsx$inscripción.$t,
          this.gsx$subprograma.$t,
          this.gsx$horasacreditables.$t
        ]).draw();
      }
      // Si this.gsx$programa.$t == 'Transversales'
      else if (this.gsx$programa.$t == 'Transversales') {
        // Agregar a la tabla tabla_transversales
        tabla_transversales.row.add([
          this.gsx$campussede.$t,
          this.gsx$salón.$t,
          this.gsx$nombre.$t,
          this.gsx$modalidad.$t,
          this.gsx$fechas.$t,
          this.gsx$horario.$t,
          this.gsx$grupo.$t,
          this.gsx$nivel.$t,
          this.gsx$inscripción.$t,
          this.gsx$subprograma.$t,
          this.gsx$horasacreditables.$t
        ]).draw();
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

function add_a_Row(objeto, tabla_a_actualizar){
  tabla_a_actualizar.row.add([
    objeto.gsx$campussede.$t,
    objeto.gsx$salón.$t,
    objeto.gsx$nombre.$t,
    objeto.gsx$modalidad.$t,
    objeto.gsx$fechas.$t,
    objeto.gsx$horario.$t,
    objeto.gsx$grupo.$t,
    objeto.gsx$nivel.$t,
    objeto.gsx$inscripción.$t,
    objeto.gsx$subprograma.$t,
    objeto.gsx$horasacreditables.$t
  ]).draw();
  return;
}
