// Code goes here
// Code goes here

// Code goes here

var app = angular.module('app', []);
app.controller("testCont", function ($scope) {
    $scope.qty = [0, 0, 0, 0, 0, 0, 0];
    $scope.incBtn = [];
    $scope.decBtn = [];
    $scope.placeOrder = true;
    $scope.addIngr = false;
    /**
     * This is an Ingrediants Array
     * @type {{drink: string, qty: number, mt: string}[]}
     */
    $scope.ingrediants = [{
        drink: "vodka",
        qty: 750,
        mt: "ml"
    }, {
        drink: "Sweet vermouth",
        qty: 750,
        mt: "ml"
    }, {
        drink: "agave nectar",
        qty: 750,
        mt: "ml"
    }, {
        drink: "cherries",
        qty: 9,
        mt: ""
    }, {
        drink: "gin",
        qty: 1.5,
        mt: "l"
    }, {
        drink: "dry vermouth",
        qty: 750,
        mt: "ml"
    }, {
        drink: "orange juice",
        qty: 1420,
        mt: "ml"
    }, {
        drink: "clevery stalks",
        qty: 16,
        mt: ""
    }, {
        drink: "tequila",
        qty: 750,
        mt: "ml"
    }, {
        drink: "bloody mary mix",
        qty: 2,
        mt: "l"
    }, {
        drink: "limes",
        qty: 36,
        mt: ""
    }, {
        drink: "olives",
        qty: 24,
        mt: ""
    }, {
        drink: "whiskey",
        qty: 750,
        mt: "ml"
    }];
    /**
     * This is an order Object
     * @type {{order: string, ingrediants: {drink: string, qty: number, mt: string}[]}[]}
     */
    $scope.orderObject = [{
        order: "bloody mary",
        ingrediants: [{
            drink: "vodka",
            qty: 2,
            mt: "oz"
        }, {
            drink: "bloody mary mix",
            qty: 4,
            mt: "oz"
        }, {
            drink: "clevery stalks",
            qty: 1,
            mt: ""
        }]
    }, {
        order: "Martini",
        ingrediants: [{
            drink: "gin",
            qty: 2,
            mt: "oz"
        }, {
            drink: "dry vermouth",
            qty: 1,
            mt: "oz"
        }, {
            drink: "olives",
            qty: 1,
            mt: ""
        }]
    }, {
        order: "Margarita",
        ingrediants: [{
            drink: "tequila",
            qty: 2,
            mt: "oz"
        }, {
            drink: "orange juice",
            qty: 1,
            mt: "oz"
        }, {
            drink: "agave nectar",
            qty: 1,
            mt: "oz"
        }, {
            drink: "limes",
            qty: 1,
            mt: ""
        }]
    }, {
        order: "Screwdriver",
        ingrediants: [{
            drink: "vodka",
            qty: 2,
            mt: "oz"
        }, {
            drink: "orange juice",
            qty: 4,
            mt: "oz"
        }]
    }, {
        order: "Manhattan",
        ingrediants: [{
            drink: "whiskey",
            qty: 2,
            mt: "oz"
        }, {
            drink: "Sweet vermouth",
            qty: 1,
            mt: "oz"
        }, {
            drink: "cherries",
            qty: 1,
            mt: ""
        }]
    }];
    /**
     * This method will return type of Drink
     * @param drinkname
     * @returns {string|*}
     */
    $scope.getIngdrinkType = function (drinkname) {
        for (var i = 0; i < $scope.ingrediants.length; i++) {
            if ($scope.ingrediants[i].drink == drinkname) {
                return $scope.ingrediants[i].mt;
            }
        }
    };

    /**
     * This method will return index of Drink in the ingrediants Array
     * @param drinkname
     * @returns {number|*}
     */
    $scope.getIngIndex = function (drinkname) {
        for (var i = 0; i < $scope.ingrediants.length; i++) {
            if ($scope.ingrediants[i].drink == drinkname) {
                return i;
            }
        }
    };

    /**
     * This method will return total Drink Quantity
     * @param drinkname
     * @returns {number|*}
     */
    $scope.getIngdrinkQty = function (drinkname) {
        for (var i = 0; i < $scope.ingrediants.length; i++) {
            if ($scope.ingrediants[i].drink == drinkname) {
                return $scope.ingrediants[i].qty;
            }
        }
    };
    /**
     * This method will return order data for specific order Name
     * @param orderName
     * @returns {{order: string, ingrediants: {drink: string, qty: number, mt: string}[]}|*}
     */
    $scope.getOrderData = function (orderName) {
        for (var i in $scope.orderObject) {
            if ($scope.orderObject[i].order === orderName) {
                return $scope.orderObject[i];
            }
        }
    };
    /**
     * This method will return quantity by checking in all other orders.
     * @param drink
     * @param order
     * @returns {number}
     */
    $scope.getQtwithotherOrder = function (drink, order) {
        var quantity = 0;
        for (var i in $scope.orderObject) {
            if ($scope.orderObject[i].order != order) {
                for (var j in $scope.orderObject[i].ingrediants) {
                    if ($scope.orderObject[i].ingrediants[j].drink === drink) {
                        quantity += ($scope.orderObject[i].ingrediants[j].qty * ($scope.qty[i] !== 0 ? $scope.qty[i] : 1));
                    }
                }
            }
        }
        return quantity;
    };
    /**
     * This method will increase the order count
     * it will check the quantity of ingrediants in all other orders
     * @param order
     * @param idx
     */
    $scope.addOrder = function (order, idx) {

        var qt = 0;
        var orderObj = $scope.getOrderData(order);
        console.log(orderObj);
        for (var ing in orderObj.ingrediants) {
            //console.log(ing);
            var ingData = orderObj.ingrediants[ing];
            var ingIndex = $scope.getIngIndex(ingData.drink);
            if (ingData.mt !== "") {
                var drinkType = $scope.getIngdrinkType(ingData.drink);
                //console.log(drinkType);
                var value, qty, existingQty;
                if (drinkType === "ml" || drinkType === "l") {
                    if (ingData.mt === "oz") {

                        value = Math.round(ingData.qty * 29.5735);
                        existingQty = $scope.ingrediants[ingIndex].qty;

                        if (drinkType === "l") {
                            value = value / 1000;
                        }

                        if (value > existingQty) {
                            $scope.incBtn[idx] = true;
                            return;
                        } else {
                            $scope.ingrediants[ingIndex].qty = Math.round(($scope.ingrediants[ingIndex].qty - value) * 1000) / 1000;
                        }
                    }
                }
            } else {
                //console.log('test');

                value = ingData.qty;

                existingQty = ($scope.ingrediants[ingIndex].qty);
                if (value > existingQty) {
                    $scope.incBtn[idx] = true;
                    return;
                }
                else {
                    $scope.ingrediants[ingIndex].qty = $scope.ingrediants[ingIndex].qty - value;
                    //console.log($scope.ingrediants[ingIndex]);
                    //console.log($scope.ingrediants[ingIndex].qty);
                }
            }
        }
        $scope.qty[idx] += 1;
        $scope.decBtn[idx] = false;
    };
    /**
     * This method will decrease the order count.
     * @param order
     * @param idx
     */
    $scope.remIng = function (order, idx) {
        var qt = 0;
        var orderObj = $scope.getOrderData(order);
        for (var ing in orderObj.ingrediants) {
            var ingData = orderObj.ingrediants[ing];
            var ingIndex = $scope.getIngIndex(ingData.drink);
            if (ingData.mt !== "") {
                var drinkType = $scope.getIngdrinkType(ingData.drink);
                var value, qty;
                if (drinkType === "ml" || drinkType === "l") {
                    if (ingData.mt === "oz") {
                        //convert oz to ml and check with main qty.
                        /*var qtyOtherOrder = $scope.getQtwithotherOrder(ingData.drink, order);
                         value = Math.round(((ingData.qty * ($scope.qty[idx] - 1)) + qtyOtherOrder) * 29.5735);
                         if (drinkType === "l") {
                         qty = $scope.getIngdrinkQty(ingData.drink) * 1000;
                         } else {
                         qty = $scope.getIngdrinkQty(ingData.drink);
                         }*/
                        value = Math.round(ingData.qty * 29.5735);
                        existingQty = $scope.ingrediants[ingIndex].qty;

                        if (drinkType === "l") {
                            value = value / 1000;
                        }

                        if ($scope.qty[idx] > 0) {
                            $scope.ingrediants[ingIndex].qty = Math.round(($scope.ingrediants[ingIndex].qty + value) * 1000) / 1000;
                        }
                    }
                }
            } else {
                value = ingData.qty;
                existingQty = $scope.ingrediants[ingIndex].qty;
                if ($scope.qty[idx] > 0) {
                    $scope.ingrediants[ingIndex].qty = $scope.ingrediants[ingIndex].qty + value;
                }
            }
        }
        if ($scope.qty[idx] > 0)
            $scope.qty[idx] -= 1;
        else
            $scope.decBtn[idx] = true;
        $scope.incBtn[idx] = false;
    };
    /**
     * This method used to toggle panel
     */
    $scope.placeOrderHandler = function () {
        $scope.placeOrder = false;
        $scope.addIngr = true;
    };
    /**
     * This method will return count of orders for each specific.
     * @returns {number}
     */
    $scope.getCountofOrderObject = function () {
        var count = 0;
        for (var i in $scope.qty) {
            count += $scope.qty[i];
        }
        return count;
    };
});
