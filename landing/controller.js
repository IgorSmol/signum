modul.controller('landingCtl', ['$scope', '$location', '$timeout', function($scope, $location, $timeout){
  
    $scope.head_footChang('land');
  
    $scope.sliderCtl = function(direct, slider){
      switch(slider){
        case 'topSld': {
          if(direct == 'next'){
            $('#topSlider').trigger('next.owl.carousel');
          }else if(direct == 'prev'){
            $('#topSlider').trigger('prev.owl.carousel');
          }
          break;
        }
        case 'commSld': {
          if(direct == 'next'){
            $('#commentSlider').trigger('next.owl.carousel');
          }else if(direct == 'prev'){
            $('#commentSlider').trigger('prev.owl.carousel');
          }
          break;
        }
      }
    };
  
    angular.element(document).ready(function(){
        $('#topSlider').owlCarousel({
            loop: false,
            margin: 0,
            nav: false,
            dots: true,
            items: 1
        });

        $('#possibleSlider').owlCarousel({
            loop: false,
            margin: 0,
            nav: false,
            dots: true,
            items: 1
        });

        $('#commentSlider').owlCarousel({
            loop: false,
            margin: 0,
            nav: false,
            dots: false,
            items: 1
        });
    });
  
}]);