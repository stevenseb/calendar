document.addEventListener('DOMContentLoaded', function() {
    let currentAppointmentId = null;

    function showModal(event, id, title, startDate, startTime, endDate, endTime, description) {
        event.stopPropagation();
        currentAppointmentId = id;
        document.getElementById('modal-title').textContent = title;
        document.getElementById('modal-start-time').textContent = startDate + ' ' + startTime;
        document.getElementById('modal-end-time').textContent = endDate + ' ' + endTime;
        document.getElementById('modal-description').textContent = description;
        document.getElementById('myModal').style.display = 'block';
    }

    function closeModal() {
        document.getElementById('myModal').style.display = 'none';
    }

    function showFormModal(year, month, day, hour) {
        currentAppointmentId = null; // Reset current appointment id
        var form = document.getElementById('appointmentForm');
        form.action = "/add_appointment?year=" + year + "&month=" + month + "&day=" + day + "&hour=" + hour;

        // Set the start date and time
        document.getElementById('start_date').value = year + '-' + String(month).padStart(2, '0') + '-' + String(day).padStart(2, '0');
        document.getElementById('start_time').value = String(hour).padStart(2, '0') + ':00';

        // Calculate the end time
        var endHour = (parseInt(hour) + 1) % 24;
        var endDay = day;
        if (hour == 23) {
            // Adjust the end day if the hour is 23 (11 PM)
            var date = new Date(year, month - 1, day);
            date.setDate(date.getDate() + 1);
            endDay = date.getDate();
            month = date.getMonth() + 1; // getMonth() is zero-based
            year = date.getFullYear();
        }

        // Set the end date and time
        document.getElementById('end_date').value = year + '-' + String(month).padStart(2, '0') + '-' + String(endDay).padStart(2, '0');
        document.getElementById('end_time').value = String(endHour).padStart(2, '0') + ':00';

        document.getElementById('formModal').style.display = 'block';
    }

    function closeFormModal() {
        document.getElementById('formModal').style.display = 'none';
    }

    function editAppointment() {
        closeModal();
        var form = document.getElementById('appointmentForm');
        form.action = "/edit_appointment?id=" + currentAppointmentId;

        // Set the form fields with existing appointment details
        document.getElementById('form_name').value = document.getElementById('modal-title').textContent;
        var startDateTime = document.getElementById('modal-start-time').textContent.split(' ');
        document.getElementById('start_date').value = startDateTime[0];
        document.getElementById('start_time').value = startDateTime[1];
        var endDateTime = document.getElementById('modal-end-time').textContent.split(' ');
        document.getElementById('end_date').value = endDateTime[0];
        document.getElementById('end_time').value = endDateTime[1];
        document.getElementById('form_description').value = document.getElementById('modal-description').textContent;
        document.getElementById('form_private').checked = false; // Adjust this based on your data

        document.getElementById('formModal').style.display = 'block';
    }

    function deleteAppointment() {
        if (confirm('Are you sure you want to delete this appointment?')) {
            window.location.href = "/delete_appointment?id=" + currentAppointmentId;
        }
    }

    window.onclick = function(event) {
        if (event.target == document.getElementById('myModal')) {
            closeModal();
        }
        if (event.target == document.getElementById('formModal')) {
            closeFormModal();
        }
    }

    window.showModal = showModal;
    window.closeModal = closeModal;
    window.showFormModal = showFormModal;
    window.closeFormModal = closeFormModal;
    window.editAppointment = editAppointment;
    window.deleteAppointment = deleteAppointment;
});
