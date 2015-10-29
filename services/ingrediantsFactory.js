angular.module('app')
    .factory('ingrediantsFactory', function() {

        /**
         * This is an Ingrediants Array
         * @type {{drink: string, qty: number, mt: string}[]}
         */
        var ingrediants = [{
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

        return {
            getIngrediants: function(){
                return ingrediants;
            }

        };



    });