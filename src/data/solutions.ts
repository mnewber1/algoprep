export interface Solution {
  approach: string;
  timeComplexity: string;
  spaceComplexity: string;
  code: {
    python: string;
    java: string;
    kotlin: string;
  };
}

const solutions: Record<string, Solution> = {
  // ==================== TWO POINTERS ====================

  "valid-palindrome": {
    approach:
      "Use two pointers starting at both ends. Skip non-alphanumeric characters and compare lowercase versions. If all pairs match, it's a palindrome.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    code: {
      python: `class Solution:
    def isPalindrome(self, s: str) -> bool:
        left, right = 0, len(s) - 1

        while left < right:
            # Skip non-alphanumeric from left
            while left < right and not s[left].isalnum():
                left += 1
            # Skip non-alphanumeric from right
            while left < right and not s[right].isalnum():
                right -= 1

            # Compare lowercase characters
            if s[left].lower() != s[right].lower():
                return False

            left += 1
            right -= 1

        return True`,
      java: `class Solution {
    public boolean isPalindrome(String s) {
        int left = 0, right = s.length() - 1;

        while (left < right) {
            while (left < right && !Character.isLetterOrDigit(s.charAt(left)))
                left++;
            while (left < right && !Character.isLetterOrDigit(s.charAt(right)))
                right--;

            if (Character.toLowerCase(s.charAt(left)) != Character.toLowerCase(s.charAt(right)))
                return false;

            left++;
            right--;
        }
        return true;
    }
}`,
      kotlin: `class Solution {
    fun isPalindrome(s: String): Boolean {
        var left = 0
        var right = s.length - 1

        while (left < right) {
            while (left < right && !s[left].isLetterOrDigit()) left++
            while (left < right && !s[right].isLetterOrDigit()) right--

            if (s[left].lowercaseChar() != s[right].lowercaseChar())
                return false

            left++
            right--
        }
        return true
    }
}`,
    },
  },

  "two-sum-ii": {
    approach:
      "Since the array is sorted, use two pointers at both ends. If the sum is too small, move the left pointer right. If too large, move the right pointer left. This narrows down to the answer in O(n).",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    code: {
      python: `class Solution:
    def twoSum(self, numbers: list[int], target: int) -> list[int]:
        left, right = 0, len(numbers) - 1

        while left < right:
            current_sum = numbers[left] + numbers[right]

            if current_sum == target:
                return [left + 1, right + 1]  # 1-indexed
            elif current_sum < target:
                left += 1    # need bigger sum
            else:
                right -= 1   # need smaller sum

        return []`,
      java: `class Solution {
    public int[] twoSum(int[] numbers, int target) {
        int left = 0, right = numbers.length - 1;

        while (left < right) {
            int sum = numbers[left] + numbers[right];
            if (sum == target)
                return new int[]{left + 1, right + 1};
            else if (sum < target)
                left++;
            else
                right--;
        }
        return new int[]{};
    }
}`,
      kotlin: `class Solution {
    fun twoSum(numbers: IntArray, target: Int): IntArray {
        var left = 0
        var right = numbers.size - 1

        while (left < right) {
            val sum = numbers[left] + numbers[right]
            when {
                sum == target -> return intArrayOf(left + 1, right + 1)
                sum < target -> left++
                else -> right--
            }
        }
        return intArrayOf()
    }
}`,
    },
  },

  "remove-duplicates": {
    approach:
      "Use a slow pointer to track the position for the next unique element, and a fast pointer to scan through the array. When a new unique value is found, place it at the slow pointer's position.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    code: {
      python: `class Solution:
    def removeDuplicates(self, nums: list[int]) -> int:
        if not nums:
            return 0

        slow = 0  # position of last unique element

        for fast in range(1, len(nums)):
            if nums[fast] != nums[slow]:
                slow += 1
                nums[slow] = nums[fast]  # place new unique value

        return slow + 1  # length of unique portion`,
      java: `class Solution {
    public int removeDuplicates(int[] nums) {
        if (nums.length == 0) return 0;

        int slow = 0;
        for (int fast = 1; fast < nums.length; fast++) {
            if (nums[fast] != nums[slow]) {
                slow++;
                nums[slow] = nums[fast];
            }
        }
        return slow + 1;
    }
}`,
      kotlin: `class Solution {
    fun removeDuplicates(nums: IntArray): Int {
        if (nums.isEmpty()) return 0

        var slow = 0
        for (fast in 1 until nums.size) {
            if (nums[fast] != nums[slow]) {
                slow++
                nums[slow] = nums[fast]
            }
        }
        return slow + 1
    }
}`,
    },
  },

  // ==================== SLIDING WINDOW ====================

  "max-sum-subarray-k": {
    approach:
      "Build the initial window sum of size k. Then slide: add the new right element, subtract the element leaving the window. Track the maximum sum seen.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    code: {
      python: `class Solution:
    def maxSumSubarray(self, nums: list[int], k: int) -> int:
        # Build first window
        window_sum = sum(nums[:k])
        best = window_sum

        # Slide the window
        for i in range(k, len(nums)):
            window_sum += nums[i] - nums[i - k]
            best = max(best, window_sum)

        return best`,
      java: `class Solution {
    public int maxSumSubarray(int[] nums, int k) {
        int windowSum = 0;
        for (int i = 0; i < k; i++) windowSum += nums[i];
        int best = windowSum;

        for (int i = k; i < nums.length; i++) {
            windowSum += nums[i] - nums[i - k];
            best = Math.max(best, windowSum);
        }
        return best;
    }
}`,
      kotlin: `class Solution {
    fun maxSumSubarray(nums: IntArray, k: Int): Int {
        var windowSum = nums.take(k).sum()
        var best = windowSum

        for (i in k until nums.size) {
            windowSum += nums[i] - nums[i - k]
            best = maxOf(best, windowSum)
        }
        return best
    }
}`,
    },
  },

  "longest-substring-without-repeating": {
    approach:
      "Use a sliding window with a set to track characters in the current window. Expand right to include new characters. When a duplicate is found, shrink from the left until the duplicate is removed.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(min(n, alphabet))",
    code: {
      python: `class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        seen = set()
        left = 0
        best = 0

        for right in range(len(s)):
            # Shrink window until no duplicate
            while s[right] in seen:
                seen.remove(s[left])
                left += 1

            seen.add(s[right])
            best = max(best, right - left + 1)

        return best`,
      java: `class Solution {
    public int lengthOfLongestSubstring(String s) {
        Set<Character> seen = new HashSet<>();
        int left = 0, best = 0;

        for (int right = 0; right < s.length(); right++) {
            while (seen.contains(s.charAt(right))) {
                seen.remove(s.charAt(left));
                left++;
            }
            seen.add(s.charAt(right));
            best = Math.max(best, right - left + 1);
        }
        return best;
    }
}`,
      kotlin: `class Solution {
    fun lengthOfLongestSubstring(s: String): Int {
        val seen = mutableSetOf<Char>()
        var left = 0
        var best = 0

        for (right in s.indices) {
            while (s[right] in seen) {
                seen.remove(s[left])
                left++
            }
            seen.add(s[right])
            best = maxOf(best, right - left + 1)
        }
        return best
    }
}`,
    },
  },

  "contains-duplicate-ii": {
    approach:
      "Use a sliding window of size k with a set. As the window slides, add the new element and remove the oldest. If the new element is already in the set, we found a duplicate within distance k.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(k)",
    code: {
      python: `class Solution:
    def containsNearbyDuplicate(self, nums: list[int], k: int) -> bool:
        window = set()

        for i, num in enumerate(nums):
            if num in window:
                return True

            window.add(num)

            # Keep window size at most k
            if len(window) > k:
                window.remove(nums[i - k])

        return False`,
      java: `class Solution {
    public boolean containsNearbyDuplicate(int[] nums, int k) {
        Set<Integer> window = new HashSet<>();

        for (int i = 0; i < nums.length; i++) {
            if (window.contains(nums[i])) return true;
            window.add(nums[i]);
            if (window.size() > k)
                window.remove(nums[i - k]);
        }
        return false;
    }
}`,
      kotlin: `class Solution {
    fun containsNearbyDuplicate(nums: IntArray, k: Int): Boolean {
        val window = mutableSetOf<Int>()

        for (i in nums.indices) {
            if (nums[i] in window) return true
            window.add(nums[i])
            if (window.size > k)
                window.remove(nums[i - k])
        }
        return false
    }
}`,
    },
  },

  // ==================== BINARY SEARCH ====================

  "binary-search": {
    approach:
      "Classic binary search. Maintain low and high bounds, compute mid, compare with target. Eliminate half the search space each step.",
    timeComplexity: "O(log n)",
    spaceComplexity: "O(1)",
    code: {
      python: `class Solution:
    def search(self, nums: list[int], target: int) -> int:
        low, high = 0, len(nums) - 1

        while low <= high:
            mid = (low + high) // 2

            if nums[mid] == target:
                return mid
            elif nums[mid] < target:
                low = mid + 1   # search right half
            else:
                high = mid - 1  # search left half

        return -1  # not found`,
      java: `class Solution {
    public int search(int[] nums, int target) {
        int low = 0, high = nums.length - 1;

        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] == target) return mid;
            else if (nums[mid] < target) low = mid + 1;
            else high = mid - 1;
        }
        return -1;
    }
}`,
      kotlin: `class Solution {
    fun search(nums: IntArray, target: Int): Int {
        var low = 0
        var high = nums.size - 1

        while (low <= high) {
            val mid = low + (high - low) / 2
            when {
                nums[mid] == target -> return mid
                nums[mid] < target -> low = mid + 1
                else -> high = mid - 1
            }
        }
        return -1
    }
}`,
    },
  },

  "first-bad-version": {
    approach:
      "Binary search for the boundary between good and bad versions. Use low < high (not <=) and set high = mid when bad, low = mid + 1 when good. Converges to the first bad version.",
    timeComplexity: "O(log n)",
    spaceComplexity: "O(1)",
    code: {
      python: `class Solution:
    def firstBadVersion(self, n: int) -> int:
        low, high = 1, n

        while low < high:
            mid = (low + high) // 2

            if isBadVersion(mid):
                high = mid      # mid might be the first bad
            else:
                low = mid + 1   # first bad is after mid

        return low  # low == high == first bad version`,
      java: `class Solution {
    public int firstBadVersion(int n) {
        int low = 1, high = n;

        while (low < high) {
            int mid = low + (high - low) / 2;
            if (isBadVersion(mid))
                high = mid;
            else
                low = mid + 1;
        }
        return low;
    }
}`,
      kotlin: `class Solution {
    fun firstBadVersion(n: Int): Int {
        var low = 1
        var high = n

        while (low < high) {
            val mid = low + (high - low) / 2
            if (isBadVersion(mid))
                high = mid
            else
                low = mid + 1
        }
        return low
    }
}`,
    },
  },

  "search-insert-position": {
    approach:
      "Binary search variant. If found, return the index. If not, low will be at the position where the target should be inserted to keep the array sorted.",
    timeComplexity: "O(log n)",
    spaceComplexity: "O(1)",
    code: {
      python: `class Solution:
    def searchInsert(self, nums: list[int], target: int) -> int:
        low, high = 0, len(nums) - 1

        while low <= high:
            mid = (low + high) // 2

            if nums[mid] == target:
                return mid
            elif nums[mid] < target:
                low = mid + 1
            else:
                high = mid - 1

        return low  # insertion point`,
      java: `class Solution {
    public int searchInsert(int[] nums, int target) {
        int low = 0, high = nums.length - 1;

        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] == target) return mid;
            else if (nums[mid] < target) low = mid + 1;
            else high = mid - 1;
        }
        return low;
    }
}`,
      kotlin: `class Solution {
    fun searchInsert(nums: IntArray, target: Int): Int {
        var low = 0
        var high = nums.size - 1

        while (low <= high) {
            val mid = low + (high - low) / 2
            when {
                nums[mid] == target -> return mid
                nums[mid] < target -> low = mid + 1
                else -> high = mid - 1
            }
        }
        return low
    }
}`,
    },
  },

  // ==================== BFS ====================

  "flood-fill": {
    approach:
      "BFS from the starting pixel. Add it to a queue, then process each pixel: change its color and enqueue all same-colored neighbors. Use a visited set or check against the original color to avoid revisiting.",
    timeComplexity: "O(rows * cols)",
    spaceComplexity: "O(rows * cols)",
    code: {
      python: `class Solution:
    def floodFill(self, image: list[list[int]], sr: int, sc: int, color: int) -> list[list[int]]:
        original = image[sr][sc]
        if original == color:
            return image  # nothing to do

        rows, cols = len(image), len(image[0])
        queue = [(sr, sc)]
        image[sr][sc] = color

        while queue:
            r, c = queue.pop(0)

            for dr, dc in [(0,1), (0,-1), (1,0), (-1,0)]:
                nr, nc = r + dr, c + dc
                if (0 <= nr < rows and 0 <= nc < cols
                        and image[nr][nc] == original):
                    image[nr][nc] = color
                    queue.append((nr, nc))

        return image`,
      java: `class Solution {
    public int[][] floodFill(int[][] image, int sr, int sc, int color) {
        int original = image[sr][sc];
        if (original == color) return image;

        int rows = image.length, cols = image[0].length;
        Queue<int[]> queue = new LinkedList<>();
        queue.add(new int[]{sr, sc});
        image[sr][sc] = color;

        int[][] dirs = {{0,1},{0,-1},{1,0},{-1,0}};
        while (!queue.isEmpty()) {
            int[] cell = queue.poll();
            for (int[] d : dirs) {
                int nr = cell[0]+d[0], nc = cell[1]+d[1];
                if (nr >= 0 && nr < rows && nc >= 0 && nc < cols
                        && image[nr][nc] == original) {
                    image[nr][nc] = color;
                    queue.add(new int[]{nr, nc});
                }
            }
        }
        return image;
    }
}`,
      kotlin: `class Solution {
    fun floodFill(image: Array<IntArray>, sr: Int, sc: Int, color: Int): Array<IntArray> {
        val original = image[sr][sc]
        if (original == color) return image

        val rows = image.size
        val cols = image[0].size
        val queue = ArrayDeque<Pair<Int, Int>>()
        queue.add(sr to sc)
        image[sr][sc] = color

        val dirs = arrayOf(0 to 1, 0 to -1, 1 to 0, -1 to 0)
        while (queue.isNotEmpty()) {
            val (r, c) = queue.removeFirst()
            for ((dr, dc) in dirs) {
                val nr = r + dr; val nc = c + dc
                if (nr in 0 until rows && nc in 0 until cols
                        && image[nr][nc] == original) {
                    image[nr][nc] = color
                    queue.add(nr to nc)
                }
            }
        }
        return image
    }
}`,
    },
  },

  "number-of-islands": {
    approach:
      "Scan the grid for '1's. Each time you find one, increment the island count and BFS/DFS to mark all connected '1's as visited (set to '0'). This ensures each island is counted exactly once.",
    timeComplexity: "O(rows * cols)",
    spaceComplexity: "O(rows * cols)",
    code: {
      python: `class Solution:
    def numIslands(self, grid: list[list[str]]) -> int:
        if not grid:
            return 0

        rows, cols = len(grid), len(grid[0])
        count = 0

        def bfs(r, c):
            queue = [(r, c)]
            grid[r][c] = '0'  # mark visited
            while queue:
                cr, cc = queue.pop(0)
                for dr, dc in [(0,1),(0,-1),(1,0),(-1,0)]:
                    nr, nc = cr+dr, cc+dc
                    if (0 <= nr < rows and 0 <= nc < cols
                            and grid[nr][nc] == '1'):
                        grid[nr][nc] = '0'
                        queue.append((nr, nc))

        for r in range(rows):
            for c in range(cols):
                if grid[r][c] == '1':
                    count += 1
                    bfs(r, c)

        return count`,
      java: `class Solution {
    public int numIslands(char[][] grid) {
        int count = 0;
        int rows = grid.length, cols = grid[0].length;

        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                if (grid[r][c] == '1') {
                    count++;
                    // BFS to mark entire island
                    Queue<int[]> queue = new LinkedList<>();
                    queue.add(new int[]{r, c});
                    grid[r][c] = '0';
                    while (!queue.isEmpty()) {
                        int[] cell = queue.poll();
                        for (int[] d : new int[][]{{0,1},{0,-1},{1,0},{-1,0}}) {
                            int nr = cell[0]+d[0], nc = cell[1]+d[1];
                            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] == '1') {
                                grid[nr][nc] = '0';
                                queue.add(new int[]{nr, nc});
                            }
                        }
                    }
                }
            }
        }
        return count;
    }
}`,
      kotlin: `class Solution {
    fun numIslands(grid: Array<CharArray>): Int {
        val rows = grid.size; val cols = grid[0].size
        var count = 0

        fun bfs(r: Int, c: Int) {
            val queue = ArrayDeque<Pair<Int, Int>>()
            queue.add(r to c); grid[r][c] = '0'
            while (queue.isNotEmpty()) {
                val (cr, cc) = queue.removeFirst()
                for ((dr, dc) in arrayOf(0 to 1, 0 to -1, 1 to 0, -1 to 0)) {
                    val nr = cr+dr; val nc = cc+dc
                    if (nr in 0 until rows && nc in 0 until cols && grid[nr][nc] == '1') {
                        grid[nr][nc] = '0'; queue.add(nr to nc)
                    }
                }
            }
        }

        for (r in 0 until rows)
            for (c in 0 until cols)
                if (grid[r][c] == '1') { count++; bfs(r, c) }
        return count
    }
}`,
    },
  },

  "rotting-oranges": {
    approach:
      "Multi-source BFS. Start by enqueuing all rotten oranges. Each minute (BFS level), rot all adjacent fresh oranges. Track minutes elapsed. At the end, check if any fresh oranges remain.",
    timeComplexity: "O(rows * cols)",
    spaceComplexity: "O(rows * cols)",
    code: {
      python: `class Solution:
    def orangesRotting(self, grid: list[list[int]]) -> int:
        rows, cols = len(grid), len(grid[0])
        queue = []
        fresh = 0

        # Find all rotten oranges and count fresh
        for r in range(rows):
            for c in range(cols):
                if grid[r][c] == 2:
                    queue.append((r, c))
                elif grid[r][c] == 1:
                    fresh += 1

        if fresh == 0:
            return 0

        minutes = 0
        while queue and fresh > 0:
            minutes += 1
            next_queue = []
            for r, c in queue:
                for dr, dc in [(0,1),(0,-1),(1,0),(-1,0)]:
                    nr, nc = r+dr, c+dc
                    if (0 <= nr < rows and 0 <= nc < cols
                            and grid[nr][nc] == 1):
                        grid[nr][nc] = 2
                        fresh -= 1
                        next_queue.append((nr, nc))
            queue = next_queue

        return minutes if fresh == 0 else -1`,
      java: `class Solution {
    public int orangesRotting(int[][] grid) {
        int rows = grid.length, cols = grid[0].length;
        Queue<int[]> queue = new LinkedList<>();
        int fresh = 0;

        for (int r = 0; r < rows; r++)
            for (int c = 0; c < cols; c++) {
                if (grid[r][c] == 2) queue.add(new int[]{r, c});
                else if (grid[r][c] == 1) fresh++;
            }

        if (fresh == 0) return 0;
        int minutes = 0;

        while (!queue.isEmpty() && fresh > 0) {
            minutes++;
            int size = queue.size();
            for (int i = 0; i < size; i++) {
                int[] cell = queue.poll();
                for (int[] d : new int[][]{{0,1},{0,-1},{1,0},{-1,0}}) {
                    int nr = cell[0]+d[0], nc = cell[1]+d[1];
                    if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] == 1) {
                        grid[nr][nc] = 2;
                        fresh--;
                        queue.add(new int[]{nr, nc});
                    }
                }
            }
        }
        return fresh == 0 ? minutes : -1;
    }
}`,
      kotlin: `class Solution {
    fun orangesRotting(grid: Array<IntArray>): Int {
        val rows = grid.size; val cols = grid[0].size
        val queue = ArrayDeque<Pair<Int, Int>>()
        var fresh = 0

        for (r in 0 until rows)
            for (c in 0 until cols)
                when (grid[r][c]) {
                    2 -> queue.add(r to c)
                    1 -> fresh++
                }

        if (fresh == 0) return 0
        var minutes = 0

        while (queue.isNotEmpty() && fresh > 0) {
            minutes++
            repeat(queue.size) {
                val (r, c) = queue.removeFirst()
                for ((dr, dc) in arrayOf(0 to 1, 0 to -1, 1 to 0, -1 to 0)) {
                    val nr = r+dr; val nc = c+dc
                    if (nr in 0 until rows && nc in 0 until cols && grid[nr][nc] == 1) {
                        grid[nr][nc] = 2; fresh--; queue.add(nr to nc)
                    }
                }
            }
        }
        return if (fresh == 0) minutes else -1
    }
}`,
    },
  },

  // ==================== DFS ====================

  "max-depth-binary-tree": {
    approach:
      "Recursively compute the depth of left and right subtrees. The depth of the current node is 1 + max(left, right). Base case: null node has depth 0.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(h) — recursion stack, h = height",
    code: {
      python: `class Solution:
    def maxDepth(self, root) -> int:
        if not root:
            return 0

        left = self.maxDepth(root.left)
        right = self.maxDepth(root.right)

        return 1 + max(left, right)`,
      java: `class Solution {
    public int maxDepth(TreeNode root) {
        if (root == null) return 0;
        return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
    }
}`,
      kotlin: `class Solution {
    fun maxDepth(root: TreeNode?): Int {
        if (root == null) return 0
        return 1 + maxOf(maxDepth(root.left), maxDepth(root.right))
    }
}`,
    },
  },

  "path-sum": {
    approach:
      "DFS from root, subtracting each node's value from the target. At a leaf node, check if the remaining target equals the leaf's value. If so, a valid path exists.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(h)",
    code: {
      python: `class Solution:
    def hasPathSum(self, root, targetSum: int) -> bool:
        if not root:
            return False

        # Leaf node — check if remaining sum matches
        if not root.left and not root.right:
            return root.val == targetSum

        # Recurse with reduced target
        remaining = targetSum - root.val
        return (self.hasPathSum(root.left, remaining)
                or self.hasPathSum(root.right, remaining))`,
      java: `class Solution {
    public boolean hasPathSum(TreeNode root, int targetSum) {
        if (root == null) return false;
        if (root.left == null && root.right == null)
            return root.val == targetSum;

        int remaining = targetSum - root.val;
        return hasPathSum(root.left, remaining)
            || hasPathSum(root.right, remaining);
    }
}`,
      kotlin: `class Solution {
    fun hasPathSum(root: TreeNode?, targetSum: Int): Boolean {
        if (root == null) return false
        if (root.left == null && root.right == null)
            return root.val == targetSum

        val remaining = targetSum - root.val
        return hasPathSum(root.left, remaining)
            || hasPathSum(root.right, remaining)
    }
}`,
    },
  },

  "invert-binary-tree": {
    approach:
      "Recursively swap the left and right children of every node. Process the current node (swap), then recurse on both children. Base case: null node returns null.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(h)",
    code: {
      python: `class Solution:
    def invertTree(self, root):
        if not root:
            return None

        # Swap left and right children
        root.left, root.right = root.right, root.left

        # Recurse on both subtrees
        self.invertTree(root.left)
        self.invertTree(root.right)

        return root`,
      java: `class Solution {
    public TreeNode invertTree(TreeNode root) {
        if (root == null) return null;

        TreeNode temp = root.left;
        root.left = root.right;
        root.right = temp;

        invertTree(root.left);
        invertTree(root.right);
        return root;
    }
}`,
      kotlin: `class Solution {
    fun invertTree(root: TreeNode?): TreeNode? {
        if (root == null) return null

        val temp = root.left
        root.left = root.right
        root.right = temp

        invertTree(root.left)
        invertTree(root.right)
        return root
    }
}`,
    },
  },

  // ==================== STACK ====================

  "valid-parentheses": {
    approach:
      "Push opening brackets onto the stack. For each closing bracket, check if the stack's top matches. If it does, pop. If not (or stack is empty), it's invalid. At the end, the stack must be empty.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    code: {
      python: `class Solution:
    def isValid(self, s: str) -> bool:
        stack = []
        matching = {')': '(', ']': '[', '}': '{'}

        for char in s:
            if char in '({[':
                stack.append(char)
            else:
                if not stack or stack[-1] != matching[char]:
                    return False
                stack.pop()

        return len(stack) == 0`,
      java: `class Solution {
    public boolean isValid(String s) {
        Stack<Character> stack = new Stack<>();
        Map<Character, Character> map = Map.of(')', '(', ']', '[', '}', '{');

        for (char c : s.toCharArray()) {
            if ("({[".indexOf(c) >= 0) {
                stack.push(c);
            } else {
                if (stack.isEmpty() || stack.peek() != map.get(c))
                    return false;
                stack.pop();
            }
        }
        return stack.isEmpty();
    }
}`,
      kotlin: `class Solution {
    fun isValid(s: String): Boolean {
        val stack = ArrayDeque<Char>()
        val map = mapOf(')' to '(', ']' to '[', '}' to '{')

        for (c in s) {
            if (c in "({[") {
                stack.addLast(c)
            } else {
                if (stack.isEmpty() || stack.last() != map[c])
                    return false
                stack.removeLast()
            }
        }
        return stack.isEmpty()
    }
}`,
    },
  },

  "min-stack": {
    approach:
      "Use two stacks: one for values and one for tracking the current minimum. When pushing, also push onto the min stack if the value is <= the current minimum. When popping, also pop the min stack if the popped value equals the current minimum.",
    timeComplexity: "O(1) for all operations",
    spaceComplexity: "O(n)",
    code: {
      python: `class MinStack:
    def __init__(self):
        self.stack = []
        self.min_stack = []  # tracks minimums

    def push(self, val: int) -> None:
        self.stack.append(val)
        # Push to min_stack if it's empty or val <= current min
        if not self.min_stack or val <= self.min_stack[-1]:
            self.min_stack.append(val)

    def pop(self) -> None:
        val = self.stack.pop()
        # If popped value is the current min, pop min_stack too
        if val == self.min_stack[-1]:
            self.min_stack.pop()

    def top(self) -> int:
        return self.stack[-1]

    def getMin(self) -> int:
        return self.min_stack[-1]`,
      java: `class MinStack {
    private Stack<Integer> stack = new Stack<>();
    private Stack<Integer> minStack = new Stack<>();

    public void push(int val) {
        stack.push(val);
        if (minStack.isEmpty() || val <= minStack.peek())
            minStack.push(val);
    }

    public void pop() {
        int val = stack.pop();
        if (val == minStack.peek())
            minStack.pop();
    }

    public int top() { return stack.peek(); }
    public int getMin() { return minStack.peek(); }
}`,
      kotlin: `class MinStack {
    private val stack = ArrayDeque<Int>()
    private val minStack = ArrayDeque<Int>()

    fun push(v: Int) {
        stack.addLast(v)
        if (minStack.isEmpty() || v <= minStack.last())
            minStack.addLast(v)
    }

    fun pop() {
        val v = stack.removeLast()
        if (v == minStack.last()) minStack.removeLast()
    }

    fun top(): Int = stack.last()
    fun getMin(): Int = minStack.last()
}`,
    },
  },

  "reverse-polish-notation": {
    approach:
      "Use a stack. For each token: if it's a number, push it. If it's an operator, pop two operands, apply the operator, and push the result. The final value on the stack is the answer.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    code: {
      python: `class Solution:
    def evalRPN(self, tokens: list[str]) -> int:
        stack = []

        for token in tokens:
            if token in '+-*/':
                b = stack.pop()  # second operand (popped first)
                a = stack.pop()  # first operand

                if token == '+': stack.append(a + b)
                elif token == '-': stack.append(a - b)
                elif token == '*': stack.append(a * b)
                else: stack.append(int(a / b))  # truncate toward zero
            else:
                stack.append(int(token))

        return stack[0]`,
      java: `class Solution {
    public int evalRPN(String[] tokens) {
        Stack<Integer> stack = new Stack<>();

        for (String token : tokens) {
            if ("+-*/".contains(token)) {
                int b = stack.pop(), a = stack.pop();
                switch (token) {
                    case "+": stack.push(a + b); break;
                    case "-": stack.push(a - b); break;
                    case "*": stack.push(a * b); break;
                    case "/": stack.push(a / b); break;
                }
            } else {
                stack.push(Integer.parseInt(token));
            }
        }
        return stack.peek();
    }
}`,
      kotlin: `class Solution {
    fun evalRPN(tokens: Array<String>): Int {
        val stack = ArrayDeque<Int>()

        for (token in tokens) {
            if (token in listOf("+", "-", "*", "/")) {
                val b = stack.removeLast()
                val a = stack.removeLast()
                stack.addLast(when (token) {
                    "+" -> a + b
                    "-" -> a - b
                    "*" -> a * b
                    else -> (a.toDouble() / b).toInt()
                })
            } else {
                stack.addLast(token.toInt())
            }
        }
        return stack.last()
    }
}`,
    },
  },

  // ==================== HASH MAP ====================

  "two-sum": {
    approach:
      "Iterate through the array. For each element, compute the complement (target - num). If the complement is already in the hash map, return both indices. Otherwise, store the current value and index.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    code: {
      python: `class Solution:
    def twoSum(self, nums: list[int], target: int) -> list[int]:
        seen = {}  # value -> index

        for i, num in enumerate(nums):
            complement = target - num

            if complement in seen:
                return [seen[complement], i]

            seen[num] = i

        return []`,
      java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> seen = new HashMap<>();

        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (seen.containsKey(complement))
                return new int[]{seen.get(complement), i};
            seen.put(nums[i], i);
        }
        return new int[]{};
    }
}`,
      kotlin: `class Solution {
    fun twoSum(nums: IntArray, target: Int): IntArray {
        val seen = mutableMapOf<Int, Int>()

        for ((i, num) in nums.withIndex()) {
            val complement = target - num
            if (complement in seen)
                return intArrayOf(seen[complement]!!, i)
            seen[num] = i
        }
        return intArrayOf()
    }
}`,
    },
  },

  "valid-anagram": {
    approach:
      "Count the frequency of each character in both strings using a hash map (or array for lowercase letters). If the frequency maps are identical, the strings are anagrams.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1) — at most 26 letters",
    code: {
      python: `class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        if len(s) != len(t):
            return False

        count = {}
        for c in s:
            count[c] = count.get(c, 0) + 1

        for c in t:
            count[c] = count.get(c, 0) - 1
            if count[c] < 0:
                return False

        return True`,
      java: `class Solution {
    public boolean isAnagram(String s, String t) {
        if (s.length() != t.length()) return false;

        int[] count = new int[26];
        for (char c : s.toCharArray()) count[c - 'a']++;
        for (char c : t.toCharArray()) {
            count[c - 'a']--;
            if (count[c - 'a'] < 0) return false;
        }
        return true;
    }
}`,
      kotlin: `class Solution {
    fun isAnagram(s: String, t: String): Boolean {
        if (s.length != t.length) return false

        val count = IntArray(26)
        for (c in s) count[c - 'a']++
        for (c in t) {
            count[c - 'a']--
            if (count[c - 'a'] < 0) return false
        }
        return true
    }
}`,
    },
  },

  "group-anagrams": {
    approach:
      "Use a hash map where the key is a canonical form of each string (sorted characters). Group all strings that share the same sorted form together.",
    timeComplexity: "O(n * k log k) where k = max string length",
    spaceComplexity: "O(n * k)",
    code: {
      python: `class Solution:
    def groupAnagrams(self, strs: list[str]) -> list[list[str]]:
        groups = {}

        for s in strs:
            key = ''.join(sorted(s))  # canonical form

            if key not in groups:
                groups[key] = []
            groups[key].append(s)

        return list(groups.values())`,
      java: `class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        Map<String, List<String>> groups = new HashMap<>();

        for (String s : strs) {
            char[] chars = s.toCharArray();
            Arrays.sort(chars);
            String key = new String(chars);

            groups.computeIfAbsent(key, k -> new ArrayList<>()).add(s);
        }
        return new ArrayList<>(groups.values());
    }
}`,
      kotlin: `class Solution {
    fun groupAnagrams(strs: Array<String>): List<List<String>> {
        val groups = mutableMapOf<String, MutableList<String>>()

        for (s in strs) {
            val key = s.toCharArray().sorted().joinToString("")
            groups.getOrPut(key) { mutableListOf() }.add(s)
        }
        return groups.values.toList()
    }
}`,
    },
  },

  // ==================== LINKED LIST ====================

  "reverse-linked-list": {
    approach:
      "Iterate through the list with three pointers: prev, curr, next. At each node, save the next pointer, reverse curr.next to point to prev, then advance both prev and curr forward.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    code: {
      python: `class Solution:
    def reverseList(self, head):
        prev = None
        curr = head

        while curr:
            next_node = curr.next  # save next
            curr.next = prev       # reverse pointer
            prev = curr            # advance prev
            curr = next_node       # advance curr

        return prev  # new head`,
      java: `class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode prev = null, curr = head;

        while (curr != null) {
            ListNode next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }
        return prev;
    }
}`,
      kotlin: `class Solution {
    fun reverseList(head: ListNode?): ListNode? {
        var prev: ListNode? = null
        var curr = head

        while (curr != null) {
            val next = curr.next
            curr.next = prev
            prev = curr
            curr = next
        }
        return prev
    }
}`,
    },
  },

  "merge-two-sorted-lists": {
    approach:
      "Use a dummy head node and a tail pointer. Compare the heads of both lists, attach the smaller one to tail, and advance that list's pointer. Append any remaining nodes at the end.",
    timeComplexity: "O(n + m)",
    spaceComplexity: "O(1)",
    code: {
      python: `class Solution:
    def mergeTwoLists(self, list1, list2):
        dummy = ListNode(0)
        tail = dummy

        while list1 and list2:
            if list1.val <= list2.val:
                tail.next = list1
                list1 = list1.next
            else:
                tail.next = list2
                list2 = list2.next
            tail = tail.next

        # Attach remaining nodes
        tail.next = list1 if list1 else list2
        return dummy.next`,
      java: `class Solution {
    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        ListNode dummy = new ListNode(0);
        ListNode tail = dummy;

        while (list1 != null && list2 != null) {
            if (list1.val <= list2.val) {
                tail.next = list1;
                list1 = list1.next;
            } else {
                tail.next = list2;
                list2 = list2.next;
            }
            tail = tail.next;
        }
        tail.next = (list1 != null) ? list1 : list2;
        return dummy.next;
    }
}`,
      kotlin: `class Solution {
    fun mergeTwoLists(list1: ListNode?, list2: ListNode?): ListNode? {
        val dummy = ListNode(0)
        var tail = dummy
        var l1 = list1; var l2 = list2

        while (l1 != null && l2 != null) {
            if (l1.val <= l2.val) {
                tail.next = l1; l1 = l1.next
            } else {
                tail.next = l2; l2 = l2.next
            }
            tail = tail.next!!
        }
        tail.next = l1 ?: l2
        return dummy.next
    }
}`,
    },
  },

  "linked-list-cycle": {
    approach:
      "Floyd's cycle detection: use two pointers, slow (1 step) and fast (2 steps). If there's a cycle, they will eventually meet. If fast reaches null, there's no cycle.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    code: {
      python: `class Solution:
    def hasCycle(self, head) -> bool:
        slow = fast = head

        while fast and fast.next:
            slow = slow.next        # 1 step
            fast = fast.next.next   # 2 steps

            if slow == fast:
                return True         # they met — cycle!

        return False  # fast hit null — no cycle`,
      java: `class Solution {
    public boolean hasCycle(ListNode head) {
        ListNode slow = head, fast = head;

        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) return true;
        }
        return false;
    }
}`,
      kotlin: `class Solution {
    fun hasCycle(head: ListNode?): Boolean {
        var slow = head; var fast = head

        while (fast?.next != null) {
            slow = slow?.next
            fast = fast.next?.next
            if (slow == fast) return true
        }
        return false
    }
}`,
    },
  },
};

export function getSolution(slug: string): Solution | undefined {
  return solutions[slug];
}
