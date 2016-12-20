(function() {
  'use strict';
    angular.module('config.theme', ['ngMaterial']).config(function ($mdThemingProvider, $mdIconProvider) {

      $mdIconProvider.icon("menu", "svg/menu.svg", 24)
        .icon("share", "svg/share.svg", 24)
        .icon("add-white", "svg/add-white.svg", 24)
        .icon("done-white", "svg/done-white.svg", 24)
        .icon("account", "svg/account.svg", 36)
        .icon("arrow_back", "svg/arrow_back.svg", 24)
        .icon("arrow_forward", "svg/arrow_forward.svg", 24)
        .icon("caret_up", "svg/caret_up.svg", 24)
        .icon("caret_down", "svg/caret_down.svg", 24)
        .icon("search", "svg/search.svg", 24)
        .icon("close-light", "svg/close-light.svg", 24)
        .icon("more-vert", "svg/ic_more_vert.svg", 24)
        .icon("more_horiz_black", "svg/more_horiz_black.svg", 24)
        .icon("list", "svg/list.svg", 24)
        .icon("chart", "svg/chart.svg", 24)
        .icon("lock", "svg/lock.svg", 24)
        .icon("person", "svg/person.svg", 24)
        .icon("logout", "svg/ic_close_light.svg", 24)
        .icon("close", "svg/close.svg", 24)
        .icon("edit", "svg/edit.svg", 24)
        .icon("delete", "svg/delete.svg", 24)
        .icon("check", "svg/check.svg", 24)
        .icon("clear", "svg/clear.svg", 24)
        .icon("verified_user", "svg/verified_user.svg", 24)
        .icon("language", "svg/ic_language.svg", 24);

      $mdThemingProvider.theme('default').primaryPalette('orange')
        .accentPalette('blue');

    });


})();
