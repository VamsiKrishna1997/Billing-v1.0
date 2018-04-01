(function(){
	
	angular.module("main.billing",[])
		.controller("Billing",function($scope,$http,$window){
			$scope.item_info = [];
			$scope.igst = 0;
			$scope.Add = function(items){
				$scope.item_info.push(items);
				$scope.item  ="";
			}
			
			$scope.getTotal = function(){
				var total = 0;
				for(var i=0;i<$scope.item_info.length;i++)
					{
						var item = $scope.item_info[i];
						total += (item.price * item.qty);
					}
				return total;
			}
			
			$scope.getSgst = function(){
				var total = $scope.getTotal();
				var number = ($scope.sgst/100) * total;
				
				return number;
			}
			$scope.getCgst = function(){
				var total = $scope.getTotal();
				var number = ($scope.cgst/100) * total;
				
				return number;
			}
			$scope.getIgst = function(){
				var total = $scope.getTotal();
				var number = ($scope.igst/100) * total;
				
				return number;
			}
			$scope.getGrandTotal = function(){
				return $scope.getTotal() + $scope.getSgst() + $scope.getCgst() + $scope.getIgst() + parseInt($scope.transport);
			}
		
			$scope.print_save = function(print_element_id){
				$http.post("save.php",{
					'item_info': $scope.item_info,
					'invoice':$scope.invoice,
					'date':$scope.date,
					'buyer': $scope.buyer,
					'total':$scope.getTotal(),
					'sgst':$scope.getSgst(),
					'cgst':$scope.getCgst(),
					'igst':$scope.getIgst(),
				    'transport':$scope.transport,
				    'grandtotal':$scope.getGrandTotal(),
				    'buyeraddress':$scope.buyeraddress
				    
					
					
				}).then(function(response){
					$window.location.reload();
				},function(error){
					console.log(error);
				});
				
				
				var innerContents = document.getElementById(print_element_id).innerHTML;
		        var popupWinindow = window.open('', '_blank', 'width=600,height=700,status=no,titlebar=no');
		        popupWinindow.document.open();
		        popupWinindow.document.write('<html><head><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"></head><body onload="window.print()" style="max-width:22cm;width:21cm;max-height:50cm;height:40cm;font-size:17px;">' + innerContents + '</html>');
		        popupWinindow.document.close();
		        
		         innerContents = "";
		         popupWinindow = "";
		         innerContents = "";
		        
		         $scope.item_info = "";
		         
		         
			}
			
			$scope.remove = function(item){
				
				 
			    console.log($scope.item_info.splice($scope.item_info.indexOf(item),1));
				  
			}
			
			$scope.check_item_info = function(){
				
				if($scope.item_info.length > 0)
					{
						return true;
					}
				else
					{
						return false;
					}
			}
			
			$scope.convertNumberToWords = function(amount){
				
				 var words = new Array();
				    words[0] = '';
				    words[1] = 'One';
				    words[2] = 'Two';
				    words[3] = 'Three';
				    words[4] = 'Four';
				    words[5] = 'Five';
				    words[6] = 'Six';
				    words[7] = 'Seven';
				    words[8] = 'Eight';
				    words[9] = 'Nine';
				    words[10] = 'Ten';
				    words[11] = 'Eleven';
				    words[12] = 'Twelve';
				    words[13] = 'Thirteen';
				    words[14] = 'Fourteen';
				    words[15] = 'Fifteen';
				    words[16] = 'Sixteen';
				    words[17] = 'Seventeen';
				    words[18] = 'Eighteen';
				    words[19] = 'Nineteen';
				    words[20] = 'Twenty';
				    words[30] = 'Thirty';
				    words[40] = 'Forty';
				    words[50] = 'Fifty';
				    words[60] = 'Sixty';
				    words[70] = 'Seventy';
				    words[80] = 'Eighty';
				    words[90] = 'Ninety';
				    amount = amount.toString();
				    var atemp = amount.split(".");
				    var number = atemp[0].split(",").join("");
				    var n_length = number.length;
				    var words_string = "";
				    if (n_length <= 9) {
				        var n_array = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
				        var received_n_array = new Array();
				        for (var i = 0; i < n_length; i++) {
				            received_n_array[i] = number.substr(i, 1);
				        }
				        for (var i = 9 - n_length, j = 0; i < 9; i++, j++) {
				            n_array[i] = received_n_array[j];
				        }
				        for (var i = 0, j = 1; i < 9; i++, j++) {
				            if (i == 0 || i == 2 || i == 4 || i == 7) {
				                if (n_array[i] == 1) {
				                    n_array[j] = 10 + parseInt(n_array[j]);
				                    n_array[i] = 0;
				                }
				            }
				        }
				        value = "";
				        for (var i = 0; i < 9; i++) {
				            if (i == 0 || i == 2 || i == 4 || i == 7) {
				                value = n_array[i] * 10;
				            } else {
				                value = n_array[i];
				            }
				            if (value != 0) {
				                words_string += words[value] + " ";
				            }
				            if ((i == 1 && value != 0) || (i == 0 && value != 0 && n_array[i + 1] == 0)) {
				                words_string += "Crores ";
				            }
				            if ((i == 3 && value != 0) || (i == 2 && value != 0 && n_array[i + 1] == 0)) {
				                words_string += "Lakhs ";
				            }
				            if ((i == 5 && value != 0) || (i == 4 && value != 0 && n_array[i + 1] == 0)) {
				                words_string += "Thousand ";
				            }
				            if (i == 6 && value != 0 && (n_array[i + 1] != 0 && n_array[i + 2] != 0)) {
				                words_string += "Hundred and ";
				            } else if (i == 6 && value != 0) {
				                words_string += "Hundred ";
				            }
				        }
				        words_string = words_string.split("  ").join(" ");
				    }
				    return words_string+" Rupees Only.";
				
			}
		})
	
})();