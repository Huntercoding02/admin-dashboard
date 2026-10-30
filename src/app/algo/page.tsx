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

 function descendingOrder(n) {
  return Number(String(n).split("").sort((a,b)=> b - a ).join(""))
}

const res1 = descendingOrder(123456789)

function XO(str : string) {
   let str1 =str.toLowerCase().split("")
  if(!str1.includes("x") && !str1.includes("o")){
    return true;
  }
  let countX = 0;
  let countO = 0;
  
    for(let i=0; i< str1.length ;i++){
        if(str[i] === "x"){
            countX++
        }else if(str[i] === "o"){
            countO++
        }
        if(countO == countX){
            return true
        }else{
            return false
        }
    }
  
}
const res2 = XO(("xxx"))
export default function AlgoPage() {
  return (
     <>
  <h1>Algorithm Practice</h1>
  <p>result :  {JSON.stringify(result)}</p>
  <p>result :  {JSON.stringify(res)}</p>
  <p>result :  {JSON.stringify(res1)}</p>
  <p>result :  {JSON.stringify(res2)}</p>
  </>
  )
 
  
}