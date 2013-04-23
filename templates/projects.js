$(function() {
    var now = Date.now();

    $('.project-card .updates li i:first').each(function() {
        var i = $(this);
        var updateDate = new Date(i.text()).getTime();

        var days = (now - updateDate) / 1000 / 60 / 60 / 24;
        if (days <= 2) {
            i.css('color', 'green');
        } else if (days <= 7) {
            i.css('color', 'rgb(202, 131, 0)');
        }
    });
});
