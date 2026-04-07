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

function findDuplicate(nums) {
    for (let i = 0; i < nums.length; i++) {
        let index = Math.abs(nums[i]) - 1;

        if (nums[index] < 0) {
            return Math.abs(nums[i]);
        }

        nums[index] = -nums[index];
    }
}

function merzeArray(nums1 , nums2){
   result = []
   let i = 0 ,j = 0;
   while(i <nums1.length &&j < nums2.length ){

    if(nums1[i]<nums2[2]){
        result.push(nums1[i])
        i++;
    }
    result.push(nums2[j])
    j++;
   }
   while(i < nums1[i]){
    result.push(nums1[i])
    i++
   }

    while(j < nums1[j]){
    result.push(nums1[j])
      j++
   }
   return result
}
    



// console.log(twoSum([2,7,11,15],9))
// console.log(maxSum([1,2,3,-1,5]))
console.log(moveZeroes([0,1,0,3,12]))
console.log(findDuplicate([1,3,4,2,2]))