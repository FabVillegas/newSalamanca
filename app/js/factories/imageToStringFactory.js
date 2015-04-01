angular.module('Salamanca').factory('imageToStringFactory', function(){
  return{
    getElement: function(id){
      return document.getElementById(id);
    },
    readImageFile: function(){
      if ( this.files && this.files[0] ) {
        var FR = new FileReader();
        FR.onload = function(e) {
          // linea de que hacer con el resultado
          var target = document.getElementById('canvas');
          angular.element(target).css({
            'background-image': 'url(' + e.target.result + ')',
            'background-size': 'cover',
            'background-position': 'center center',
            'z-index': '3',
          });

          
        };
        FR.readAsDataURL( this.files[0] );
      }
    },
    convert: function(elementId){
      this.getElement(elementId).addEventListener("change", this.readImageFile, false);
    }
  }
});
