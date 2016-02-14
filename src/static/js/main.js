$(document).ready(function () {

    var deleteProject = function (id) {
        $.ajax({
            url: '/manager',
            type: 'DELETE',
            data: {
                id: id
            },
            success: function (doc) {
                location.reload();
            }
        });
    };

    $('.delete-project').on('click', function () {
        var confirm = window.confirm('Are you sure you want to delete this project?');

        if (confirm) {
            deleteProject($(this).data('id'));
        }
    });
});