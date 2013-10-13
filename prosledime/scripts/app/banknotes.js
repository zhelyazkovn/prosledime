var app = app || {};

(function(a) {
    var viewModel = kendo.observable({
        banknotes:[],
         getTopTen: getTopTen,
        getAll: getAll
    });
    
    function init(e) {
        kendo.bind(e.view.element, viewModel);
        
        httpRequest.getJSON("http://localhost:8875/api/banknotes")
        //httpRequest.getJSON( app.servicesBaseUrl + "categories")
        .then(function (banknotes) {
            viewModel.set("banknotes", banknotes);            
        });        
    }
    
    function getTopTen() {
        //httpRequest.getJSON(app.servicesBaseUrl  + "banknotes")
        httpRequest.getJSON("http://localhost:8875/api/banknotes/10")
        .then(function(banknotes) {
            viewModel.set("banknotes", banknotes); 
            console.log(banknotes);
             $("#custom-banknote-listview").html("");
             $("#custom-banknote-listview").kendoMobileListView({
                dataSource: banknotes,
                template: $("#banknote-list-template").html()
            });
        });
    }
    
    function getAll() {
       //httpRequest.getJSON(app.servicesBaseUrl  + "banknotes")
         httpRequest.getJSON("http://localhost:8875/api/banknotes")
        .then(function(banknotes) {
            viewModel.set("banknotes", banknotes); 
            console.log(banknotes);
             $("#custom-banknote-listview").html("");
             $("#custom-banknote-listview").kendoMobileListView({
                dataSource: banknotes,
                template: $("#banknote-list-template").html()
            });
        });
    }
    
    a.banknotes = {
        init:init          
    };
}(app));