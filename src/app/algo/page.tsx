// countPositivesSumNegatives([1, 2, 3, -1, -2]);
// // [3, -3]

// countPositivesSumNegatives([-5, -10, -15]);
// // [0, -30]

// countPositivesSumNegatives([4, 8, 12]);
// // [3, 0]

// countPositivesSumNegatives([0, 0, 0]);
// // [0, 0]

// countPositivesSumNegatives([10, -20, 30, -40, 50]);
// // [3, -60]

// countPositivesSumNegatives([]);
// // []

 function countPositivesSumNegatives(arrs){
    if(arrs.length == 0){
        return[];
    }
    let post = 0;
    let negat = 0;
    for(let i =0 ;i<arrs.length;i++){
        if(arrs[i] >0){
            post++
        }
        if(arrs[i] <0){
            negat += arrs[i]
        }
    }
    return [post,negat]
}
 const result = countPositivesSumNegatives([0, 0, 0]);

 function findSmallest(arr3){
    let less = arr3[0]
    for(let i =0 ;i<arr3.length;i++){
        if(less > arr3[i]){
            less = arr3[i]
        }
    }
    return less
 }
 const res = findSmallest([10, -2, 7, 0])
export default function AlgoPage() {
  return (
     <>
  <h1>Algorithm Practice</h1>
  <p>result :  {JSON.stringify(result)}</p>
  <p>result :  {JSON.stringify(res)}</p>
  </>
  )
 
  
}