let timeout_nav;
$('#subnav').hover(
    function() {
      clearTimeout(timeout_nav);
      $(this).find('.subnav-content').css("display", "block");
    },
    function() {
      timeout_nav = setTimeout(() => {
        $(this).find('.subnav-content').css("display", "none");
      }, 150);
    }
);