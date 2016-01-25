(function() {
'use strict';

angular.module('fluReporter.detail').service('searchVolumeHandler', searchVolumeHandler);

// Service.$inject = ['dependencies'];

/* @ngInject */
function searchVolumeHandler() {
    /*jshint validthis: true */
    this.convertProgressbarVolume = convertProgressbarVolume;
    this.verifySearchVolume = verifySearchVolume;
    this.setNumberColor = setNumberColor;
    this.formatNumber = formatNumber;

    ////////////////

    function convertProgressbarVolume(volume) {
        var convertedVolume;
        if(volume>95){
            convertedVolume = 95;

        }else if(volume<7){
            convertedVolume = 7;
        }else{
            convertedVolume = volume;
        }
        return convertedVolume;
    }

    function verifySearchVolume(volume){
        if(volume<100){
            return true;
        }else{
            return false;
        }
    }

    function setNumberColor(volume){
        if(volume<20){
            return "flu-dark-green";
        }else if(volume>20 && volume<40){
            return "flu-light-green";
        }else if(volume>40 && volume<60){
            return "flu-yellow";
        }else if(volume>60 && volume<80){
            return "flu-orange";
        }else{
            return "flu-red";
        }
    }

    function formatNumber(volume){
        var firstNumber, secondNumber, returnString;

        firstNumber = parseInt(volume/10);
        secondNumber = volume%10;

        returnString = firstNumber + '<span>' + secondNumber + '</span>';
        // console.log(returnString);
        return returnString;
    }

    function turnSearchVolume(){

    }
}
})();