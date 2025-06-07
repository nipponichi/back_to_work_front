import Swal from 'sweetalert2'

const SwalService = {
    confirm(message = '¿Estás seguro?', title = 'Confirmar acción') {
        return Swal.fire({
        title,
        text: message,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        })
    },
}

export default SwalService