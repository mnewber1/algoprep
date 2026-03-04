import { Problem } from "@/lib/types";

export const problems: Problem[] = [
  // ==================== TWO POINTERS ====================
  {
    slug: "valid-palindrome",
    title: "Valid Palindrome",
    category: "two-pointers",
    difficulty: "easy",
    description:
      "Given a string `s`, return `true` if it is a palindrome considering only alphanumeric characters and ignoring case.\n\nA string is a palindrome when it reads the same forward and backward.",
    examples:
      '**Example 1:**\n```\nInput: s = "A man, a plan, a canal: Panama"\nOutput: true\nExplanation: "amanaplanacanalpanama" is a palindrome.\n```\n\n**Example 2:**\n```\nInput: s = "race a car"\nOutput: false\n```',
    constraints:
      "- `1 <= s.length <= 2 * 10^5`\n- `s` consists only of printable ASCII characters.",
    starterCode: {
      java: "class Solution {\n    public boolean isPalindrome(String s) {\n        // your code here\n    }\n}",
      kotlin: "class Solution {\n    fun isPalindrome(s: String): Boolean {\n        // your code here\n    }\n}",
      python:
        "class Solution:\n    def isPalindrome(self, s: str) -> bool:\n        # your code here\n        pass",
    },
    testCases: [
      { input: '"A man, a plan, a canal: Panama"', expected: "true", args: ["A man, a plan, a canal: Panama"] },
      { input: '"race a car"', expected: "false", args: ["race a car"] },
      { input: '" "', expected: "true", args: [" "] },
      { input: '"ab"', expected: "false", args: ["ab"] },
    ],
    functionName: "isPalindrome",
    invocation: {
      java: 'String s = args[i];\nboolean result = new Solution().isPalindrome(s);\nSystem.out.println(result);',
      kotlin: 'val s = args[i]\nval result = Solution().isPalindrome(s)\nprintln(result)',
      python: 's = args[i]\nresult = Solution().isPalindrome(s)\nprint(str(result).lower())',
    },
  },
  {
    slug: "two-sum-ii",
    title: "Two Sum II - Input Array Is Sorted",
    category: "two-pointers",
    difficulty: "easy",
    description:
      "Given a **1-indexed** array of integers `numbers` that is already sorted in non-decreasing order, find two numbers such that they add up to a specific `target` number.\n\nReturn the indices of the two numbers (1-indexed) as an integer array `[index1, index2]`.\n\nYou may not use the same element twice. There is exactly one solution.",
    examples:
      "**Example 1:**\n```\nInput: numbers = [2,7,11,15], target = 9\nOutput: [1,2]\n```\n\n**Example 2:**\n```\nInput: numbers = [2,3,4], target = 6\nOutput: [1,3]\n```",
    constraints:
      "- `2 <= numbers.length <= 3 * 10^4`\n- `-1000 <= numbers[i] <= 1000`\n- `-1000 <= target <= 1000`",
    starterCode: {
      java: "class Solution {\n    public int[] twoSum(int[] numbers, int target) {\n        // your code here\n    }\n}",
      kotlin: "class Solution {\n    fun twoSum(numbers: IntArray, target: Int): IntArray {\n        // your code here\n    }\n}",
      python:
        "class Solution:\n    def twoSum(self, numbers: list[int], target: int) -> list[int]:\n        # your code here\n        pass",
    },
    testCases: [
      { input: "[2,7,11,15], 9", expected: "[1, 2]", args: ["2,7,11,15", "9"] },
      { input: "[2,3,4], 6", expected: "[1, 3]", args: ["2,3,4", "6"] },
      { input: "[-1,0], -1", expected: "[1, 2]", args: ["-1,0", "-1"] },
    ],
    functionName: "twoSum",
    invocation: {
      java: 'String[] parts = args[i].split(";");\nint[] numbers = parseIntArray(parts[0]);\nint target = Integer.parseInt(parts[1]);\nint[] result = new Solution().twoSum(numbers, target);\nSystem.out.println(java.util.Arrays.toString(result));',
      kotlin: 'val parts = args[i].split(";")\nval numbers = parts[0].split(",").map { it.trim().toInt() }.toIntArray()\nval target = parts[1].trim().toInt()\nval result = Solution().twoSum(numbers, target)\nprintln(result.toList())',
      python: 'parts = args[i].split(";")\nnumbers = [int(x) for x in parts[0].split(",")]\ntarget = int(parts[1])\nresult = Solution().twoSum(numbers, target)\nprint(result)',
    },
  },
  {
    slug: "remove-duplicates",
    title: "Remove Duplicates from Sorted Array",
    category: "two-pointers",
    difficulty: "easy",
    description:
      "Given an integer array `nums` sorted in non-decreasing order, remove the duplicates **in-place** such that each unique element appears only once. The relative order of the elements should be kept the same.\n\nReturn `k` after placing the final result in the first `k` slots of `nums`.",
    examples:
      "**Example 1:**\n```\nInput: nums = [1,1,2]\nOutput: 2, nums = [1,2,...]\n```\n\n**Example 2:**\n```\nInput: nums = [0,0,1,1,1,2,2,3,3,4]\nOutput: 5, nums = [0,1,2,3,4,...]\n```",
    constraints:
      "- `1 <= nums.length <= 3 * 10^4`\n- `-100 <= nums[i] <= 100`\n- `nums` is sorted in non-decreasing order.",
    starterCode: {
      java: "class Solution {\n    public int removeDuplicates(int[] nums) {\n        // your code here\n    }\n}",
      kotlin: "class Solution {\n    fun removeDuplicates(nums: IntArray): Int {\n        // your code here\n    }\n}",
      python:
        "class Solution:\n    def removeDuplicates(self, nums: list[int]) -> int:\n        # your code here\n        pass",
    },
    testCases: [
      { input: "[1,1,2]", expected: "2", args: ["1,1,2"] },
      { input: "[0,0,1,1,1,2,2,3,3,4]", expected: "5", args: ["0,0,1,1,1,2,2,3,3,4"] },
      { input: "[1]", expected: "1", args: ["1"] },
    ],
    functionName: "removeDuplicates",
    invocation: {
      java: 'int[] nums = parseIntArray(args[i]);\nint result = new Solution().removeDuplicates(nums);\nSystem.out.println(result);',
      kotlin: 'val nums = args[i].split(",").map { it.trim().toInt() }.toIntArray()\nval result = Solution().removeDuplicates(nums)\nprintln(result)',
      python: 'nums = [int(x) for x in args[i].split(",")]\nresult = Solution().removeDuplicates(nums)\nprint(result)',
    },
  },

  // ==================== SLIDING WINDOW ====================
  {
    slug: "max-sum-subarray-k",
    title: "Max Sum Subarray of Size K",
    category: "sliding-window",
    difficulty: "easy",
    description:
      "Given an array of integers `nums` and an integer `k`, find the maximum sum of any contiguous subarray of size `k`.",
    examples:
      "**Example 1:**\n```\nInput: nums = [2,1,5,1,3,2], k = 3\nOutput: 9\nExplanation: Subarray [5,1,3] has max sum 9.\n```\n\n**Example 2:**\n```\nInput: nums = [2,3,4,1,5], k = 2\nOutput: 7\n```",
    constraints:
      "- `1 <= k <= nums.length <= 10^5`\n- `-10^4 <= nums[i] <= 10^4`",
    starterCode: {
      java: "class Solution {\n    public int maxSumSubarray(int[] nums, int k) {\n        // your code here\n    }\n}",
      kotlin: "class Solution {\n    fun maxSumSubarray(nums: IntArray, k: Int): Int {\n        // your code here\n    }\n}",
      python:
        "class Solution:\n    def maxSumSubarray(self, nums: list[int], k: int) -> int:\n        # your code here\n        pass",
    },
    testCases: [
      { input: "[2,1,5,1,3,2], 3", expected: "9", args: ["2,1,5,1,3,2;3"] },
      { input: "[2,3,4,1,5], 2", expected: "7", args: ["2,3,4,1,5;2"] },
      { input: "[1,2,3,4,5], 1", expected: "5", args: ["1,2,3,4,5;1"] },
    ],
    functionName: "maxSumSubarray",
    invocation: {
      java: 'String[] parts = args[i].split(";");\nint[] nums = parseIntArray(parts[0]);\nint k = Integer.parseInt(parts[1]);\nint result = new Solution().maxSumSubarray(nums, k);\nSystem.out.println(result);',
      kotlin: 'val parts = args[i].split(";")\nval nums = parts[0].split(",").map { it.trim().toInt() }.toIntArray()\nval k = parts[1].trim().toInt()\nval result = Solution().maxSumSubarray(nums, k)\nprintln(result)',
      python: 'parts = args[i].split(";")\nnums = [int(x) for x in parts[0].split(",")]\nk = int(parts[1])\nresult = Solution().maxSumSubarray(nums, k)\nprint(result)',
    },
  },
  {
    slug: "longest-substring-without-repeating",
    title: "Longest Substring Without Repeating Characters",
    category: "sliding-window",
    difficulty: "easy",
    description:
      "Given a string `s`, find the length of the **longest substring** without repeating characters.",
    examples:
      '**Example 1:**\n```\nInput: s = "abcabcbb"\nOutput: 3\nExplanation: "abc" has length 3.\n```\n\n**Example 2:**\n```\nInput: s = "bbbbb"\nOutput: 1\n```\n\n**Example 3:**\n```\nInput: s = "pwwkew"\nOutput: 3\n```',
    constraints:
      "- `0 <= s.length <= 5 * 10^4`\n- `s` consists of English letters, digits, symbols and spaces.",
    starterCode: {
      java: "class Solution {\n    public int lengthOfLongestSubstring(String s) {\n        // your code here\n    }\n}",
      kotlin: "class Solution {\n    fun lengthOfLongestSubstring(s: String): Int {\n        // your code here\n    }\n}",
      python:
        "class Solution:\n    def lengthOfLongestSubstring(self, s: str) -> int:\n        # your code here\n        pass",
    },
    testCases: [
      { input: '"abcabcbb"', expected: "3", args: ["abcabcbb"] },
      { input: '"bbbbb"', expected: "1", args: ["bbbbb"] },
      { input: '"pwwkew"', expected: "3", args: ["pwwkew"] },
      { input: '""', expected: "0", args: [""] },
    ],
    functionName: "lengthOfLongestSubstring",
    invocation: {
      java: 'String s = args[i];\nint result = new Solution().lengthOfLongestSubstring(s);\nSystem.out.println(result);',
      kotlin: 'val s = args[i]\nval result = Solution().lengthOfLongestSubstring(s)\nprintln(result)',
      python: 's = args[i]\nresult = Solution().lengthOfLongestSubstring(s)\nprint(result)',
    },
  },
  {
    slug: "contains-duplicate-ii",
    title: "Contains Duplicate II",
    category: "sliding-window",
    difficulty: "easy",
    description:
      "Given an integer array `nums` and an integer `k`, return `true` if there are two distinct indices `i` and `j` in the array such that `nums[i] == nums[j]` and `abs(i - j) <= k`.",
    examples:
      "**Example 1:**\n```\nInput: nums = [1,2,3,1], k = 3\nOutput: true\n```\n\n**Example 2:**\n```\nInput: nums = [1,0,1,1], k = 1\nOutput: true\n```\n\n**Example 3:**\n```\nInput: nums = [1,2,3,1,2,3], k = 2\nOutput: false\n```",
    constraints:
      "- `1 <= nums.length <= 10^5`\n- `-10^9 <= nums[i] <= 10^9`\n- `0 <= k <= 10^5`",
    starterCode: {
      java: "class Solution {\n    public boolean containsNearbyDuplicate(int[] nums, int k) {\n        // your code here\n    }\n}",
      kotlin: "class Solution {\n    fun containsNearbyDuplicate(nums: IntArray, k: Int): Boolean {\n        // your code here\n    }\n}",
      python:
        "class Solution:\n    def containsNearbyDuplicate(self, nums: list[int], k: int) -> bool:\n        # your code here\n        pass",
    },
    testCases: [
      { input: "[1,2,3,1], 3", expected: "true", args: ["1,2,3,1;3"] },
      { input: "[1,0,1,1], 1", expected: "true", args: ["1,0,1,1;1"] },
      { input: "[1,2,3,1,2,3], 2", expected: "false", args: ["1,2,3,1,2,3;2"] },
    ],
    functionName: "containsNearbyDuplicate",
    invocation: {
      java: 'String[] parts = args[i].split(";");\nint[] nums = parseIntArray(parts[0]);\nint k = Integer.parseInt(parts[1]);\nboolean result = new Solution().containsNearbyDuplicate(nums, k);\nSystem.out.println(result);',
      kotlin: 'val parts = args[i].split(";")\nval nums = parts[0].split(",").map { it.trim().toInt() }.toIntArray()\nval k = parts[1].trim().toInt()\nval result = Solution().containsNearbyDuplicate(nums, k)\nprintln(result)',
      python: 'parts = args[i].split(";")\nnums = [int(x) for x in parts[0].split(",")]\nk = int(parts[1])\nresult = Solution().containsNearbyDuplicate(nums, k)\nprint(str(result).lower())',
    },
  },

  // ==================== BINARY SEARCH ====================
  {
    slug: "binary-search",
    title: "Binary Search",
    category: "binary-search",
    difficulty: "easy",
    description:
      "Given a sorted array of integers `nums` and a target value `target`, return the index if the target is found. If not, return `-1`.\n\nYou must write an algorithm with `O(log n)` runtime complexity.",
    examples:
      "**Example 1:**\n```\nInput: nums = [-1,0,3,5,9,12], target = 9\nOutput: 4\n```\n\n**Example 2:**\n```\nInput: nums = [-1,0,3,5,9,12], target = 2\nOutput: -1\n```",
    constraints:
      "- `1 <= nums.length <= 10^4`\n- All integers in `nums` are unique.\n- `nums` is sorted in ascending order.",
    starterCode: {
      java: "class Solution {\n    public int search(int[] nums, int target) {\n        // your code here\n    }\n}",
      kotlin: "class Solution {\n    fun search(nums: IntArray, target: Int): Int {\n        // your code here\n    }\n}",
      python:
        "class Solution:\n    def search(self, nums: list[int], target: int) -> int:\n        # your code here\n        pass",
    },
    testCases: [
      { input: "[-1,0,3,5,9,12], 9", expected: "4", args: ["-1,0,3,5,9,12;9"] },
      { input: "[-1,0,3,5,9,12], 2", expected: "-1", args: ["-1,0,3,5,9,12;2"] },
      { input: "[5], 5", expected: "0", args: ["5;5"] },
    ],
    functionName: "search",
    invocation: {
      java: 'String[] parts = args[i].split(";");\nint[] nums = parseIntArray(parts[0]);\nint target = Integer.parseInt(parts[1]);\nint result = new Solution().search(nums, target);\nSystem.out.println(result);',
      kotlin: 'val parts = args[i].split(";")\nval nums = parts[0].split(",").map { it.trim().toInt() }.toIntArray()\nval target = parts[1].trim().toInt()\nval result = Solution().search(nums, target)\nprintln(result)',
      python: 'parts = args[i].split(";")\nnums = [int(x) for x in parts[0].split(",")]\ntarget = int(parts[1])\nresult = Solution().search(nums, target)\nprint(result)',
    },
  },
  {
    slug: "first-bad-version",
    title: "First Bad Version",
    category: "binary-search",
    difficulty: "easy",
    description:
      "You are a product manager and currently leading a team to develop a new product. Unfortunately, the latest version fails the quality check. Since each version is developed based on the previous version, all the versions after a bad version are also bad.\n\nYou are given an API `isBadVersion(version)` which returns whether `version` is bad. Implement a function to find the first bad version. You should minimize the number of calls to the API.\n\nGiven `n` (total versions) and `bad` (first bad version), return the first bad version number.",
    examples:
      "**Example 1:**\n```\nInput: n = 5, bad = 4\nOutput: 4\n```\n\n**Example 2:**\n```\nInput: n = 1, bad = 1\nOutput: 1\n```",
    constraints: "- `1 <= bad <= n <= 2^31 - 1`",
    starterCode: {
      java: "class Solution {\n    boolean isBadVersion(int version) { return false; }\n\n    public int firstBadVersion(int n) {\n        // your code here\n    }\n}",
      kotlin: "class Solution {\n    fun isBadVersion(version: Int): Boolean = false\n\n    fun firstBadVersion(n: Int): Int {\n        // your code here\n    }\n}",
      python:
        "class Solution:\n    # isBadVersion(version) is already defined\n    def firstBadVersion(self, n: int) -> int:\n        # your code here\n        pass",
    },
    testCases: [
      { input: "n = 5, bad = 4", expected: "4", args: ["5;4"] },
      { input: "n = 1, bad = 1", expected: "1", args: ["1;1"] },
      { input: "n = 100, bad = 50", expected: "50", args: ["100;50"] },
    ],
    functionName: "firstBadVersion",
    invocation: {
      java: 'String[] parts = args[i].split(";");\nint n = Integer.parseInt(parts[0]);\nfinal int bad = Integer.parseInt(parts[1]);\nSolution sol = new Solution() {\n    boolean isBadVersion(int version) { return version >= bad; }\n};\nSystem.out.println(sol.firstBadVersion(n));',
      kotlin: 'val parts = args[i].split(";")\nval n = parts[0].trim().toInt()\nval bad = parts[1].trim().toInt()\nval sol = object : UserSolution() {\n    override fun isBadVersion(version: Int): Boolean = version >= bad\n}\nprintln(sol.firstBadVersion(n))',
      python: 'parts = args[i].split(";")\nn = int(parts[0])\nbad = int(parts[1])\nsol = Solution()\nsol.isBadVersion = lambda v: v >= bad\nprint(sol.firstBadVersion(n))',
    },
  },
  {
    slug: "search-insert-position",
    title: "Search Insert Position",
    category: "binary-search",
    difficulty: "easy",
    description:
      "Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.\n\nYou must write an algorithm with `O(log n)` runtime complexity.",
    examples:
      "**Example 1:**\n```\nInput: nums = [1,3,5,6], target = 5\nOutput: 2\n```\n\n**Example 2:**\n```\nInput: nums = [1,3,5,6], target = 2\nOutput: 1\n```\n\n**Example 3:**\n```\nInput: nums = [1,3,5,6], target = 7\nOutput: 4\n```",
    constraints:
      "- `1 <= nums.length <= 10^4`\n- `-10^4 <= nums[i] <= 10^4`\n- `nums` contains distinct values sorted in ascending order.",
    starterCode: {
      java: "class Solution {\n    public int searchInsert(int[] nums, int target) {\n        // your code here\n    }\n}",
      kotlin: "class Solution {\n    fun searchInsert(nums: IntArray, target: Int): Int {\n        // your code here\n    }\n}",
      python:
        "class Solution:\n    def searchInsert(self, nums: list[int], target: int) -> int:\n        # your code here\n        pass",
    },
    testCases: [
      { input: "[1,3,5,6], 5", expected: "2", args: ["1,3,5,6;5"] },
      { input: "[1,3,5,6], 2", expected: "1", args: ["1,3,5,6;2"] },
      { input: "[1,3,5,6], 7", expected: "4", args: ["1,3,5,6;7"] },
      { input: "[1,3,5,6], 0", expected: "0", args: ["1,3,5,6;0"] },
    ],
    functionName: "searchInsert",
    invocation: {
      java: 'String[] parts = args[i].split(";");\nint[] nums = parseIntArray(parts[0]);\nint target = Integer.parseInt(parts[1]);\nint result = new Solution().searchInsert(nums, target);\nSystem.out.println(result);',
      kotlin: 'val parts = args[i].split(";")\nval nums = parts[0].split(",").map { it.trim().toInt() }.toIntArray()\nval target = parts[1].trim().toInt()\nval result = Solution().searchInsert(nums, target)\nprintln(result)',
      python: 'parts = args[i].split(";")\nnums = [int(x) for x in parts[0].split(",")]\ntarget = int(parts[1])\nresult = Solution().searchInsert(nums, target)\nprint(result)',
    },
  },

  // ==================== BFS ====================
  {
    slug: "flood-fill",
    title: "Flood Fill",
    category: "bfs",
    difficulty: "easy",
    description:
      'You are given an `m x n` integer grid `image` where `image[i][j]` represents the pixel value. You are also given three integers `sr`, `sc`, and `color`. Perform a **flood fill** on the image starting from pixel `image[sr][sc]`.\n\nTo perform a flood fill: start at the pixel, change its color to `color`, then recursively color any adjacent (up, down, left, right) pixel that has the same original color.',
    examples:
      "**Example 1:**\n```\nInput: image = [[1,1,1],[1,1,0],[1,0,1]], sr = 1, sc = 1, color = 2\nOutput: [[2,2,2],[2,2,0],[2,0,1]]\n```\n\n**Example 2:**\n```\nInput: image = [[0,0,0],[0,0,0]], sr = 0, sc = 0, color = 0\nOutput: [[0,0,0],[0,0,0]]\n```",
    constraints:
      "- `m == image.length`\n- `n == image[i].length`\n- `1 <= m, n <= 50`\n- `0 <= image[i][j], color < 2^16`",
    starterCode: {
      java: "class Solution {\n    public int[][] floodFill(int[][] image, int sr, int sc, int color) {\n        // your code here\n    }\n}",
      kotlin: "class Solution {\n    fun floodFill(image: Array<IntArray>, sr: Int, sc: Int, color: Int): Array<IntArray> {\n        // your code here\n    }\n}",
      python:
        "class Solution:\n    def floodFill(self, image: list[list[int]], sr: int, sc: int, color: int) -> list[list[int]]:\n        # your code here\n        pass",
    },
    testCases: [
      { input: "[[1,1,1],[1,1,0],[1,0,1]], 1, 1, 2", expected: "[[2, 2, 2], [2, 2, 0], [2, 0, 1]]", args: ["1,1,1|1,1,0|1,0,1;1;1;2"] },
      { input: "[[0,0,0],[0,0,0]], 0, 0, 0", expected: "[[0, 0, 0], [0, 0, 0]]", args: ["0,0,0|0,0,0;0;0;0"] },
    ],
    functionName: "floodFill",
    invocation: {
      java: 'String[] parts = args[i].split(";");\nString[] rows = parts[0].split("\\\\|");\nint[][] image = new int[rows.length][];\nfor (int r = 0; r < rows.length; r++) image[r] = parseIntArray(rows[r]);\nint sr = Integer.parseInt(parts[1]);\nint sc = Integer.parseInt(parts[2]);\nint color = Integer.parseInt(parts[3]);\nint[][] result = new Solution().floodFill(image, sr, sc, color);\nStringBuilder sb = new StringBuilder("[");\nfor (int r = 0; r < result.length; r++) {\n    if (r > 0) sb.append(", ");\n    sb.append(java.util.Arrays.toString(result[r]));\n}\nsb.append("]");\nSystem.out.println(sb);',
      kotlin: 'val parts = args[i].split(";")\nval rows = parts[0].split("|")\nval image = Array(rows.size) { r -> rows[r].split(",").map { it.trim().toInt() }.toIntArray() }\nval sr = parts[1].trim().toInt()\nval sc = parts[2].trim().toInt()\nval color = parts[3].trim().toInt()\nval result = Solution().floodFill(image, sr, sc, color)\nprintln(result.map { it.toList() })',
      python: 'parts = args[i].split(";")\nrows = parts[0].split("|")\nimage = [[int(x) for x in row.split(",")] for row in rows]\nsr = int(parts[1])\nsc = int(parts[2])\ncolor = int(parts[3])\nresult = Solution().floodFill(image, sr, sc, color)\nprint(result)',
    },
  },
  {
    slug: "number-of-islands",
    title: "Number of Islands",
    category: "bfs",
    difficulty: "easy",
    description:
      'Given an `m x n` 2D grid map of `\'1\'`s (land) and `\'0\'`s (water), return the number of islands.\n\nAn island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.',
    examples:
      '**Example 1:**\n```\nInput: grid = [\n  ["1","1","1","1","0"],\n  ["1","1","0","1","0"],\n  ["1","1","0","0","0"],\n  ["0","0","0","0","0"]\n]\nOutput: 1\n```\n\n**Example 2:**\n```\nInput: grid = [\n  ["1","1","0","0","0"],\n  ["1","1","0","0","0"],\n  ["0","0","1","0","0"],\n  ["0","0","0","1","1"]\n]\nOutput: 3\n```',
    constraints: "- `m == grid.length`\n- `n == grid[i].length`\n- `1 <= m, n <= 300`\n- `grid[i][j]` is `'0'` or `'1'`.",
    starterCode: {
      java: "class Solution {\n    public int numIslands(char[][] grid) {\n        // your code here\n    }\n}",
      kotlin: "class Solution {\n    fun numIslands(grid: Array<CharArray>): Int {\n        // your code here\n    }\n}",
      python:
        "class Solution:\n    def numIslands(self, grid: list[list[str]]) -> int:\n        # your code here\n        pass",
    },
    testCases: [
      { input: '[["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]', expected: "1", args: ["11110|11010|11000|00000"] },
      { input: '[["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]', expected: "3", args: ["11000|11000|00100|00011"] },
    ],
    functionName: "numIslands",
    invocation: {
      java: 'String[] rows = args[i].split("\\\\|");\nchar[][] grid = new char[rows.length][];\nfor (int r = 0; r < rows.length; r++) grid[r] = rows[r].toCharArray();\nint result = new Solution().numIslands(grid);\nSystem.out.println(result);',
      kotlin: 'val rows = args[i].split("|")\nval grid = Array(rows.size) { r -> rows[r].toCharArray() }\nval result = Solution().numIslands(grid)\nprintln(result)',
      python: 'rows = args[i].split("|")\ngrid = [list(row) for row in rows]\nresult = Solution().numIslands(grid)\nprint(result)',
    },
  },
  {
    slug: "rotting-oranges",
    title: "Rotting Oranges",
    category: "bfs",
    difficulty: "easy",
    description:
      "You are given an `m x n` grid where each cell can have one of three values:\n- `0` representing an empty cell,\n- `1` representing a fresh orange,\n- `2` representing a rotten orange.\n\nEvery minute, any fresh orange that is 4-directionally adjacent to a rotten orange becomes rotten.\n\nReturn the minimum number of minutes that must elapse until no cell has a fresh orange. If this is impossible, return `-1`.",
    examples:
      "**Example 1:**\n```\nInput: grid = [[2,1,1],[1,1,0],[0,1,1]]\nOutput: 4\n```\n\n**Example 2:**\n```\nInput: grid = [[2,1,1],[0,1,1],[1,0,1]]\nOutput: -1\n```\n\n**Example 3:**\n```\nInput: grid = [[0,2]]\nOutput: 0\n```",
    constraints:
      "- `m == grid.length`\n- `n == grid[i].length`\n- `1 <= m, n <= 10`\n- `grid[i][j]` is `0`, `1`, or `2`.",
    starterCode: {
      java: "class Solution {\n    public int orangesRotting(int[][] grid) {\n        // your code here\n    }\n}",
      kotlin: "class Solution {\n    fun orangesRotting(grid: Array<IntArray>): Int {\n        // your code here\n    }\n}",
      python:
        "class Solution:\n    def orangesRotting(self, grid: list[list[int]]) -> int:\n        # your code here\n        pass",
    },
    testCases: [
      { input: "[[2,1,1],[1,1,0],[0,1,1]]", expected: "4", args: ["2,1,1|1,1,0|0,1,1"] },
      { input: "[[2,1,1],[0,1,1],[1,0,1]]", expected: "-1", args: ["2,1,1|0,1,1|1,0,1"] },
      { input: "[[0,2]]", expected: "0", args: ["0,2"] },
    ],
    functionName: "orangesRotting",
    invocation: {
      java: 'String[] rows = args[i].split("\\\\|");\nint[][] grid = new int[rows.length][];\nfor (int r = 0; r < rows.length; r++) grid[r] = parseIntArray(rows[r]);\nint result = new Solution().orangesRotting(grid);\nSystem.out.println(result);',
      kotlin: 'val rows = args[i].split("|")\nval grid = Array(rows.size) { r -> rows[r].split(",").map { it.trim().toInt() }.toIntArray() }\nval result = Solution().orangesRotting(grid)\nprintln(result)',
      python: 'rows = args[i].split("|")\ngrid = [[int(x) for x in row.split(",")] for row in rows]\nresult = Solution().orangesRotting(grid)\nprint(result)',
    },
  },

  // ==================== DFS ====================
  {
    slug: "max-depth-binary-tree",
    title: "Maximum Depth of Binary Tree",
    category: "dfs",
    difficulty: "easy",
    description:
      "Given the `root` of a binary tree, return its maximum depth.\n\nA binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.",
    examples:
      "**Example 1:**\n```\nInput: root = [3,9,20,null,null,15,7]\nOutput: 3\n```\n\n**Example 2:**\n```\nInput: root = [1,null,2]\nOutput: 2\n```",
    constraints:
      "- The number of nodes in the tree is in the range `[0, 10^4]`.\n- `-100 <= Node.val <= 100`",
    starterCode: {
      java: "class Solution {\n    public int maxDepth(TreeNode root) {\n        // your code here\n    }\n}",
      kotlin: "class Solution {\n    fun maxDepth(root: TreeNode?): Int {\n        // your code here\n    }\n}",
      python:
        "class Solution:\n    def maxDepth(self, root) -> int:\n        # your code here\n        pass",
    },
    testCases: [
      { input: "[3,9,20,null,null,15,7]", expected: "3", args: ["3,9,20,null,null,15,7"] },
      { input: "[1,null,2]", expected: "2", args: ["1,null,2"] },
      { input: "[]", expected: "0", args: [""] },
    ],
    functionName: "maxDepth",
    invocation: {
      java: 'TreeNode root = buildTree(args[i]);\nint result = new Solution().maxDepth(root);\nSystem.out.println(result);',
      kotlin: 'val root = buildTree(args[i])\nval result = Solution().maxDepth(root)\nprintln(result)',
      python: 'root = build_tree(args[i])\nresult = Solution().maxDepth(root)\nprint(result)',
    },
  },
  {
    slug: "path-sum",
    title: "Path Sum",
    category: "dfs",
    difficulty: "easy",
    description:
      "Given the `root` of a binary tree and an integer `targetSum`, return `true` if the tree has a **root-to-leaf** path such that adding up all the values along the path equals `targetSum`.\n\nA **leaf** is a node with no children.",
    examples:
      "**Example 1:**\n```\nInput: root = [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22\nOutput: true\nExplanation: 5 + 4 + 11 + 2 = 22\n```\n\n**Example 2:**\n```\nInput: root = [1,2,3], targetSum = 5\nOutput: false\n```",
    constraints:
      "- The number of nodes in the tree is in the range `[0, 5000]`.\n- `-1000 <= Node.val <= 1000`\n- `-1000 <= targetSum <= 1000`",
    starterCode: {
      java: "class Solution {\n    public boolean hasPathSum(TreeNode root, int targetSum) {\n        // your code here\n    }\n}",
      kotlin: "class Solution {\n    fun hasPathSum(root: TreeNode?, targetSum: Int): Boolean {\n        // your code here\n    }\n}",
      python:
        "class Solution:\n    def hasPathSum(self, root, targetSum: int) -> bool:\n        # your code here\n        pass",
    },
    testCases: [
      { input: "[5,4,8,11,null,13,4,7,2,null,null,null,1], 22", expected: "true", args: ["5,4,8,11,null,13,4,7,2,null,null,null,1;22"] },
      { input: "[1,2,3], 5", expected: "false", args: ["1,2,3;5"] },
      { input: "[], 0", expected: "false", args: [";0"] },
    ],
    functionName: "hasPathSum",
    invocation: {
      java: 'String[] parts = args[i].split(";");\nTreeNode root = buildTree(parts[0]);\nint targetSum = Integer.parseInt(parts[1]);\nboolean result = new Solution().hasPathSum(root, targetSum);\nSystem.out.println(result);',
      kotlin: 'val parts = args[i].split(";")\nval root = buildTree(parts[0])\nval targetSum = parts[1].trim().toInt()\nval result = Solution().hasPathSum(root, targetSum)\nprintln(result)',
      python: 'parts = args[i].split(";")\nroot = build_tree(parts[0])\ntarget_sum = int(parts[1])\nresult = Solution().hasPathSum(root, target_sum)\nprint(str(result).lower())',
    },
  },
  {
    slug: "invert-binary-tree",
    title: "Invert Binary Tree",
    category: "dfs",
    difficulty: "easy",
    description:
      "Given the `root` of a binary tree, invert the tree, and return its root.\n\nInverting a binary tree means swapping every left node with its corresponding right node.",
    examples:
      "**Example 1:**\n```\nInput: root = [4,2,7,1,3,6,9]\nOutput: [4,7,2,9,6,3,1]\n```\n\n**Example 2:**\n```\nInput: root = [2,1,3]\nOutput: [2,3,1]\n```",
    constraints:
      "- The number of nodes in the tree is in the range `[0, 100]`.\n- `-100 <= Node.val <= 100`",
    starterCode: {
      java: "class Solution {\n    public TreeNode invertTree(TreeNode root) {\n        // your code here\n    }\n}",
      kotlin: "class Solution {\n    fun invertTree(root: TreeNode?): TreeNode? {\n        // your code here\n    }\n}",
      python:
        "class Solution:\n    def invertTree(self, root):\n        # your code here\n        pass",
    },
    testCases: [
      { input: "[4,2,7,1,3,6,9]", expected: "[4, 7, 2, 9, 6, 3, 1]", args: ["4,2,7,1,3,6,9"] },
      { input: "[2,1,3]", expected: "[2, 3, 1]", args: ["2,1,3"] },
      { input: "[]", expected: "[]", args: [""] },
    ],
    functionName: "invertTree",
    invocation: {
      java: 'TreeNode root = buildTree(args[i]);\nTreeNode result = new Solution().invertTree(root);\nSystem.out.println(serializeTree(result));',
      kotlin: 'val root = buildTree(args[i])\nval result = Solution().invertTree(root)\nprintln(serializeTree(result))',
      python: 'root = build_tree(args[i])\nresult = Solution().invertTree(root)\nprint(serialize_tree(result))',
    },
  },

  // ==================== STACK ====================
  {
    slug: "valid-parentheses",
    title: "Valid Parentheses",
    category: "stack",
    difficulty: "easy",
    description:
      "Given a string `s` containing just the characters `'('`, `')'`, `'{'`, `'}'`, `'['` and `']'`, determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n3. Every close bracket has a corresponding open bracket of the same type.",
    examples:
      '**Example 1:**\n```\nInput: s = "()"\nOutput: true\n```\n\n**Example 2:**\n```\nInput: s = "()[]{}"\nOutput: true\n```\n\n**Example 3:**\n```\nInput: s = "(]"\nOutput: false\n```',
    constraints:
      "- `1 <= s.length <= 10^4`\n- `s` consists of parentheses only `'()[]{}'`.",
    starterCode: {
      java: "class Solution {\n    public boolean isValid(String s) {\n        // your code here\n    }\n}",
      kotlin: "class Solution {\n    fun isValid(s: String): Boolean {\n        // your code here\n    }\n}",
      python:
        "class Solution:\n    def isValid(self, s: str) -> bool:\n        # your code here\n        pass",
    },
    testCases: [
      { input: '"()"', expected: "true", args: ["()"] },
      { input: '"()[]{}"', expected: "true", args: ["()[]{}"] },
      { input: '"(]"', expected: "false", args: ["(]"] },
      { input: '"([)]"', expected: "false", args: ["([)]"] },
    ],
    functionName: "isValid",
    invocation: {
      java: 'String s = args[i];\nboolean result = new Solution().isValid(s);\nSystem.out.println(result);',
      kotlin: 'val s = args[i]\nval result = Solution().isValid(s)\nprintln(result)',
      python: 's = args[i]\nresult = Solution().isValid(s)\nprint(str(result).lower())',
    },
  },
  {
    slug: "min-stack",
    title: "Min Stack",
    category: "stack",
    difficulty: "easy",
    description:
      'Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.\n\nImplement the `MinStack` class:\n- `MinStack()` initializes the stack object.\n- `void push(int val)` pushes element `val` onto the stack.\n- `void pop()` removes the element on the top of the stack.\n- `int top()` gets the top element of the stack.\n- `int getMin()` retrieves the minimum element in the stack.\n\nYou must implement a solution with `O(1)` time complexity for each function.\n\nThe test harness will execute a series of operations and compare outputs. Operations are encoded as: `push:val`, `pop`, `top`, `getMin`. Each operation\'s output is printed (push/pop print "null").',
    examples:
      '**Example 1:**\n```\nInput: ["push:-2","push:0","push:-3","getMin","pop","top","getMin"]\nOutput: [null,null,null,-3,null,0,-2]\n```',
    constraints:
      "- `-2^31 <= val <= 2^31 - 1`\n- Methods `pop`, `top` and `getMin` are always called on non-empty stacks.",
    starterCode: {
      java: "class MinStack {\n    public MinStack() {\n        // your code here\n    }\n\n    public void push(int val) {\n        // your code here\n    }\n\n    public void pop() {\n        // your code here\n    }\n\n    public int top() {\n        // your code here\n    }\n\n    public int getMin() {\n        // your code here\n    }\n}",
      kotlin: "class MinStack() {\n    fun push(v: Int) {\n        // your code here\n    }\n\n    fun pop() {\n        // your code here\n    }\n\n    fun top(): Int {\n        // your code here\n    }\n\n    fun getMin(): Int {\n        // your code here\n    }\n}",
      python:
        "class MinStack:\n    def __init__(self):\n        # your code here\n        pass\n\n    def push(self, val: int) -> None:\n        # your code here\n        pass\n\n    def pop(self) -> None:\n        # your code here\n        pass\n\n    def top(self) -> int:\n        # your code here\n        pass\n\n    def getMin(self) -> int:\n        # your code here\n        pass",
    },
    testCases: [
      { input: 'push:-2,push:0,push:-3,getMin,pop,top,getMin', expected: "null,null,null,-3,null,0,-2", args: ["push:-2,push:0,push:-3,getMin,pop,top,getMin"] },
      { input: 'push:1,push:2,top,getMin', expected: "null,null,2,1", args: ["push:1,push:2,top,getMin"] },
    ],
    functionName: "MinStack",
    invocation: {
      java: 'String[] ops = args[i].split(",");\nMinStack stack = new MinStack();\nStringBuilder sb = new StringBuilder();\nfor (String op : ops) {\n    if (sb.length() > 0) sb.append(",");\n    if (op.startsWith("push:")) {\n        stack.push(Integer.parseInt(op.substring(5)));\n        sb.append("null");\n    } else if (op.equals("pop")) {\n        stack.pop();\n        sb.append("null");\n    } else if (op.equals("top")) {\n        sb.append(stack.top());\n    } else if (op.equals("getMin")) {\n        sb.append(stack.getMin());\n    }\n}\nSystem.out.println(sb);',
      kotlin: 'val ops = args[i].split(",")\nval stack = MinStack()\nval sb = StringBuilder()\nfor (op in ops) {\n    if (sb.isNotEmpty()) sb.append(",")\n    when {\n        op.startsWith("push:") -> { stack.push(op.substringAfter(":").toInt()); sb.append("null") }\n        op == "pop" -> { stack.pop(); sb.append("null") }\n        op == "top" -> sb.append(stack.top())\n        op == "getMin" -> sb.append(stack.getMin())\n    }\n}\nprintln(sb)',
      python: 'ops = args[i].split(",")\nstack = MinStack()\nresults = []\nfor op in ops:\n    if op.startswith("push:"):\n        stack.push(int(op.split(":")[1]))\n        results.append("null")\n    elif op == "pop":\n        stack.pop()\n        results.append("null")\n    elif op == "top":\n        results.append(str(stack.top()))\n    elif op == "getMin":\n        results.append(str(stack.getMin()))\nprint(",".join(results))',
    },
  },
  {
    slug: "reverse-polish-notation",
    title: "Evaluate Reverse Polish Notation",
    category: "stack",
    difficulty: "easy",
    description:
      'You are given an array of strings `tokens` that represents an arithmetic expression in Reverse Polish Notation.\n\nEvaluate the expression. Return an integer that represents the value of the expression.\n\nValid operators are `+`, `-`, `*`, and `/`. Each operand may be an integer or another expression. Division between two integers should truncate toward zero.',
    examples:
      '**Example 1:**\n```\nInput: tokens = ["2","1","+","3","*"]\nOutput: 9\nExplanation: ((2 + 1) * 3) = 9\n```\n\n**Example 2:**\n```\nInput: tokens = ["4","13","5","/","+"]\nOutput: 6\n```',
    constraints:
      '- `1 <= tokens.length <= 10^4`\n- `tokens[i]` is either an operator: `"+"`, `"-"`, `"*"`, or `"/"`, or an integer.',
    starterCode: {
      java: 'class Solution {\n    public int evalRPN(String[] tokens) {\n        // your code here\n    }\n}',
      kotlin: "class Solution {\n    fun evalRPN(tokens: Array<String>): Int {\n        // your code here\n    }\n}",
      python:
        "class Solution:\n    def evalRPN(self, tokens: list[str]) -> int:\n        # your code here\n        pass",
    },
    testCases: [
      { input: '["2","1","+","3","*"]', expected: "9", args: ["2,1,+,3,*"] },
      { input: '["4","13","5","/","+"]', expected: "6", args: ["4,13,5,/,+"] },
      { input: '["10","6","9","3","+","-11","*","/","*","17","+","5","+"]', expected: "22", args: ["10,6,9,3,+,-11,*,/,*,17,+,5,+"] },
    ],
    functionName: "evalRPN",
    invocation: {
      java: 'String[] tokens = args[i].split(",");\nint result = new Solution().evalRPN(tokens);\nSystem.out.println(result);',
      kotlin: 'val tokens = args[i].split(",")\nval result = Solution().evalRPN(tokens.toTypedArray())\nprintln(result)',
      python: 'tokens = args[i].split(",")\nresult = Solution().evalRPN(tokens)\nprint(result)',
    },
  },

  // ==================== HASH MAP ====================
  {
    slug: "two-sum",
    title: "Two Sum",
    category: "hash-map",
    difficulty: "easy",
    description:
      "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have **exactly one solution**, and you may not use the same element twice.\n\nYou can return the answer in any order.",
    examples:
      "**Example 1:**\n```\nInput: nums = [2,7,11,15], target = 9\nOutput: [0,1]\n```\n\n**Example 2:**\n```\nInput: nums = [3,2,4], target = 6\nOutput: [1,2]\n```",
    constraints:
      "- `2 <= nums.length <= 10^4`\n- `-10^9 <= nums[i] <= 10^9`\n- Only one valid answer exists.",
    starterCode: {
      java: "class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // your code here\n    }\n}",
      kotlin: "class Solution {\n    fun twoSum(nums: IntArray, target: Int): IntArray {\n        // your code here\n    }\n}",
      python:
        "class Solution:\n    def twoSum(self, nums: list[int], target: int) -> list[int]:\n        # your code here\n        pass",
    },
    testCases: [
      { input: "[2,7,11,15], 9", expected: "[0, 1]", args: ["2,7,11,15;9"] },
      { input: "[3,2,4], 6", expected: "[1, 2]", args: ["3,2,4;6"] },
      { input: "[3,3], 6", expected: "[0, 1]", args: ["3,3;6"] },
    ],
    functionName: "twoSum",
    invocation: {
      java: 'String[] parts = args[i].split(";");\nint[] nums = parseIntArray(parts[0]);\nint target = Integer.parseInt(parts[1]);\nint[] result = new Solution().twoSum(nums, target);\njava.util.Arrays.sort(result);\nSystem.out.println(java.util.Arrays.toString(result));',
      kotlin: 'val parts = args[i].split(";")\nval nums = parts[0].split(",").map { it.trim().toInt() }.toIntArray()\nval target = parts[1].trim().toInt()\nval result = Solution().twoSum(nums, target)\nresult.sort()\nprintln(result.toList())',
      python: 'parts = args[i].split(";")\nnums = [int(x) for x in parts[0].split(",")]\ntarget = int(parts[1])\nresult = Solution().twoSum(nums, target)\nprint(sorted(result))',
    },
  },
  {
    slug: "valid-anagram",
    title: "Valid Anagram",
    category: "hash-map",
    difficulty: "easy",
    description:
      "Given two strings `s` and `t`, return `true` if `t` is an anagram of `s`, and `false` otherwise.\n\nAn **Anagram** is a word or phrase formed by rearranging the letters of a different word or phrase, using all the original letters exactly once.",
    examples:
      '**Example 1:**\n```\nInput: s = "anagram", t = "nagaram"\nOutput: true\n```\n\n**Example 2:**\n```\nInput: s = "rat", t = "car"\nOutput: false\n```',
    constraints:
      "- `1 <= s.length, t.length <= 5 * 10^4`\n- `s` and `t` consist of lowercase English letters.",
    starterCode: {
      java: "class Solution {\n    public boolean isAnagram(String s, String t) {\n        // your code here\n    }\n}",
      kotlin: "class Solution {\n    fun isAnagram(s: String, t: String): Boolean {\n        // your code here\n    }\n}",
      python:
        "class Solution:\n    def isAnagram(self, s: str, t: str) -> bool:\n        # your code here\n        pass",
    },
    testCases: [
      { input: '"anagram", "nagaram"', expected: "true", args: ["anagram;nagaram"] },
      { input: '"rat", "car"', expected: "false", args: ["rat;car"] },
      { input: '"a", "a"', expected: "true", args: ["a;a"] },
    ],
    functionName: "isAnagram",
    invocation: {
      java: 'String[] parts = args[i].split(";");\nboolean result = new Solution().isAnagram(parts[0], parts[1]);\nSystem.out.println(result);',
      kotlin: 'val parts = args[i].split(";")\nval result = Solution().isAnagram(parts[0], parts[1])\nprintln(result)',
      python: 'parts = args[i].split(";")\nresult = Solution().isAnagram(parts[0], parts[1])\nprint(str(result).lower())',
    },
  },
  {
    slug: "group-anagrams",
    title: "Group Anagrams",
    category: "hash-map",
    difficulty: "easy",
    description:
      'Given an array of strings `strs`, group the anagrams together. You can return the answer in **any order**.\n\nAn Anagram is a word formed by rearranging the letters of another word, using all the original letters exactly once.\n\nReturn the number of groups (for simpler output comparison).',
    examples:
      '**Example 1:**\n```\nInput: strs = ["eat","tea","tan","ate","nat","bat"]\nOutput: 3\nExplanation: Groups: ["eat","tea","ate"], ["tan","nat"], ["bat"]\n```\n\n**Example 2:**\n```\nInput: strs = [""]\nOutput: 1\n```',
    constraints:
      "- `1 <= strs.length <= 10^4`\n- `0 <= strs[i].length <= 100`\n- `strs[i]` consists of lowercase English letters.",
    starterCode: {
      java: "class Solution {\n    public List<List<String>> groupAnagrams(String[] strs) {\n        // your code here\n    }\n}",
      kotlin: "class Solution {\n    fun groupAnagrams(strs: Array<String>): List<List<String>> {\n        // your code here\n    }\n}",
      python:
        "class Solution:\n    def groupAnagrams(self, strs: list[str]) -> list[list[str]]:\n        # your code here\n        pass",
    },
    testCases: [
      { input: '["eat","tea","tan","ate","nat","bat"]', expected: "3", args: ["eat,tea,tan,ate,nat,bat"] },
      { input: '[""]', expected: "1", args: [""] },
      { input: '["a"]', expected: "1", args: ["a"] },
    ],
    functionName: "groupAnagrams",
    invocation: {
      java: 'String[] strs = args[i].split(",");\nif (args[i].isEmpty()) strs = new String[]{""};\njava.util.List<java.util.List<String>> result = new Solution().groupAnagrams(strs);\nSystem.out.println(result.size());',
      kotlin: 'val strs = if (args[i].isEmpty()) arrayOf("") else args[i].split(",").toTypedArray()\nval result = Solution().groupAnagrams(strs)\nprintln(result.size)',
      python: 'strs = args[i].split(",") if args[i] else [""]\nresult = Solution().groupAnagrams(strs)\nprint(len(result))',
    },
  },

  // ==================== LINKED LIST ====================
  {
    slug: "reverse-linked-list",
    title: "Reverse Linked List",
    category: "linked-list",
    difficulty: "easy",
    description:
      "Given the `head` of a singly linked list, reverse the list, and return the reversed list.",
    examples:
      "**Example 1:**\n```\nInput: head = [1,2,3,4,5]\nOutput: [5,4,3,2,1]\n```\n\n**Example 2:**\n```\nInput: head = [1,2]\nOutput: [2,1]\n```",
    constraints:
      "- The number of nodes in the list is the range `[0, 5000]`.\n- `-5000 <= Node.val <= 5000`",
    starterCode: {
      java: "class Solution {\n    public ListNode reverseList(ListNode head) {\n        // your code here\n    }\n}",
      kotlin: "class Solution {\n    fun reverseList(head: ListNode?): ListNode? {\n        // your code here\n    }\n}",
      python:
        "class Solution:\n    def reverseList(self, head):\n        # your code here\n        pass",
    },
    testCases: [
      { input: "[1,2,3,4,5]", expected: "[5, 4, 3, 2, 1]", args: ["1,2,3,4,5"] },
      { input: "[1,2]", expected: "[2, 1]", args: ["1,2"] },
      { input: "[]", expected: "[]", args: [""] },
    ],
    functionName: "reverseList",
    invocation: {
      java: 'ListNode head = buildList(args[i]);\nListNode result = new Solution().reverseList(head);\nSystem.out.println(serializeList(result));',
      kotlin: 'val head = buildList(args[i])\nval result = Solution().reverseList(head)\nprintln(serializeList(result))',
      python: 'head = build_list(args[i])\nresult = Solution().reverseList(head)\nprint(serialize_list(result))',
    },
  },
  {
    slug: "merge-two-sorted-lists",
    title: "Merge Two Sorted Lists",
    category: "linked-list",
    difficulty: "easy",
    description:
      "You are given the heads of two sorted linked lists `list1` and `list2`.\n\nMerge the two lists into one **sorted** list. The list should be made by splicing together the nodes of the first two lists.\n\nReturn the head of the merged linked list.",
    examples:
      "**Example 1:**\n```\nInput: list1 = [1,2,4], list2 = [1,3,4]\nOutput: [1,1,2,3,4,4]\n```\n\n**Example 2:**\n```\nInput: list1 = [], list2 = []\nOutput: []\n```",
    constraints:
      "- The number of nodes in both lists is in the range `[0, 50]`.\n- `-100 <= Node.val <= 100`\n- Both lists are sorted in non-decreasing order.",
    starterCode: {
      java: "class Solution {\n    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {\n        // your code here\n    }\n}",
      kotlin: "class Solution {\n    fun mergeTwoLists(list1: ListNode?, list2: ListNode?): ListNode? {\n        // your code here\n    }\n}",
      python:
        "class Solution:\n    def mergeTwoLists(self, list1, list2):\n        # your code here\n        pass",
    },
    testCases: [
      { input: "[1,2,4], [1,3,4]", expected: "[1, 1, 2, 3, 4, 4]", args: ["1,2,4;1,3,4"] },
      { input: "[], []", expected: "[]", args: [";"] },
      { input: "[], [0]", expected: "[0]", args: [";0"] },
    ],
    functionName: "mergeTwoLists",
    invocation: {
      java: 'String[] parts = args[i].split(";", -1);\nListNode list1 = buildList(parts[0]);\nListNode list2 = buildList(parts[1]);\nListNode result = new Solution().mergeTwoLists(list1, list2);\nSystem.out.println(serializeList(result));',
      kotlin: 'val parts = args[i].split(";")\nval list1 = buildList(parts[0])\nval list2 = buildList(if (parts.size > 1) parts[1] else "")\nval result = Solution().mergeTwoLists(list1, list2)\nprintln(serializeList(result))',
      python: 'parts = args[i].split(";")\nlist1 = build_list(parts[0])\nlist2 = build_list(parts[1] if len(parts) > 1 else "")\nresult = Solution().mergeTwoLists(list1, list2)\nprint(serialize_list(result))',
    },
  },
  {
    slug: "linked-list-cycle",
    title: "Linked List Cycle",
    category: "linked-list",
    difficulty: "easy",
    description:
      "Given `head`, the head of a linked list, determine if the linked list has a cycle in it.\n\nThere is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the `next` pointer.\n\nReturn `true` if there is a cycle in the linked list. Otherwise, return `false`.\n\nInput format: a list of values followed by the position (0-indexed) where the tail connects to. `-1` means no cycle.",
    examples:
      "**Example 1:**\n```\nInput: head = [3,2,0,-4], pos = 1\nOutput: true\nExplanation: Tail connects to node at index 1.\n```\n\n**Example 2:**\n```\nInput: head = [1,2], pos = 0\nOutput: true\n```\n\n**Example 3:**\n```\nInput: head = [1], pos = -1\nOutput: false\n```",
    constraints:
      "- The number of nodes in the list is in the range `[0, 10^4]`.\n- `-10^5 <= Node.val <= 10^5`\n- `pos` is `-1` or a valid index in the linked-list.",
    starterCode: {
      java: "class Solution {\n    public boolean hasCycle(ListNode head) {\n        // your code here\n    }\n}",
      kotlin: "class Solution {\n    fun hasCycle(head: ListNode?): Boolean {\n        // your code here\n    }\n}",
      python:
        "class Solution:\n    def hasCycle(self, head) -> bool:\n        # your code here\n        pass",
    },
    testCases: [
      { input: "[3,2,0,-4], pos = 1", expected: "true", args: ["3,2,0,-4;1"] },
      { input: "[1,2], pos = 0", expected: "true", args: ["1,2;0"] },
      { input: "[1], pos = -1", expected: "false", args: ["1;-1"] },
    ],
    functionName: "hasCycle",
    invocation: {
      java: 'String[] parts = args[i].split(";");\nListNode head = buildCyclicList(parts[0], Integer.parseInt(parts[1]));\nboolean result = new Solution().hasCycle(head);\nSystem.out.println(result);',
      kotlin: 'val parts = args[i].split(";")\nval head = buildCyclicList(parts[0], parts[1].trim().toInt())\nval result = Solution().hasCycle(head)\nprintln(result)',
      python: 'parts = args[i].split(";")\nhead = build_cyclic_list(parts[0], int(parts[1]))\nresult = Solution().hasCycle(head)\nprint(str(result).lower())',
    },
  },
];

export function getProblemBySlug(slug: string): Problem | undefined {
  return problems.find((p) => p.slug === slug);
}

export function getProblemsByCategory(category: string): Problem[] {
  return problems.filter((p) => p.category === category);
}
