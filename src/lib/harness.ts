import { Problem, Language } from "./types";

export function assembleCode(
  problem: Problem,
  userCode: string,
  language: Language
): { source: string; filename: string } {
  const testArgs = problem.testCases.map((tc) => tc.args.join(";"));

  switch (language) {
    case "java":
      return {
        source: assembleJava(problem, userCode, testArgs),
        filename: "Main.java",
      };
    case "kotlin":
      return {
        source: assembleKotlin(problem, userCode, testArgs),
        filename: "Main.kt",
      };
    case "python":
      return {
        source: assemblePython(problem, userCode, testArgs),
        filename: "solution.py",
      };
  }
}

function assembleJava(
  problem: Problem,
  userCode: string,
  testArgs: string[]
): string {
  const needsTree = problem.invocation.java.includes("buildTree");
  const needsList = problem.invocation.java.includes("buildList") || problem.invocation.java.includes("buildCyclicList");

  let helpers = "";

  if (needsTree) {
    helpers += `
class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode() {}
    TreeNode(int val) { this.val = val; }
    TreeNode(int val, TreeNode left, TreeNode right) {
        this.val = val; this.left = left; this.right = right;
    }
}
`;
  }

  if (needsList) {
    helpers += `
class ListNode {
    int val;
    ListNode next;
    ListNode() {}
    ListNode(int val) { this.val = val; }
    ListNode(int val, ListNode next) { this.val = val; this.next = next; }
}
`;
  }

  const invocation = problem.invocation.java;
  const argsLiteral = testArgs
    .map((a) => `"${a.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`)
    .join(", ");

  return `import java.util.*;

${helpers}
${userCode}

public class Main {
    static int[] parseIntArray(String s) {
        if (s == null || s.trim().isEmpty()) return new int[0];
        String[] parts = s.split(",");
        int[] arr = new int[parts.length];
        for (int j = 0; j < parts.length; j++) arr[j] = Integer.parseInt(parts[j].trim());
        return arr;
    }
${needsTree ? treeHelpersJava() : ""}
${needsList ? listHelpersJava() : ""}
    public static void main(String[] argsx) {
        String[] args = new String[]{${argsLiteral}};
        for (int i = 0; i < args.length; i++) {
            try {
                ${indentLines(invocation, 16)}
            } catch (Exception e) {
                System.out.println("ERROR: " + e.getMessage());
            }
        }
    }
}
`;
}

function treeHelpersJava(): string {
  return `
    static TreeNode buildTree(String s) {
        if (s == null || s.trim().isEmpty()) return null;
        String[] parts = s.split(",");
        if (parts.length == 0 || parts[0].trim().equals("null")) return null;
        TreeNode root = new TreeNode(Integer.parseInt(parts[0].trim()));
        java.util.Queue<TreeNode> queue = new java.util.LinkedList<>();
        queue.add(root);
        int idx = 1;
        while (!queue.isEmpty() && idx < parts.length) {
            TreeNode node = queue.poll();
            if (idx < parts.length && !parts[idx].trim().equals("null")) {
                node.left = new TreeNode(Integer.parseInt(parts[idx].trim()));
                queue.add(node.left);
            }
            idx++;
            if (idx < parts.length && !parts[idx].trim().equals("null")) {
                node.right = new TreeNode(Integer.parseInt(parts[idx].trim()));
                queue.add(node.right);
            }
            idx++;
        }
        return root;
    }

    static String serializeTree(TreeNode root) {
        if (root == null) return "[]";
        java.util.List<String> result = new java.util.ArrayList<>();
        java.util.Queue<TreeNode> queue = new java.util.LinkedList<>();
        queue.add(root);
        while (!queue.isEmpty()) {
            TreeNode node = queue.poll();
            if (node == null) { result.add("null"); continue; }
            result.add(String.valueOf(node.val));
            queue.add(node.left);
            queue.add(node.right);
        }
        while (result.size() > 0 && result.get(result.size() - 1).equals("null")) result.remove(result.size() - 1);
        return "[" + String.join(", ", result) + "]";
    }`;
}

function listHelpersJava(): string {
  return `
    static ListNode buildList(String s) {
        if (s == null || s.trim().isEmpty()) return null;
        String[] parts = s.split(",");
        ListNode dummy = new ListNode(0);
        ListNode cur = dummy;
        for (String p : parts) {
            cur.next = new ListNode(Integer.parseInt(p.trim()));
            cur = cur.next;
        }
        return dummy.next;
    }

    static ListNode buildCyclicList(String s, int pos) {
        if (s == null || s.trim().isEmpty()) return null;
        String[] parts = s.split(",");
        ListNode dummy = new ListNode(0);
        ListNode cur = dummy;
        java.util.List<ListNode> nodes = new java.util.ArrayList<>();
        for (String p : parts) {
            cur.next = new ListNode(Integer.parseInt(p.trim()));
            cur = cur.next;
            nodes.add(cur);
        }
        if (pos >= 0 && pos < nodes.size()) {
            cur.next = nodes.get(pos);
        }
        return dummy.next;
    }

    static String serializeList(ListNode head) {
        if (head == null) return "[]";
        StringBuilder sb = new StringBuilder("[");
        ListNode cur = head;
        boolean first = true;
        while (cur != null) {
            if (!first) sb.append(", ");
            sb.append(cur.val);
            first = false;
            cur = cur.next;
        }
        sb.append("]");
        return sb.toString();
    }`;
}

function assembleKotlin(
  problem: Problem,
  userCode: string,
  testArgs: string[]
): string {
  const needsTree = problem.invocation.kotlin.includes("buildTree");
  const needsList = problem.invocation.kotlin.includes("buildList") || problem.invocation.kotlin.includes("buildCyclicList");
  const needsIsBadVersion = problem.slug === "first-bad-version";

  let helpers = "";

  if (needsTree) {
    helpers += `
class TreeNode(var \`val\`: Int = 0) {
    var left: TreeNode? = null
    var right: TreeNode? = null
}
`;
  }

  if (needsList) {
    helpers += `
class ListNode(var \`val\`: Int = 0) {
    var next: ListNode? = null
}
`;
  }

  if (needsIsBadVersion) {
    helpers += `
open class Solution {
    open fun isBadVersion(version: Int): Boolean = false
}
`;
  }

  const invocation = problem.invocation.kotlin;
  const argsLiteral = testArgs
    .map((a) => `"${a.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`)
    .join(", ");

  // For first-bad-version, user code defines Solution which extends the open class
  // We need to strip the class declaration and insert it as an extension
  let finalUserCode = userCode;
  if (needsIsBadVersion) {
    // Extract the body of the user's Solution class and create a subclass
    finalUserCode = userCode
      .replace(/class\s+Solution\s*\{/, "class UserSolution : Solution() {")
      .replace(
        /\/\/.*isBadVersion.*\n/,
        ""
      );
  }

  return `${helpers}
${finalUserCode}

${needsTree ? treeHelpersKotlin() : ""}
${needsList ? listHelpersKotlin() : ""}

fun main() {
    val args = arrayOf(${argsLiteral})
    for (i in args.indices) {
        try {
            ${indentLines(invocation, 12)}
        } catch (e: Exception) {
            println("ERROR: " + e.message)
        }
    }
}
`;
}

function treeHelpersKotlin(): string {
  return `
fun buildTree(s: String): TreeNode? {
    if (s.isBlank()) return null
    val parts = s.split(",").map { it.trim() }
    if (parts.isEmpty() || parts[0] == "null") return null
    val root = TreeNode(parts[0].toInt())
    val queue: java.util.LinkedList<TreeNode> = java.util.LinkedList()
    queue.add(root)
    var idx = 1
    while (queue.isNotEmpty() && idx < parts.size) {
        val node = queue.poll()
        if (idx < parts.size && parts[idx] != "null") {
            node.left = TreeNode(parts[idx].toInt())
            queue.add(node.left!!)
        }
        idx++
        if (idx < parts.size && parts[idx] != "null") {
            node.right = TreeNode(parts[idx].toInt())
            queue.add(node.right!!)
        }
        idx++
    }
    return root
}

fun serializeTree(root: TreeNode?): String {
    if (root == null) return "[]"
    val result = mutableListOf<String>()
    val queue: java.util.LinkedList<TreeNode?> = java.util.LinkedList()
    queue.add(root)
    while (queue.isNotEmpty()) {
        val node = queue.poll()
        if (node == null) { result.add("null"); continue }
        result.add(node.\`val\`.toString())
        queue.add(node.left)
        queue.add(node.right)
    }
    while (result.isNotEmpty() && result.last() == "null") result.removeAt(result.size - 1)
    return "[" + result.joinToString(", ") + "]"
}`;
}

function listHelpersKotlin(): string {
  return `
fun buildList(s: String): ListNode? {
    if (s.isBlank()) return null
    val parts = s.split(",")
    val dummy = ListNode(0)
    var cur = dummy
    for (p in parts) {
        cur.next = ListNode(p.trim().toInt())
        cur = cur.next!!
    }
    return dummy.next
}

fun buildCyclicList(s: String, pos: Int): ListNode? {
    if (s.isBlank()) return null
    val parts = s.split(",")
    val dummy = ListNode(0)
    var cur = dummy
    val nodes = mutableListOf<ListNode>()
    for (p in parts) {
        cur.next = ListNode(p.trim().toInt())
        cur = cur.next!!
        nodes.add(cur)
    }
    if (pos >= 0 && pos < nodes.size) {
        cur.next = nodes[pos]
    }
    return dummy.next
}

fun serializeList(head: ListNode?): String {
    if (head == null) return "[]"
    val sb = StringBuilder("[")
    var cur = head
    var first = true
    while (cur != null) {
        if (!first) sb.append(", ")
        sb.append(cur.\`val\`)
        first = false
        cur = cur.next
    }
    sb.append("]")
    return sb.toString()
}`;
}

function assemblePython(
  problem: Problem,
  userCode: string,
  testArgs: string[]
): string {
  const needsTree = problem.invocation.python.includes("build_tree");
  const needsList = problem.invocation.python.includes("build_list") || problem.invocation.python.includes("build_cyclic_list");

  let helpers = "";

  if (needsTree) {
    helpers += `
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def build_tree(s):
    if not s or not s.strip():
        return None
    parts = [x.strip() for x in s.split(",")]
    if not parts or parts[0] == "null":
        return None
    from collections import deque
    root = TreeNode(int(parts[0]))
    queue = deque([root])
    idx = 1
    while queue and idx < len(parts):
        node = queue.popleft()
        if idx < len(parts) and parts[idx] != "null":
            node.left = TreeNode(int(parts[idx]))
            queue.append(node.left)
        idx += 1
        if idx < len(parts) and parts[idx] != "null":
            node.right = TreeNode(int(parts[idx]))
            queue.append(node.right)
        idx += 1
    return root

def serialize_tree(root):
    if not root:
        return "[]"
    from collections import deque
    result = []
    queue = deque([root])
    while queue:
        node = queue.popleft()
        if not node:
            result.append("null")
            continue
        result.append(str(node.val))
        queue.append(node.left)
        queue.append(node.right)
    while result and result[-1] == "null":
        result.pop()
    return "[" + ", ".join(result) + "]"
`;
  }

  if (needsList) {
    helpers += `
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def build_list(s):
    if not s or not s.strip():
        return None
    parts = s.split(",")
    dummy = ListNode(0)
    cur = dummy
    for p in parts:
        cur.next = ListNode(int(p.strip()))
        cur = cur.next
    return dummy.next

def build_cyclic_list(s, pos):
    if not s or not s.strip():
        return None
    parts = s.split(",")
    dummy = ListNode(0)
    cur = dummy
    nodes = []
    for p in parts:
        cur.next = ListNode(int(p.strip()))
        cur = cur.next
        nodes.append(cur)
    if 0 <= pos < len(nodes):
        cur.next = nodes[pos]
    return dummy.next

def serialize_list(head):
    if not head:
        return "[]"
    result = []
    cur = head
    while cur:
        result.append(str(cur.val))
        cur = cur.next
    return "[" + ", ".join(result) + "]"
`;
  }

  const invocation = problem.invocation.python;
  const argsLiteral = testArgs
    .map((a) => `"${a.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`)
    .join(", ");

  return `${helpers}
${userCode}

if __name__ == "__main__":
    args = [${argsLiteral}]
    for i in range(len(args)):
        try:
            ${indentLines(invocation, 12)}
        except Exception as e:
            print(f"ERROR: {e}")
`;
}

function indentLines(code: string, spaces: number): string {
  const indent = " ".repeat(spaces);
  return code
    .split("\n")
    .map((line, i) => (i === 0 ? line : indent + line))
    .join("\n");
}
