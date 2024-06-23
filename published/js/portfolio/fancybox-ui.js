 // Template for custom "info" button
 $.fancybox.defaults.btnTpl.info = '<button data-fancybox-info class="fancybox-button fancybox-button--info" title="Show caption">Info</button>';

 // Initialise fancybox with custom settings
 $('[data-fancybox="images"]').fancybox({
   preventCaptionOverlap : false,
   infobar: false,
 
   // Disable idle
   idleTime : 0,
 
   // Display only these two buttons
   buttons : [
     'info','zoom', 'thumbs', 'close'
   ],

 // Custom caption content
 caption : function( instance, obj ) {
   return '<div><div class="fancy-nav"><a data-fancybox-prev title="Previous" tabindex="1" class="back-button">&lsaquo;</a> <a data-fancybox-next title="Next" tabindex="2" class="next-button">&rsaquo;</a></div>' + $(this).find('.caption').html() + '</div>';
 },

 onInit: function(instance) {
   // Toggle caption on tap
   instance.$refs.container.on('touchstart', '[data-fancybox-info]', function(e) {
     e.stopPropagation();
     e.preventDefault();
 
     instance.$refs.container.toggleClass('fancybox-vertical-caption');
   });
   // Display caption when 'info' is clicked
   instance.$refs.container.on('click', '[data-fancybox-info]', function(e) {
     instance.$refs.container.toggleClass('fancybox-vertical-caption');
   });

 }

});