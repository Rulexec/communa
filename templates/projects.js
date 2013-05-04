$(function() {
    var now = Date.now();

    $('.project-card .updates li').each(function() {
        $('i:first', $(this)).each(function() {
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

    $('.seek-and-hide').each(function() {
        var div = $(this),
            a = $('a.hide-switcher', div),
            ul = $('ul.hide-content', div),
            showing = true;

        toggle();

        a.click(toggle);

        function toggle() {
            showing = !showing;

            if (showing) {
                a.text('… скрыть …');
                ul.show();
            } else {
                a.text('… показать …');
                ul.hide();
            }

            return false;
        }
    });
});
