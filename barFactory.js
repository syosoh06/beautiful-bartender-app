angular.module('app')
    .factory('barFactory', function(orderFactory) {
        
        var incBtn = [];

        return {

            getIngdrinkType: function (drinkname, ingrediants)
        {
            if(ingrediants){
                for (var i = 0; i < ingrediants.length; i++) {
                    if (ingrediants[i].drink == drinkname) {
                        return ingrediants[i].mt;
                    }
                }
            }

        }
        ,

        /**
         * This method will return index of Drink in the ingrediants Array
         * @param drinkname
         * @returns {number|*}
         */
        getIngIndex : function (drinkname, ingrediants) {
            if(ingrediants){
                for (var i = 0; i < ingrediants.length; i++) {
                    if (ingrediants[i].drink == drinkname) {
                        return i;
                    }
                }
            }

        },
        /**
         * This method will return total Drink Quantity
         * @param drinkname
         * @returns {number|*}
         */
        getIngdrinkQty: function (drinkname, ingrediants) {
            if(ingrediants){
                for (var i = 0; i < ingrediants.length; i++) {
                    if (ingrediants[i].drink == drinkname) {
                        return ingrediants[i].qty;
                    }
                }
            }

        },

            /**
             * This method will return order data for specific order Name
             * @param orderName
             * @returns {{order: string, ingrediants: {drink: string, qty: number, mt: string}[]}|*}
             */
            getOrderData: function (orderName) {
                var orderObject = orderFactory.getOrderObject();
            for (var i in orderObject) {
                if (orderObject[i].order === orderName) {
                    return orderObject[i];
                }
            }
        },

            /**
             * This method will return quantity by checking in all other orders.
             * @param drink
             * @param order
             * @returns {number}
             */
            getQtwithotherOrder: function (drink, order) {
            var quantity = 0;
                var orderObject = orderFactory.getOrderObject();
                var qty = [0, 0, 0, 0, 0, 0, 0];
            for (var i in orderObject) {
                if (orderObject[i].order != order) {
                    for (var j in orderObject[i].ingrediants) {
                        if (orderObject[i].ingrediants[j].drink === drink) {
                            quantity += (orderObject[i].ingrediants[j].qty * (qty[i] !== 0 ? qty[i] : 1));
                        }
                    }
                }
            }
            return quantity;
        },
            addOrder: function(orderObj, ingrediants, idx){
                for (var ing in orderObj.ingrediants) {
                    //console.log(ing);
                    var ingData = orderObj.ingrediants[ing];
                    var ingIndex = this.getIngIndex(ingData.drink, ingrediants);
                    if (ingData.mt !== "") {
                        var drinkType = this.getIngdrinkType(ingData.drink, ingrediants);
                        //console.log(drinkType);
                        var value, qty, existingQty;
                        if (drinkType === "ml" || drinkType === "l") {
                            if (ingData.mt === "oz") {

                                value = Math.round(ingData.qty * 29.5735);
                                existingQty = ingrediants[ingIndex].qty;

                                if (drinkType === "l") {
                                    value = value / 1000;
                                }

                                if (value > existingQty) {
                                    //incBtn[idx] = true;
                                    this.setIncBtn(true, idx);
                                    return;
                                } else {
                                    ingrediants[ingIndex].qty = Math.round((ingrediants[ingIndex].qty - value) * 1000) / 1000;
                                }
                            }
                        }
                    } else {
                        //console.log('test');

                        value = ingData.qty;

                        existingQty = (ingrediants[ingIndex].qty);
                        if (value > existingQty) {
                            //incBtn[idx] = true;
                            this.setIncBtn(true, idx);
                            return;
                        }
                        else {
                            ingrediants[ingIndex].qty = ingrediants[ingIndex].qty - value;
                            
                        }
                    }
                }
                return ingrediants;
            },
            
            setIncBtn: function(flag, i){
                incBtn[i]=flag;
            },
            
            getIncBtn: function(){
                return incBtn;
            }, 
            
            remIng: function(orderObj, idx, ingrediants , qty){

                for (var ing in orderObj.ingrediants) {
                    var ingData = orderObj.ingrediants[ing];
                    var ingIndex = this.getIngIndex(ingData.drink, ingrediants);
                    if (ingData.mt !== "") {
                        var drinkType = this.getIngdrinkType(ingData.drink, ingrediants);
                        var value;
                        if (drinkType === "ml" || drinkType === "l") {
                            if (ingData.mt === "oz") {

                                value = Math.round(ingData.qty * 29.5735);
                                var existingQty = ingrediants[ingIndex].qty;

                                if (drinkType === "l") {
                                    value = value / 1000;
                                }

                                if (qty[idx] > 0) {
                                    ingrediants[ingIndex].qty = Math.round((ingrediants[ingIndex].qty + value) * 1000) / 1000;
                                }
                            }
                        }
                    } else {
                        value = ingData.qty;
                        existingQty = ingrediants[ingIndex].qty;
                        if (qty[idx] > 0) {
                            ingrediants[ingIndex].qty = ingrediants[ingIndex].qty + value;
                        }
                    }
                }
                return ingrediants;
            },

        getCountofOrderObject: function (qty) {
            var count = 0;
            for (var i in qty) {
                count += qty[i];
            }
            return count;
        }




    }

});