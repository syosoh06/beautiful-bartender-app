angular.module('app')
    .controller('barController', function( ingrediantsFactory, orderFactory, barFactory) {

        var vm=this;

        function activate(){
            vm.ingrediants = ingrediantsFactory.getIngrediants();
            vm.orderObject = orderFactory.getOrderObject();
            vm.qty = [0, 0, 0, 0, 0, 0, 0];
            vm.incBtn = [];
            vm.decBtn = [];
            vm.placeOrder = true;
            vm.addIngr = false;
        }

        activate();


        /**
         * This method will increase the order count
         * it will check the quantity of ingrediants in all other orders
         * @param order
         * @param idx
         */

        vm.addOrder = function (order, idx) {

            var qt = 0;
            var orderObj = barFactory.getOrderData(order);
             barFactory.addOrder(orderObj, vm.ingrediants, idx);

            vm.incBtn = barFactory.getIncBtn();
            vm.qty[idx] += 1;
            vm.decBtn[idx] = false;
        }


        /**
         * This method will decrease the order count.
         * @param order
         * @param idx
         */
        vm.remIng = function (order, idx) {
            var qt = 0;
            var orderObj = barFactory.getOrderData(order);
             barFactory.remIng(orderObj, idx, vm.ingrediants, vm.qty)

            if (vm.qty[idx] > 0)
                vm.qty[idx] -= 1;
            else
                vm.decBtn[idx] = true;
            vm.incBtn[idx] = false;
        }

        /**
         * This method used to toggle panel
         */
        vm.placeOrderHandler = function () {
            vm.placeOrder = false;
            vm.addIngr = true;
        }

        /**
         * This method will return count of orders for each specific.
         * @returns {number}
         */
        vm.getCountofOrderObject = function(){

            return barFactory.getCountofOrderObject(vm.qty);

        }

        


    });