modul.directive('emailValid', function() {
  var pattern = new RegExp(/[0-9a-z_]+@[0-9a-z_]+\.[a-z]{2,5}/i);
  return {
    require: 'ngModel',
    link: function(scope, element, attr, mCtrl) {
      function emailValidation(value) {
        if (pattern.test(value)) {
          mCtrl.$setValidity('charE', true);
        } else {
          mCtrl.$setValidity('charE', false);
        }
        return value;
      }
      mCtrl.$parsers.push(emailValidation);
    }
  };
})
.directive('textValid', function() {
  var pattern = new RegExp("^[a-zA-Z]+$");
  return {
    require: 'ngModel',
    link: function(scope, element, attr, mCtrl) {
      function textValidation(value) {
        if (pattern.test(value)) {
          mCtrl.$setValidity('charE', true);
        } else {
          mCtrl.$setValidity('charE', false);
        }
        return value;
      }
      mCtrl.$parsers.push(textValidation);
    }
  };
})
.directive('phoneValid', function() {
  var pattern = new RegExp("^[0-9]+$");
  return {
    require: 'ngModel',
    link: function(scope, element, attr, mCtrl) {
      function phoneValidation(value) {
        if (pattern.test(value) && value.length >= 10 && value.length <= 12) {
          mCtrl.$setValidity('charE', true);
        } else {
          mCtrl.$setValidity('charE', false);
        }
        return value;
      }
      mCtrl.$parsers.push(phoneValidation);
    }
  };
})
.directive('scroll', function ($window) {
    return function(scope, element, attrs) {
        angular.element($window).bind("scroll", function() {
            if (this.pageYOffset > 0) {
                 scope.fix = true;
             } else {
                 scope.fix = false;
             }
            scope.$apply();
        });
    };
})
.directive('scrollOnClick', function() {
  return {
    restrict: 'A',
    link: function(scope, $elm, attrs) {
      var head_h = $('header').innerHeight();
      var idToScroll = attrs.block;
      $elm.on('click', function() {
        var $target;
        if (idToScroll) {
          $target = $(idToScroll);
        } else {
          $target = $elm;
        }
        $("body").animate({scrollTop: $target.offset().top - head_h}, 1000);
        if($('.mob-menu-wrap-land').css('display') != 'none'){
          $('.mob-menu-wrap-land').slideUp();
        }
      });
    }
  }
})
.directive("fileInput", function($parse){
  return{
    restrict:'A',
    link:function(scope,elem,attrs){
      elem.bind('change',function(){
        $parse(attrs.fileInput).assign(scope,elem[0].files);
        scope.$apply();
      });
    }
  }
})
.directive("fileread", [
  function() {
    return {
      scope: {
        fileread: "="
      },
      link: function(scope, element, attributes) {
        element.bind("change", function(changeEvent) {
          var reader = new FileReader();
          reader.onload = function(loadEvent) {
            scope.$apply(function() {
              scope.fileread = loadEvent.target.result;
            });
          }
          reader.readAsDataURL(changeEvent.target.files[0]);
        });
      }
    }
  }
]);