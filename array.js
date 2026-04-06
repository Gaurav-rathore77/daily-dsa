function twoSum(nums , target){
    for(let i = 0 ; i <nums.length ; i ++){
        for(let j = i + 1 ; i <nums.length ; j ++){
            if(nums[i] + nums[j] === target){
                return [i , j]
            }
        }
    }

}

function maxSum(nums){
    let current  = nums[0]
    let max = nums[0]
    for(let i = 0 ; i <nums.length ; i ++){
        current = Math.max(nums[i],current + nums[i])
        max = Math.max(max,current)
    }
    return max;

}

function moveZeroes(nums){
    let j = 0 ; 
    for(let i = 0 ; i < nums.length ; i ++){
        if(nums[i] !== 0){
            [nums[i],nums[j]] = [nums[j],nums[i]]
            j ++
        }
    }
    return nums;

}


// console.log(twoSum([2,7,11,15],9))
// console.log(maxSum([1,2,3,-1,5]))
console.log(moveZeroes([0,1,0,3,12]))