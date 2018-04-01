(function(){
	
	angular.module("main.search",[])
		.controller("Search",function($scope,$http,$filter){
			
			$scope.showresult = false;
			$scope.result = [];
			$scope.filtereddata = [];
			$scope.resultfiltered = [];
			$scope.active_element = "";
			$scope.searchshow = true;
			$scope.listshow = true;
			$scope.taxshow = false;
			
			
			$scope.print = function(print_section_id){
				var innerContents = document.getElementById(print_section_id).innerHTML;
		        var popupWinindow = window.open('', '_blank', 'width=600,height=700,status=no,titlebar=no');
		        popupWinindow.document.open();
		        popupWinindow.document.write('<html><head><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"><link rel="stylesheet" href="css/table.css"></head><body onload="window.print()" style="max-width:22cm;width:21cm;max-height:50cm;height:40cm;font-size:17px">' + innerContents + '</html>');
		        popupWinindow.document.close();
			}
			
			
			$scope.changed = function(value){
				
				$scope.showresult = false;
				if(value == "invoice")
					{
						$scope.invoiceshow = true;
						$scope.active_element = "invoice";
						$scope.buyershow = false;
						$scope.dateshow = false;
					}
				if(value == "buyer")
					{
						$scope.invoiceshow = false;
						$scope.buyershow = true;
						$scope.active_element = "buyer";
						$scope.dateshow = false;
					}
				if(value == "date")
					{
						$scope.invoiceshow = false;
						$scope.buyershow = false;
						$scope.dateshow = true;
						$scope.active_element = "date";	
					}
			
			}
			
			
			$scope.search = function(){
				
				
				
				$scope.result = [];
				$scope.taxinvoicedata = [];
				if($scope.active_element == "invoice"){
					$scope.data = $scope.selectedinvoice;
				}
				else if($scope.active_element == "buyer"){
					$scope.data = $scope.buyername;
				}
				else if($scope.active_element == "date"){
					$scope.data = $filter('date')($scope.selecteddate, "yyyy-MM-dd");
						
				}
				
				
			
			
				
				$http.get("getdetails.php",{params:{'element': $scope.active_element,
					'data':$scope.data
					}
				}).then(function(response){
					
					$scope.result.push(response.data.response1);
					$scope.taxinvoicedata.push(response.data.response2);
					
						
						
					});
				
				$scope.showresult = true;
				$scope.selectedinvoice= "";
				$scope.buyername = "";
				$scope.selecteddate = "";
				}
			
			$scope.taxinvoice = function(detail){
				
				$scope.filtereddata = [];
				$scope.resultfiltered= [];
				
			
				$scope.filtereddata.push($filter('filter')($scope.taxinvoicedata[0], { invoice: detail.invoice }));
				
				$scope.resultfiltered.push($filter('filter')($scope.result[0], { invoice: detail.invoice }));
				
				$scope.taxshow = true;
				$scope.searchshow = false;
				$scope.listshow = false;
			
				
				
				
			
			}
			
			$scope.back = function(){
				
				$scope.taxshow = false;
				$scope.searchshow = true;
				$scope.listshow = true;	
				
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
				    return words_string+"Rupees Only.";
				
			}
	
			
			
		})
	
})();