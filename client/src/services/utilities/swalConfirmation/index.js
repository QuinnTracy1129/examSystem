import Swal from "sweetalert2";

const swalConfirmation = (text = "This action is irreversible.") =>
  Swal.fire({
    title: "Are you sure?",
    text,
    icon: "question",
    confirmButtonText: "Proceed",
    showCancelButton: true,
  }).then(res => {
    if (res.isConfirmed) return true;

    return false;
  });

export default swalConfirmation;
