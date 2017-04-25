(function(){
    var app = angular.module("musicApp")
    app.constant("baseUrl", "/albums");

    app.factory("AlbumService", function($resource, baseUrl){
      return $resource(baseUrl+"/all", {}, {  query: {method: "get"},
                                              count:{method:"get", url:baseUrl+"/count"},
                                              send: {method:"post", url:baseUrl + "/add"},
                                              update: {method:"post",url:baseUrl + "/update/:id"},
                                              remove: {method:"delete",url:baseUrl+"/delete/:id"}});
    });
})();
