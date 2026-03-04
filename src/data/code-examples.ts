import { Category } from "@/lib/types";

export interface CodeExample {
  title: string;
  language: string;
  code: string;
  timeComplexity: string;
  spaceComplexity: string;
  whenToUse: string[];
}

const examples: Record<Category, CodeExample> = {
  "two-pointers": {
    title: "Two Sum II — Sorted Array",
    language: "python",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    whenToUse: [
      "Input is sorted (or can be sorted)",
      "Finding pairs that satisfy a condition",
      "Reducing O(n^2) brute force to O(n)",
    ],
    code: `def two_sum_sorted(nums, target):
    left, right = 0, len(nums) - 1

    while left < right:
        current_sum = nums[left] + nums[right]

        if current_sum == target:
            return [left, right]      # found the pair

        elif current_sum < target:
            left += 1                 # need a bigger sum,
                                      # move left pointer right

        else:
            right -= 1               # need a smaller sum,
                                      # move right pointer left

    return []                         # no pair found

# Example: nums = [1, 3, 5, 7, 9, 11, 14], target = 14
# Step 1: left=0(1), right=6(14) → 1+14=15 > 14 → right--
# Step 2: left=0(1), right=5(11) → 1+11=12 < 14 → left++
# Step 3: left=1(3), right=5(11) → 3+11=14 = target → found!

# WHY IT WORKS:
# Since the array is sorted, moving left++ increases the sum,
# and moving right-- decreases it. We narrow from both ends,
# eliminating impossible pairs each step. Each element is
# visited at most once → O(n).`,
  },

  "sliding-window": {
    title: "Max Sum Subarray of Size K",
    language: "python",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    whenToUse: [
      "Finding optimal contiguous subarray/substring",
      "Fixed-size window: sum, average, max of k elements",
      "Variable-size window: longest/shortest substring with constraint",
    ],
    code: `def max_sum_subarray(nums, k):
    # 1. Build the first window of size k
    window_sum = sum(nums[:k])
    best = window_sum

    # 2. Slide the window: remove leftmost, add next right
    for i in range(k, len(nums)):
        window_sum += nums[i]         # add new element entering window
        window_sum -= nums[i - k]     # remove element leaving window
        best = max(best, window_sum)  # track the best sum seen

    return best

# Example: nums = [2, 1, 5, 1, 3, 2], k = 3
#   Window [2,1,5] → sum=8, best=8
#   Window [1,5,1] → sum=7, best=8
#   Window [5,1,3] → sum=9, best=9  ← new best!
#   Window [1,3,2] → sum=6, best=9

# VARIABLE WINDOW VARIANT (longest substring without repeats):
def longest_unique_substring(s):
    seen = {}
    left = 0
    best = 0

    for right in range(len(s)):
        if s[right] in seen and seen[s[right]] >= left:
            left = seen[s[right]] + 1   # shrink window past duplicate
        seen[s[right]] = right
        best = max(best, right - left + 1)

    return best

# KEY INSIGHT: Instead of checking every subarray O(n*k),
# we reuse the previous sum and just swap one element → O(n).`,
  },

  "binary-search": {
    title: "Binary Search",
    language: "python",
    timeComplexity: "O(log n)",
    spaceComplexity: "O(1)",
    whenToUse: [
      "Searching sorted arrays or search spaces",
      "Finding boundaries (first/last occurrence)",
      "Minimizing/maximizing with a monotonic condition",
    ],
    code: `def binary_search(nums, target):
    low, high = 0, len(nums) - 1

    while low <= high:
        mid = (low + high) // 2       # find middle index

        if nums[mid] == target:
            return mid                # found it!

        elif nums[mid] < target:
            low = mid + 1             # target is in right half

        else:
            high = mid - 1            # target is in left half

    return -1                         # not found

# Example: nums = [2,5,8,12,16,23,38,56,72,91], target = 23
# Step 1: low=0, high=9, mid=4 → nums[4]=16 < 23 → low=5
# Step 2: low=5, high=9, mid=7 → nums[7]=56 > 23 → high=6
# Step 3: low=5, high=6, mid=5 → nums[5]=23 = target → found!

# BISECT VARIANT — find first position where condition is true:
def first_bad_version(n, is_bad):
    low, high = 1, n

    while low < high:               # note: low < high, not <=
        mid = (low + high) // 2
        if is_bad(mid):
            high = mid               # mid might be the answer
        else:
            low = mid + 1            # answer must be after mid

    return low                       # first bad version

# WHY IT WORKS:
# Each comparison eliminates half the search space.
# n elements → log2(n) comparisons max.
# 1 billion elements → only ~30 comparisons!`,
  },

  bfs: {
    title: "BFS — Level-Order Traversal / Flood Fill",
    language: "python",
    timeComplexity: "O(V + E) or O(rows * cols)",
    spaceComplexity: "O(V) for the queue",
    whenToUse: [
      "Shortest path in unweighted graph",
      "Level-by-level tree traversal",
      "Flood fill, island counting, grid exploration",
    ],
    code: `from collections import deque

def bfs_grid(grid, start_row, start_col):
    rows, cols = len(grid), len(grid[0])
    visited = set()
    queue = deque([(start_row, start_col, 0)])  # (row, col, distance)
    visited.add((start_row, start_col))

    while queue:
        row, col, dist = queue.popleft()    # FIFO — process oldest first
        # process current cell here...

        # explore 4 neighbors
        for dr, dc in [(0,1), (0,-1), (1,0), (-1,0)]:
            nr, nc = row + dr, col + dc

            if (0 <= nr < rows and 0 <= nc < cols   # in bounds
                and (nr, nc) not in visited          # not seen
                and grid[nr][nc] != 1):              # not a wall
                visited.add((nr, nc))
                queue.append((nr, nc, dist + 1))

    return visited

# TREE LEVEL-ORDER TRAVERSAL:
def level_order(root):
    if not root:
        return []

    result = []
    queue = deque([root])

    while queue:
        level_size = len(queue)         # nodes at current level
        level = []

        for _ in range(level_size):     # process entire level
            node = queue.popleft()
            level.append(node.val)

            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)

        result.append(level)

    return result                       # [[3], [9,20], [15,7]]

# KEY INSIGHT: BFS explores outward in "waves." The queue
# ensures we finish all nodes at distance d before any at d+1.
# This guarantees shortest paths in unweighted graphs.`,
  },

  dfs: {
    title: "DFS — Max Depth / Path Problems",
    language: "python",
    timeComplexity: "O(n) — visits each node once",
    spaceComplexity: "O(h) — recursion stack depth (h = tree height)",
    whenToUse: [
      "Tree depth, diameter, path sum problems",
      "Exploring all paths or permutations (backtracking)",
      "Connected components in graphs",
    ],
    code: `def max_depth(root):
    if not root:
        return 0                          # base case: null node

    left_depth = max_depth(root.left)     # recurse left subtree
    right_depth = max_depth(root.right)   # recurse right subtree

    return 1 + max(left_depth, right_depth)  # current node + deeper child

# Trace for tree:
#         4
#       /   \\
#      2     6
#     / \\   / \\
#    1   3 5   7
#
# max_depth(1) → 0+0 → returns 1
# max_depth(3) → 0+0 → returns 1
# max_depth(2) → 1+max(1,1) → returns 2
# max_depth(5) → returns 1
# max_depth(7) → returns 1
# max_depth(6) → 1+max(1,1) → returns 2
# max_depth(4) → 1+max(2,2) → returns 3

# DFS WITH BACKTRACKING — find all root-to-leaf paths:
def all_paths(root):
    result = []

    def dfs(node, path):
        if not node:
            return

        path.append(node.val)

        if not node.left and not node.right:  # leaf node
            result.append(path[:])            # save a copy

        dfs(node.left, path)
        dfs(node.right, path)

        path.pop()                            # backtrack!

    dfs(root, [])
    return result

# KEY INSIGHT: DFS dives deep, then backtracks. The call stack
# automatically tracks where we've been. Each node is visited
# exactly once. Think of it as "go as far as you can, then
# come back and try the next branch."`,
  },

  stack: {
    title: "Valid Parentheses",
    language: "python",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n) — worst case all openers",
    whenToUse: [
      "Matching brackets, tags, or nested structures",
      "Evaluating expressions (postfix, infix)",
      "Monotonic stack: next greater/smaller element",
    ],
    code: `def is_valid(s):
    stack = []
    matching = {')': '(', ']': '[', '}': '{'}

    for char in s:
        if char in '({[':
            stack.append(char)            # push openers

        elif char in ')}]':
            if not stack:
                return False              # closer with no opener
            if stack[-1] != matching[char]:
                return False              # wrong type of opener
            stack.pop()                   # matched! remove opener

    return len(stack) == 0                # all openers matched?

# Trace for "({[]})":
#   '(' → push → stack: ['(']
#   '{' → push → stack: ['(', '{']
#   '[' → push → stack: ['(', '{', '[']
#   ']' → matches '[' → pop → stack: ['(', '{']
#   '}' → matches '{' → pop → stack: ['(']
#   ')' → matches '(' → pop → stack: []
#   Stack empty → Valid!

# MONOTONIC STACK — next greater element:
def next_greater(nums):
    result = [-1] * len(nums)
    stack = []                            # stores indices

    for i in range(len(nums)):
        while stack and nums[i] > nums[stack[-1]]:
            idx = stack.pop()
            result[idx] = nums[i]        # nums[i] is the next greater
        stack.append(i)

    return result

# KEY INSIGHT: A stack's LIFO order naturally handles nested
# structures. The most recent opener is always on top, which
# is exactly what the next closer should match.`,
  },

  "hash-map": {
    title: "Two Sum (Unsorted)",
    language: "python",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n) for the hash map",
    whenToUse: [
      "Finding pairs/complements in O(1) lookup",
      "Counting frequencies of elements",
      "Grouping items by some key (anagrams, etc.)",
    ],
    code: `def two_sum(nums, target):
    seen = {}                             # value → index

    for i, num in enumerate(nums):
        complement = target - num

        if complement in seen:            # O(1) lookup!
            return [seen[complement], i]

        seen[num] = i                     # store for future lookups

    return []

# Trace for nums = [3, 1, 4, 1, 5, 9], target = 10:
#   i=0: num=3, need 7, not in {} → store {3:0}
#   i=1: num=1, need 9, not in {3:0} → store {3:0, 1:1}
#   i=2: num=4, need 6, not found → store {3:0, 1:1, 4:2}
#   i=3: num=1, need 9, not found → store {3:0, 1:3, 4:2}
#   i=4: num=5, need 5, not found → store {3:0, 1:3, 4:2, 5:4}
#   i=5: num=9, need 1, FOUND at index 3 → return [3, 5]

# FREQUENCY COUNTING:
def top_k_frequent(nums, k):
    count = {}
    for num in nums:
        count[num] = count.get(num, 0) + 1

    # sort by frequency descending
    return sorted(count, key=lambda x: -count[x])[:k]

# GROUP ANAGRAMS:
def group_anagrams(strs):
    groups = {}
    for s in strs:
        key = tuple(sorted(s))           # canonical form as key
        groups.setdefault(key, []).append(s)
    return list(groups.values())

# KEY INSIGHT: Trade space for time. By storing values we've
# seen, we turn "search through everything" into "look up in
# O(1)." This is the single most common optimization pattern.`,
  },

  "linked-list": {
    title: "Reverse a Linked List",
    language: "python",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1) — in-place pointer manipulation",
    whenToUse: [
      "Reversing (full or partial) a linked list",
      "Detecting cycles (fast/slow pointer)",
      "Merging two sorted lists",
    ],
    code: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def reverse_list(head):
    prev = None
    curr = head

    while curr:
        next_node = curr.next     # 1. save next before we break link
        curr.next = prev          # 2. reverse the pointer
        prev = curr               # 3. advance prev
        curr = next_node          # 4. advance curr

    return prev                   # prev is the new head

# Trace for 1 → 2 → 3 → 4 → null:
#   prev=None, curr=1: save next=2, 1→None, prev=1, curr=2
#   prev=1,    curr=2: save next=3, 2→1,    prev=2, curr=3
#   prev=2,    curr=3: save next=4, 3→2,    prev=3, curr=4
#   prev=3,    curr=4: save next=None, 4→3, prev=4, curr=None
#   Return prev=4 → 4 → 3 → 2 → 1 → None

# CYCLE DETECTION (Floyd's Tortoise and Hare):
def has_cycle(head):
    slow = fast = head

    while fast and fast.next:
        slow = slow.next          # moves 1 step
        fast = fast.next.next     # moves 2 steps

        if slow == fast:
            return True           # they met — cycle exists!

    return False                  # fast hit null — no cycle

# MERGE TWO SORTED LISTS:
def merge_two_lists(l1, l2):
    dummy = ListNode(0)           # dummy head simplifies edge cases
    tail = dummy

    while l1 and l2:
        if l1.val <= l2.val:
            tail.next = l1
            l1 = l1.next
        else:
            tail.next = l2
            l2 = l2.next
        tail = tail.next

    tail.next = l1 or l2          # append remaining nodes
    return dummy.next

# KEY INSIGHT: You can't go backwards in a linked list, so
# always save pointers before modifying them. Use a dummy head
# to avoid special-casing an empty list. Use slow/fast pointers
# when you need to find the middle or detect cycles.`,
  },
};

export function getCodeExample(category: Category): CodeExample {
  return examples[category];
}
