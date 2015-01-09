angular.module('app')
.controller("ProductsCtrl", ['$scope','$firebase','Products','ProductCategory',function($scope,$firebase,Products,ProductCategory) {
 
 $scope.products = Products.get($scope); //returns all products as object
 $scope.productsArr = Products.getArray($scope); //returns all products as array
 $scope.prodCatList = ProductCategory.get(); //used to populate select boxes
 
$scope.modelObj = {}; //initializes

$scope.switchProduct = function(id){ // called on click which passes product id
    $scope.productToUpdate = id; //triggers $watch to run 
};
$scope.unbindProduct= function(){}; //initializes

$scope.productToUpdate = "-JcCM9bN1m4OVZ5VF68R"; //initializes
 
 $scope.addProduct = function(newProduct){ // addProducts view adds product record to products
 Products.save(newProduct);
  };
 $scope.removeProduct = function(){
     var id = $scope.productToUpdate; //called on buttonClick - productToUpdate is already bound to proper object
     $scope.unbindProduct(); // unbind the reference from scope
     Products.remove(id); // remove product record from products
    $scope.productToUpdate = $scope.lastProductUpdate; // sets product to update to last updated id set by "oldvalue" in $watch
    
 };
 
 $scope.getRecord = function(){                                       //called from $watch scope prodcutToUpdate
    var id = $scope.productToUpdate;                                  //passes scope.productToUpdate to var id
    var record =  Products.update($scope,id);                         //gets record from products based on id
    record.$loaded().then(function(data){                            //looks for callback loaded okay
            data.$bindTo($scope,'modelObj').then(function(unbind){    //bind to scope and recieve firebase unbind function
            $scope.unbindProduct = unbind;                            //binds $scope unbind to the firebase unbind for disassociation in future
         });
     });
     };

 
  $scope.$watch('productToUpdate', function(newvalue,oldvalue) { //watches for changes to producttoUpdate
            $scope.lastProductUpdated = oldvalue; // sets globe fallback to last id if product deleted
            $scope.productToUpdate = newvalue; // sets productToUpdate to newValue in case
            $scope.unbindProduct(); // runs unbind function set by getRecord and unbinds the old reference from modelObject
            $scope.getRecord(); // calls new getRecord
            });      

}]);
