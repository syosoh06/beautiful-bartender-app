angular.module('app')
    .factory('orderFactory', function(){


        /**
         * This is an order Object
         * @type {{order: string, ingrediants: {drink: string, qty: number, mt: string}[]}[]}
         */
        var orderObject = [{
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

        return {
            getOrderObject: function(){
                return orderObject;
            }
        }

    });