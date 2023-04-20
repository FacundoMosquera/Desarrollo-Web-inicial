document.addEventListener('DOMContentLoaded', function() {
    $('#formularioContacto').validate({
        rules: {
            nombre: 'required',
            email: {
                required: true,
                email: true
            },
            mensaje: 'required'
        },
        messages: {
            nombre: 'Por favor ingrese su nombre',
            email: {
                required: 'Por favor ingrese una dirección de correo electrónico',
                email: 'La dirección de correo electrónico ingresada no es válida'
            },
            mensaje: 'Por favor ingrese un mensaje'
        },
        submitHandler: function(form) {
            var nombre = $('#nombre').val();
            var email = $('#email').val();
            var mensaje = $('#mensaje').val();

            $.ajax({
                url: 'https://reqres.in/api/users',
                method: 'POST',
                data: {
                    nombre: nombre,
                    email: email,
                    mensaje: mensaje,
                },
                success: function(response) {
                    console.log('Éxito', response);
                    alert('¡Su mensaje fue enviado con éxito!');
                },
                error: function(xhr, status, error) {
                    console.error('Error', error);
                    alert('Ocurrió un error al enviar el mensaje. Por favor inténtelo nuevamente');
                }
            });
        }
    });

    $('#formularioDeProceso').validate({
        rules: {
            nombreProceso: 'required',
            apellidoProceso: 'required',
            meses: 'required',
            mailProceso: {
                required: true,
                email: true
            },
        },
        messages: {
            nombreProceso: 'Por favor ingrese su nombre',
            apellidoProceso: 'Por favor ingrese su apellido',
            meses: 'Por favor ingrese la duración de la membresía',
            mail: {
                required: 'Por favor ingrese la dirección de correo electrónico',
                email: 'La dirección de correo electrónico no es válida'
            },
        },
        submitHandler: function(form) {
            var nombre = document.getElementById('nombreProceso').value;
            var precio = 4700;
            var apellido = document.getElementById('apellidoProceso').value;
            var mes = document.getElementById('meses').value;
            var mail = document.getElementById('mailProceso').value;

            //Calculo
            var subtotal = precio * mes;
            var impuesto = subtotal * 0.75;
            var total = subtotal + impuesto;


            //resumen
            var cotizacion = 'Cotización: \n\n\n' +
            'Nombre: ' + nombre + ' ' + apellido + '\n' +
            'Precio por mes: $' + precio + '\n' +
            'Meses solicitados: ' + mes + '\n' +
            'Subtotal: $' + subtotal + '\n' +
            'Impuestos (%75): $' + impuesto + '\n' +
            'Total: $' + total;
            
            alert(cotizacion);

            var pdf = new jsPDF();
            pdf.text(cotizacion, 10, 10);
            var pdfBlob =pdf.output('blob');

            var downloadLink = document.createElement('a');
            downloadLink.href = URL.createObjectURL(pdfBlob);
            downloadLink.download = 'resumen_membresia.pdf';
            downloadLink.click();

            URL.revokeObjectURL(pdfBlob);

        }
    });
    
});