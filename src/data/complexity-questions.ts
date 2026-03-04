import { BigO } from "@/lib/types";

export interface ComplexityQuestion {
  id: number;
  title: string;
  code: string;
  timeComplexity: BigO;
  spaceComplexity: BigO;
  explanation: string;
  hint?: string;
  category: string;
}

export const complexityQuestions: ComplexityQuestion[] = [
  {
    id: 1,
    title: "Simple Array Sum",
    code: `function sum(arr):
    total = 0
    for i in range(len(arr)):
        total += arr[i]
    return total`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    explanation:
      "A single loop iterates through every element once, giving O(n) time. Only a single variable (total) is used regardless of input size, so space is O(1).",
    category: "loops",
  },
  {
    id: 2,
    title: "Nested Loop Sum",
    code: `function pairSum(arr):
    total = 0
    for i in range(len(arr)):
        for j in range(len(arr)):
            total += arr[i] + arr[j]
    return total`,
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    explanation:
      "Two nested loops each iterate n times, giving n × n = O(n²) time. Only a constant amount of extra space is used.",
    category: "loops",
  },
  {
    id: 3,
    title: "Binary Search",
    code: `function binarySearch(arr, target):
    low = 0
    high = len(arr) - 1
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1`,
    timeComplexity: "O(log n)",
    spaceComplexity: "O(1)",
    explanation:
      "Each iteration halves the search space, so it takes at most log₂(n) steps. Only a few pointer variables are used, so space is O(1).",
    category: "binary-search",
  },
  {
    id: 4,
    title: "Hash Map Lookup",
    code: `function hasDuplicate(arr):
    seen = {}
    for item in arr:
        if item in seen:
            return True
        seen[item] = True
    return False`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    explanation:
      "We iterate through the array once (O(n) time). In the worst case, all elements are unique, so the hash map stores n entries (O(n) space).",
    category: "hash-map",
  },
  {
    id: 5,
    title: "Constant Time Access",
    code: `function getFirst(arr):
    return arr[0]`,
    timeComplexity: "O(1)",
    spaceComplexity: "O(1)",
    explanation:
      "Array index access is a single operation regardless of array size. No extra space is allocated.",
    category: "loops",
  },
  {
    id: 6,
    title: "Merge Sort",
    code: `function mergeSort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = mergeSort(arr[:mid])
    right = mergeSort(arr[mid:])
    return merge(left, right)`,
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(n)",
    explanation:
      "The array is split in half log(n) times, and merging at each level takes O(n) work, giving O(n log n) time. The merge step creates new arrays totaling O(n) extra space.",
    category: "sorting",
  },
  {
    id: 7,
    title: "Fibonacci (Naive Recursive)",
    code: `function fib(n):
    if n <= 1:
        return n
    return fib(n - 1) + fib(n - 2)`,
    timeComplexity: "O(2ⁿ)",
    spaceComplexity: "O(n)",
    explanation:
      "Each call branches into two recursive calls, creating an exponential number of calls: O(2ⁿ). The call stack depth is at most n, so space is O(n).",
    hint: "Think about how many function calls are made at each level of recursion.",
    category: "recursion",
  },
  {
    id: 8,
    title: "Build Frequency Map",
    code: `function countFreq(arr):
    freq = {}
    for item in arr:
        if item in freq:
            freq[item] += 1
        else:
            freq[item] = 1
    return freq`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    explanation:
      "A single pass through the array (O(n) time). The hash map may store up to n unique keys (O(n) space).",
    category: "hash-map",
  },
  {
    id: 9,
    title: "Bubble Sort",
    code: `function bubbleSort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
    return arr`,
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    explanation:
      "Two nested loops: the outer runs n times and the inner runs up to n times, giving O(n²) comparisons in the worst case. The sort is in-place with only a temp variable for swapping — O(1) space.",
    category: "sorting",
  },
  {
    id: 10,
    title: "Tree Traversal (DFS)",
    code: `function inorder(node):
    if node is None:
        return []
    left = inorder(node.left)
    right = inorder(node.right)
    return left + [node.val] + right`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    explanation:
      "Every node is visited exactly once, so time is O(n) where n is the number of nodes. The recursion stack can go up to O(n) deep for a skewed tree, and the output list stores all n values.",
    category: "tree",
  },
  {
    id: 11,
    title: "Two Pointer Sorted Pair",
    code: `function twoSum(arr, target):
    left = 0
    right = len(arr) - 1
    while left < right:
        s = arr[left] + arr[right]
        if s == target:
            return [left, right]
        elif s < target:
            left += 1
        else:
            right -= 1
    return []`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    explanation:
      "The two pointers start at opposite ends and each moves inward — together they cover at most n steps. Only pointer variables are used, so space is O(1).",
    category: "two-pointers",
  },
  {
    id: 12,
    title: "String Reversal",
    code: `function reverse(s):
    result = ""
    for i in range(len(s) - 1, -1, -1):
        result += s[i]
    return result`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    explanation:
      "The loop runs n times (O(n) time). A new string of length n is built, requiring O(n) space. Note: in some languages, string concatenation in a loop can be O(n²) due to immutability, but the algorithmic complexity here is O(n).",
    hint: "Consider both the loop and the new string being built.",
    category: "strings",
  },
  {
    id: 13,
    title: "BFS Level Order",
    code: `function levelOrder(root):
    if root is None:
        return []
    queue = [root]
    result = []
    while queue:
        node = queue.pop(0)
        result.append(node.val)
        if node.left:
            queue.append(node.left)
        if node.right:
            queue.append(node.right)
    return result`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    explanation:
      "Every node is enqueued and dequeued exactly once — O(n) time. The queue can hold up to O(n) nodes (the widest level), and the result stores all n values — O(n) space.",
    category: "tree",
  },
  {
    id: 14,
    title: "Matrix Search",
    code: `function findInMatrix(matrix, target):
    for row in matrix:
        for val in row:
            if val == target:
                return True
    return False`,
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    explanation:
      "If the matrix is n × n, every element is checked in the worst case: n × n = O(n²). No extra data structures are used, so space is O(1).",
    hint: "Think of the matrix dimensions as n × n.",
    category: "loops",
  },
  {
    id: 15,
    title: "Sliding Window Maximum Sum",
    code: `function maxSubarraySum(arr, k):
    windowSum = sum(arr[:k])
    maxSum = windowSum
    for i in range(k, len(arr)):
        windowSum += arr[i] - arr[i - k]
        maxSum = max(maxSum, windowSum)
    return maxSum`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    explanation:
      "The initial sum takes O(k), then the sliding loop runs O(n - k) times. Together that's O(n). Only a constant number of variables are used — O(1) space.",
    category: "sliding-window",
  },
  {
    id: 16,
    title: "Power Function (Recursive)",
    code: `function power(base, exp):
    if exp == 0:
        return 1
    if exp % 2 == 0:
        half = power(base, exp // 2)
        return half * half
    else:
        return base * power(base, exp - 1)`,
    timeComplexity: "O(log n)",
    spaceComplexity: "O(log n)",
    explanation:
      "The exponent is halved at each step, so there are O(log n) recursive calls. Each call adds a frame to the call stack, so space is also O(log n).",
    hint: "How many times can you halve the exponent before reaching 0?",
    category: "recursion",
  },
  {
    id: 17,
    title: "Generate Permutations",
    code: `function permutations(arr):
    if len(arr) <= 1:
        return [arr]
    result = []
    for i in range(len(arr)):
        rest = arr[:i] + arr[i+1:]
        for p in permutations(rest):
            result.append([arr[i]] + p)
    return result`,
    timeComplexity: "O(n!)",
    spaceComplexity: "O(n!)",
    explanation:
      "There are n! permutations of n elements, and generating each takes O(n) work, giving O(n × n!) time — simplified to O(n!). All permutations are stored, requiring O(n × n!) ≈ O(n!) space.",
    hint: "How many permutations does an array of length n have?",
    category: "recursion",
  },
  {
    id: 18,
    title: "Logarithmic Loop",
    code: `function logLoop(n):
    i = 1
    count = 0
    while i < n:
        count += 1
        i *= 2
    return count`,
    timeComplexity: "O(log n)",
    spaceComplexity: "O(1)",
    explanation:
      "The variable i doubles each iteration, reaching n after log₂(n) steps. Only a counter variable is used — O(1) space.",
    category: "loops",
  },
];
