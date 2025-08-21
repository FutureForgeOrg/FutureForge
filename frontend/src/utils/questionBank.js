export const questionBank = {
    dsa: [
      {
        id: 1,
        question: "What is the time complexity of finding the diameter of a binary tree?",
        options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
        correct: 0,
        explanation: "Finding diameter requires traversing each node once, making it O(n) time complexity."
      },
      {
        id: 2,
        question: "Which data structure is best for implementing LRU cache?",
        options: ["Array + HashMap", "LinkedList + HashMap", "Stack + Queue", "Binary Tree"],
        correct: 1,
        explanation: "Doubly LinkedList + HashMap provides O(1) get and put operations for LRU cache."
      },
      {
        id: 3,
        question: "What is the worst-case time complexity of QuickSort?",
        options: ["O(n log n)", "O(n²)", "O(n)", "O(log n)"],
        correct: 1,
        explanation: "QuickSort has O(n²) worst-case when pivot is always the smallest/largest element."
      },
      {
        id: 4,
        question: "Which algorithm is used to find strongly connected components?",
        options: ["Dijkstra's", "Kosaraju's", "Bellman-Ford", "Floyd-Warshall"],
        correct: 1,
        explanation: "Kosaraju's algorithm uses two DFS passes to find strongly connected components."
      },
      {
        id: 5,
        question: "What is the space complexity of merge sort?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
        correct: 2,
        explanation: "Merge sort requires O(n) extra space for the temporary arrays during merging."
      },
      {
        id: 6,
        question: "Which data structure is used in Breadth First Search?",
        options: ["Stack", "Queue", "Priority Queue", "Deque"],
        correct: 1,
        explanation: "BFS uses a queue to process nodes level by level in FIFO order."
      },
      {
        id: 7,
        question: "What is the minimum number of edges in a connected graph with n vertices?",
        options: ["n", "n-1", "n+1", "2n"],
        correct: 1,
        explanation: "A connected graph needs at least n-1 edges to connect all vertices (tree structure)."
      },
      {
        id: 8,
        question: "Which technique is used to solve the 0/1 Knapsack problem optimally?",
        options: ["Greedy", "Dynamic Programming", "Divide & Conquer", "Backtracking"],
        correct: 1,
        explanation: "Dynamic Programming provides optimal solution for 0/1 Knapsack with O(nW) complexity."
      },
      {
        id: 9,
        question: "What is the height of a complete binary tree with n nodes?",
        options: ["log n", "⌊log₂ n⌋", "⌈log₂(n+1)⌉", "n/2"],
        correct: 2,
        explanation: "Height of complete binary tree is ⌈log₂(n+1)⌉ where n is number of nodes."
      },
      {
        id: 10,
        question: "Which algorithm finds the shortest path in a weighted graph with negative edges?",
        options: ["Dijkstra's", "Bellman-Ford", "Floyd-Warshall", "A*"],
        correct: 1,
        explanation: "Bellman-Ford algorithm can handle negative edge weights and detect negative cycles."
      },
      {
        id: 11,
        question: "What is the maximum number of nodes at level k in a binary tree?",
        options: ["2^k", "2^(k-1)", "k", "2k"],
        correct: 0,
        explanation: "At level k, maximum nodes = 2^k (levels start from 0)."
      },
      {
        id: 12,
        question: "Which sorting algorithm is stable and has O(n log n) guaranteed time complexity?",
        options: ["QuickSort", "HeapSort", "MergeSort", "Selection Sort"],
        correct: 2,
        explanation: "MergeSort is stable and has guaranteed O(n log n) time complexity."
      },
      {
        id: 13,
        question: "What is the time complexity of inserting into a balanced BST?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
        correct: 1,
        explanation: "Insertion in balanced BST takes O(log n) time due to tree height."
      },
      {
        id: 14,
        question: "Which data structure is used to implement recursion?",
        options: ["Queue", "Stack", "Heap", "Graph"],
        correct: 1,
        explanation: "System stack is used to store function calls and local variables during recursion."
      },
      {
        id: 15,
        question: "What is the minimum number of comparisons needed to find both maximum and minimum in an array?",
        options: ["n", "2n-2", "3n/2-2", "n²"],
        correct: 2,
        explanation: "By comparing pairs first, we need 3n/2-2 comparisons to find both min and max."
      },
      {
        id: 16,
        question: "Which algorithm is used for topological sorting?",
        options: ["DFS", "BFS", "Both DFS and BFS", "Dijkstra's"],
        correct: 2,
        explanation: "Both DFS (with finish times) and BFS (Kahn's algorithm) can do topological sorting."
      },
      {
        id: 17,
        question: "What is the space complexity of depth-first search?",
        options: ["O(1)", "O(V)", "O(E)", "O(V+E)"],
        correct: 1,
        explanation: "DFS uses O(V) space for the recursion stack in worst case."
      },
      {
        id: 18,
        question: "Which hashing technique handles collisions by chaining?",
        options: ["Linear Probing", "Quadratic Probing", "Separate Chaining", "Double Hashing"],
        correct: 2,
        explanation: "Separate chaining uses linked lists to handle collisions at same hash value."
      },
      {
        id: 19,
        question: "What is the worst-case time complexity of searching in a hash table?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
        correct: 2,
        explanation: "In worst case (all keys hash to same bucket), search becomes O(n)."
      },
      {
        id: 20,
        question: "Which algorithm is used to find the longest common subsequence?",
        options: ["Greedy", "Dynamic Programming", "Divide & Conquer", "Backtracking"],
        correct: 1,
        explanation: "LCS problem is solved optimally using dynamic programming with O(mn) complexity."
      },
      {
        id: 21,
        question: "What is the maximum number of edges in a simple undirected graph with n vertices?",
        options: ["n", "n(n-1)", "n(n-1)/2", "n²"],
        correct: 2,
        explanation: "Maximum edges = nC2 = n(n-1)/2 for a complete graph without self-loops."
      },
      {
        id: 22,
        question: "Which tree traversal gives nodes in non-decreasing order for BST?",
        options: ["Preorder", "Inorder", "Postorder", "Level order"],
        correct: 1,
        explanation: "Inorder traversal of BST gives nodes in sorted (non-decreasing) order."
      },
      {
        id: 23,
        question: "What is the time complexity of building a heap from an array?",
        options: ["O(n log n)", "O(n)", "O(log n)", "O(n²)"],
        correct: 1,
        explanation: "Building heap from array using heapify takes O(n) time, not O(n log n)."
      },
      {
        id: 24,
        question: "Which algorithm finds minimum spanning tree in O(E log E) time?",
        options: ["Prim's", "Kruskal's", "Dijkstra's", "Bellman-Ford"],
        correct: 1,
        explanation: "Kruskal's algorithm sorts edges and uses union-find, taking O(E log E) time."
      },
      {
        id: 25,
        question: "What is the recurrence relation for Tower of Hanoi problem?",
        options: ["T(n) = T(n-1) + 1", "T(n) = 2T(n-1) + 1", "T(n) = T(n-1) + T(n-2)", "T(n) = nT(n-1)"],
        correct: 1,
        explanation: "Tower of Hanoi: T(n) = 2T(n-1) + 1, solving to T(n) = 2^n - 1."
      },
      {
        id: 26,
        question: "Which data structure supports efficient range sum queries after preprocessing?",
        options: ["Array", "Segment Tree", "Linked List", "Stack"],
        correct: 1,
        explanation: "Segment tree supports range queries in O(log n) after O(n) preprocessing."
      },
      {
        id: 27,
        question: "What is the time complexity of detecting cycle in directed graph using DFS?",
        options: ["O(V)", "O(E)", "O(V+E)", "O(V²)"],
        correct: 2,
        explanation: "DFS visits each vertex and edge once, making it O(V+E) for cycle detection."
      },
      {
        id: 28,
        question: "Which algorithm is used for pattern matching with preprocessing?",
        options: ["Naive", "KMP", "Rabin-Karp", "All of the above"],
        correct: 1,
        explanation: "KMP algorithm preprocesses pattern to avoid redundant comparisons in O(n+m) time."
      },
      {
        id: 29,
        question: "What is the space complexity of iterative inorder traversal?",
        options: ["O(1)", "O(h)", "O(n)", "O(log n)"],
        correct: 1,
        explanation: "Iterative traversal uses explicit stack, requiring O(h) space where h is tree height."
      },
      {
        id: 30,
        question: "Which technique is used to solve overlapping subproblems efficiently?",
        options: ["Greedy", "Memoization", "Divide & Conquer", "Backtracking"],
        correct: 1,
        explanation: "Memoization stores results of subproblems to avoid recomputation in dynamic programming."
      }
    ],

    sql: [
      {
        id: 1,
        question: "Which SQL clause is used to filter groups created by GROUP BY?",
        options: ["WHERE", "HAVING", "FILTER", "CONDITION"],
        correct: 1,
        explanation: "HAVING clause filters groups after GROUP BY, while WHERE filters rows before grouping."
      },
      {
        id: 2,
        question: "What is the difference between UNION and UNION ALL?",
        options: ["No difference", "UNION removes duplicates, UNION ALL doesn't", "UNION ALL is faster", "Both B and C"],
        correct: 3,
        explanation: "UNION removes duplicates while UNION ALL doesn't, making UNION ALL faster."
      },
      {
        id: 3,
        question: "Which join returns all records from both tables regardless of match?",
        options: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL OUTER JOIN"],
        correct: 3,
        explanation: "FULL OUTER JOIN returns all records from both tables, with NULLs where no match exists."
      },
      {
        id: 4,
        question: "What does the COALESCE function do?",
        options: ["Concatenates strings", "Returns first non-NULL value", "Counts NULL values", "Removes duplicates"],
        correct: 1,
        explanation: "COALESCE returns the first non-NULL value from a list of expressions."
      },
      {
        id: 5,
        question: "Which constraint ensures all values in a column are unique?",
        options: ["PRIMARY KEY", "UNIQUE", "NOT NULL", "Both A and B"],
        correct: 3,
        explanation: "Both PRIMARY KEY and UNIQUE constraints ensure uniqueness, but PRIMARY KEY also implies NOT NULL."
      },
      {
        id: 6,
        question: "What is the purpose of the ROW_NUMBER() function?",
        options: ["Count rows", "Assign unique sequential numbers", "Calculate percentiles", "Rank duplicates"],
        correct: 1,
        explanation: "ROW_NUMBER() assigns unique sequential numbers to rows within a partition."
      },
      {
        id: 7,
        question: "Which SQL command is used to modify existing data?",
        options: ["INSERT", "UPDATE", "ALTER", "MODIFY"],
        correct: 1,
        explanation: "UPDATE command modifies existing data in table rows."
      },
      {
        id: 8,
        question: "What does ACID stand for in database transactions?",
        options: ["Atomicity, Consistency, Isolation, Durability", "Association, Constraint, Index, Data", "Access, Control, Identity, Database", "Atomic, Consistent, Independent, Durable"],
        correct: 0,
        explanation: "ACID: Atomicity, Consistency, Isolation, Durability - properties of database transactions."
      },
      {
        id: 9,
        question: "Which function calculates running totals?",
        options: ["SUM() OVER()", "TOTAL()", "RUNNING_SUM()", "CUMSUM()"],
        correct: 0,
        explanation: "SUM() OVER() with proper window specification calculates running/cumulative totals."
      },
      {
        id: 10,
        question: "What is the difference between DELETE and TRUNCATE?",
        options: ["No difference", "TRUNCATE is faster and resets identity", "DELETE is faster", "TRUNCATE can have WHERE clause"],
        correct: 1,
        explanation: "TRUNCATE is faster, resets auto-increment, but can't have WHERE clause or be rolled back in some DBs."
      },
      {
        id: 11,
        question: "Which isolation level prevents phantom reads?",
        options: ["READ UNCOMMITTED", "READ COMMITTED", "REPEATABLE READ", "SERIALIZABLE"],
        correct: 3,
        explanation: "SERIALIZABLE isolation level prevents phantom reads by locking ranges of data."
      },
      {
        id: 12,
        question: "What does the EXPLAIN command do?",
        options: ["Documents queries", "Shows query execution plan", "Validates syntax", "Formats queries"],
        correct: 1,
        explanation: "EXPLAIN shows the query execution plan, helping optimize query performance."
      },
      {
        id: 13,
        question: "Which type of index is best for range queries?",
        options: ["Hash Index", "B-Tree Index", "Bitmap Index", "Full-text Index"],
        correct: 1,
        explanation: "B-Tree indexes are optimal for range queries due to their sorted structure."
      },
      {
        id: 14,
        question: "What is a correlated subquery?",
        options: ["Subquery that runs once", "Subquery that references outer query", "Nested subquery", "Subquery with joins"],
        correct: 1,
        explanation: "Correlated subquery references columns from the outer query and executes for each outer row."
      },
      {
        id: 15,
        question: "Which normal form eliminates transitive dependencies?",
        options: ["1NF", "2NF", "3NF", "BCNF"],
        correct: 2,
        explanation: "Third Normal Form (3NF) eliminates transitive dependencies between non-key attributes."
      },
      {
        id: 16,
        question: "What is the purpose of a database trigger?",
        options: ["Start database", "Automatic execution on events", "Schedule tasks", "Backup data"],
        correct: 1,
        explanation: "Triggers automatically execute code in response to database events like INSERT, UPDATE, DELETE."
      },
      {
        id: 17,
        question: "Which command creates a copy of table structure only?",
        options: ["CREATE TABLE AS SELECT", "CREATE TABLE LIKE", "COPY TABLE", "CLONE TABLE"],
        correct: 1,
        explanation: "CREATE TABLE LIKE creates table structure without data, while CREATE TABLE AS SELECT includes data."
      },
      {
        id: 18,
        question: "What is the difference between RANK() and DENSE_RANK()?",
        options: ["No difference", "RANK() skips numbers after ties, DENSE_RANK() doesn't", "DENSE_RANK() is faster", "RANK() handles NULL better"],
        correct: 1,
        explanation: "RANK() skips subsequent ranks after ties, DENSE_RANK() doesn't skip any rank numbers."
      },
      {
        id: 19,
        question: "Which constraint maintains referential integrity?",
        options: ["PRIMARY KEY", "FOREIGN KEY", "UNIQUE", "CHECK"],
        correct: 1,
        explanation: "FOREIGN KEY constraint maintains referential integrity between related tables."
      },
      {
        id: 20,
        question: "What does the PIVOT operation do?",
        options: ["Rotates table", "Converts rows to columns", "Sorts data", "Filters records"],
        correct: 1,
        explanation: "PIVOT converts row values into columns, useful for creating crosstab reports."
      },
      {
        id: 21,
        question: "Which SQL function returns the current date and time?",
        options: ["NOW()", "GETDATE()", "CURRENT_TIMESTAMP", "All of the above"],
        correct: 3,
        explanation: "Different databases use NOW(), GETDATE(), or CURRENT_TIMESTAMP for current date/time."
      },
      {
        id: 22,
        question: "What is a clustered index?",
        options: ["Multiple column index", "Index that determines physical storage order", "Grouped index", "Fast index"],
        correct: 1,
        explanation: "Clustered index determines the physical storage order of data in the table."
      },
      {
        id: 23,
        question: "Which join type can be used to find records that exist in one table but not another?",
        options: ["INNER JOIN", "LEFT JOIN with NULL check", "CROSS JOIN", "SELF JOIN"],
        correct: 1,
        explanation: "LEFT JOIN with WHERE clause checking for NULL values finds non-matching records."
      },
      {
        id: 24,
        question: "What is the purpose of the CASE statement?",
        options: ["Error handling", "Conditional logic", "Loop control", "Exception handling"],
        correct: 1,
        explanation: "CASE statement provides conditional logic, similar to if-else statements in programming."
      },
      {
        id: 25,
        question: "Which command is used to add a new column to existing table?",
        options: ["UPDATE TABLE", "MODIFY TABLE", "ALTER TABLE ADD", "INSERT COLUMN"],
        correct: 2,
        explanation: "ALTER TABLE ADD COLUMN command adds new columns to existing tables."
      },
      {
        id: 26,
        question: "What is a view in SQL?",
        options: ["Physical table", "Virtual table based on query", "Index type", "Storage method"],
        correct: 1,
        explanation: "View is a virtual table created by a stored query, doesn't physically store data."
      },
      {
        id: 27,
        question: "Which function calculates the number of rows between current and another row?",
        options: ["COUNT()", "LAG()", "LEAD()", "ROW_NUMBER()"],
        correct: 1,
        explanation: "LAG() and LEAD() access data from previous or next rows within the same result set."
      },
      {
        id: 28,
        question: "What is denormalization?",
        options: ["Removing normal forms", "Adding redundancy for performance", "Data corruption", "Index optimization"],
        correct: 1,
        explanation: "Denormalization intentionally adds redundancy to improve read performance at cost of storage."
      },
      {
        id: 29,
        question: "Which SQL clause limits the number of returned rows?",
        options: ["LIMIT", "TOP", "ROWNUM", "All of the above"],
        correct: 3,
        explanation: "Different databases use LIMIT (MySQL), TOP (SQL Server), or ROWNUM (Oracle) to limit rows."
      },
      {
        id: 30,
        question: "What is a stored procedure?",
        options: ["Saved query", "Precompiled SQL code", "Database backup", "Index type"],
        correct: 1,
        explanation: "Stored procedure is precompiled SQL code stored in database for reuse and better performance."
      }
    ],

    js: [
      {
        id: 1,
        question: "What is the output of: console.log(typeof null)?",
        options: ["null", "undefined", "object", "boolean"],
        correct: 2,
        explanation: "typeof null returns 'object' due to a historical bug in JavaScript that remains for compatibility."
      },
      {
        id: 2,
        question: "What does the 'this' keyword refer to in arrow functions?",
        options: ["The function itself", "The global object", "Lexically inherited from enclosing scope", "undefined"],
        correct: 2,
        explanation: "Arrow functions don't have their own 'this' binding; they inherit it from the enclosing scope."
      },
      {
        id: 3,
        question: "What is the difference between == and ===?",
        options: ["No difference", "=== checks type and value, == only value", "== is faster", "=== is deprecated"],
        correct: 1,
        explanation: "=== checks both type and value (strict equality), == performs type coercion before comparison."
      },
      {
        id: 4,
        question: "What is a closure in JavaScript?",
        options: ["A loop construct", "Function with access to outer scope variables", "Error handling mechanism", "Type of object"],
        correct: 1,
        explanation: "Closure is a function that has access to variables from its outer (enclosing) scope even after outer function returns."
      },
      {
        id: 5,
        question: "What does 'hoisting' mean in JavaScript?",
        options: ["Moving code up", "Variable and function declarations are moved to top of scope", "Optimization technique", "Error handling"],
        correct: 1,
        explanation: "Hoisting moves variable and function declarations to the top of their containing scope during compilation."
      },
      {
        id: 6,
        question: "What is the output of: console.log(1 + '2' + 3)?",
        options: ["6", "123", "15", "Error"],
        correct: 1,
        explanation: "1 + '2' = '12' (string concatenation), then '12' + 3 = '123' (string concatenation)."
      },
      {
        id: 7,
        question: "What is the difference between let, const, and var?",
        options: ["No difference", "Scope and reassignment rules differ", "Performance difference", "Browser compatibility"],
        correct: 1,
        explanation: "var has function scope, let/const have block scope. const cannot be reassigned, let can be."
      },
      {
        id: 8,
        question: "What is event bubbling?",
        options: ["Creating events", "Event propagation from child to parent", "Event optimization", "Event cancellation"],
        correct: 1,
        explanation: "Event bubbling is when events propagate from the target element up through its ancestors."
      },
      {
        id: 9,
        question: "What does Promise.all() do?",
        options: ["Runs promises sequentially", "Waits for all promises to resolve", "Creates multiple promises", "Cancels promises"],
        correct: 1,
        explanation: "Promise.all() waits for all promises to resolve, or rejects if any promise rejects."
      },
      {
        id: 10,
        question: "What is the difference between synchronous and asynchronous JavaScript?",
        options: ["No difference", "Sync blocks execution, async doesn't", "Async is faster", "Sync is deprecated"],
        correct: 1,
        explanation: "Synchronous code blocks execution until complete, asynchronous code doesn't block the main thread."
      },
      {
        id: 11,
        question: "What is prototypal inheritance?",
        options: ["Class-based inheritance", "Objects inherit directly from other objects", "Function inheritance", "Variable inheritance"],
        correct: 1,
        explanation: "Prototypal inheritance allows objects to inherit properties and methods directly from other objects."
      },
      {
        id: 12,
        question: "What does the bind() method do?",
        options: ["Calls function immediately", "Creates new function with specific 'this' context", "Binds variables", "Creates closures"],
        correct: 1,
        explanation: "bind() creates a new function with a specific 'this' context and optionally preset arguments."
      },
      {
        id: 13,
        question: "What is the difference between call() and apply()?",
        options: ["No difference", "call() takes individual args, apply() takes array", "apply() is faster", "call() is deprecated"],
        correct: 1,
        explanation: "call() takes arguments individually, apply() takes arguments as an array."
      },
      {
        id: 14,
        question: "What is destructuring in JavaScript?",
        options: ["Breaking objects", "Extracting values from arrays/objects", "Error handling", "Memory management"],
        correct: 1,
        explanation: "Destructuring allows extracting multiple values from arrays or objects into distinct variables."
      },
      {
        id: 15,
        question: "What is the temporal dead zone?",
        options: ["Memory leak", "Period where let/const variables exist but are uninitialized", "Performance issue", "Browser compatibility"],
        correct: 1,
        explanation: "Temporal dead zone is the period between entering scope and declaration where let/const variables can't be accessed."
      },
      {
        id: 16,
        question: "What does the spread operator (...) do?",
        options: ["Creates arrays", "Expands iterables into individual elements", "Concatenates strings", "Creates functions"],
        correct: 1,
        explanation: "Spread operator expands iterables (arrays, strings, objects) into individual elements or properties."
      },
      {
        id: 17,
        question: "What is the difference between null and undefined?",
        options: ["No difference", "null is intentional absence, undefined is uninitialized", "undefined is faster", "null is deprecated"],
        correct: 1,
        explanation: "null represents intentional absence of value, undefined means variable is declared but not assigned."
      },
      {
        id: 18,
        question: "What is a pure function?",
        options: ["Built-in function", "Function with no side effects and consistent output", "Async function", "Arrow function"],
        correct: 1,
        explanation: "Pure function has no side effects and always returns same output for same input."
      },
      {
        id: 19,
        question: "What is the event loop?",
        options: ["Type of loop", "Mechanism handling async operations", "Event creation", "DOM manipulation"],
        correct: 1,
        explanation: "Event loop manages execution of async operations by moving callbacks from task queue to call stack."
      },
      {
        id: 20,
        question: "What is memoization?",
        options: ["Memory management", "Caching function results", "Variable storage", "Function optimization"],
        correct: 1,
        explanation: "Memoization caches function results to avoid expensive recalculations for same inputs."
      },
      {
        id: 21,
        question: "What is the difference between Map and Object?",
        options: ["No difference", "Map has better performance, any key types", "Object is faster", "Map is deprecated"],
        correct: 1,
        explanation: "Map allows any key types, maintains insertion order, and has better performance for frequent additions/deletions."
      },
      {
        id: 22,
        question: "What is currying in JavaScript?",
        options: ["Spicing functions", "Converting function to take one argument at a time", "Function optimization", "Error handling"],
        correct: 1,
        explanation: "Currying transforms a function with multiple arguments into a sequence of functions taking one argument each."
      },
      {
        id: 23,
        question: "What does Array.prototype.reduce() do?",
        options: ["Reduces array size", "Applies function against accumulator and each element", "Filters array", "Sorts array"],
        correct: 1,
        explanation: "reduce() applies a function against an accumulator and each element to reduce array to single value."
      },
      {
        id: 24,
        question: "What is the difference between forEach and map?",
        options: ["No difference", "map returns new array, forEach doesn't", "forEach is faster", "map is deprecated"],
        correct: 1,
        explanation: "map() returns a new array with transformed elements, forEach() just iterates without returning anything."
      },
      {
        id: 25,
        question: "What is a generator function?",
        options: ["Function creator", "Function that can pause and resume execution", "Async function", "Arrow function"],
        correct: 1,
        explanation: "Generator function can pause execution with yield and resume later, useful for creating iterators."
      },
      {
        id: 26,
        question: "What is the difference between setTimeout and setInterval?",
        options: ["No difference", "setTimeout runs once, setInterval repeats", "setInterval is faster", "setTimeout is deprecated"],
        correct: 1,
        explanation: "setTimeout executes function once after delay, setInterval executes function repeatedly at intervals."
      },
      {
        id: 27,
        question: "What is object property descriptor?",
        options: ["Object description", "Metadata about object properties", "Property type", "Property value"],
        correct: 1,
        explanation: "Property descriptor defines metadata about object properties like writable, enumerable, configurable."
      },
      {
        id: 28,
        question: "What is the difference between slice and splice?",
        options: ["No difference", "slice doesn't modify original, splice does", "splice is faster", "slice is deprecated"],
        correct: 1,
        explanation: "slice() returns new array without modifying original, splice() modifies original array."
      },
      {
        id: 29,
        question: "What is a WeakMap?",
        options: ["Weak reference map", "Map with weak key references allowing garbage collection", "Small map", "Temporary map"],
        correct: 1,
        explanation: "WeakMap holds weak references to keys, allowing garbage collection when keys are no longer referenced elsewhere."
      },
      {
        id: 30,
        question: "What is the difference between async/await and Promises?",
        options: ["No difference", "async/await provides cleaner syntax for Promises", "Promises are faster", "async/await is deprecated"],
        correct: 1,
        explanation: "async/await is syntactic sugar over Promises, providing cleaner, more readable asynchronous code."
      }
    ],
    
    reactjs: [
      { id: 1, question: "What is the correct way to create a functional component in React?", options: ["function MyComponent() { return <div>Hello</div>; }", "const MyComponent = () => { return <div>Hello</div>; }", "class MyComponent extends React.Component { render() { return <div>Hello</div>; } }", "Both A and B"], correct: 3, explanation: "Both function declarations and arrow functions can be used to create functional components in React." },
      { id: 2, question: "Which hook is used to manage state in functional components?", options: ["useEffect", "useState", "useContext", "useReducer"], correct: 1, explanation: "useState is the primary hook for managing local state in functional components." },
      { id: 3, question: "What is the purpose of the useEffect hook?", options: ["To manage state", "To handle side effects", "To create refs", "To optimize performance"], correct: 1, explanation: "useEffect is used to perform side effects like API calls, subscriptions, or manually changing the DOM." },
      { id: 4, question: "What is JSX?", options: ["JavaScript XML", "Java Syntax Extension", "JavaScript Extension", "JSON XML"], correct: 0, explanation: "JSX stands for JavaScript XML and allows you to write HTML-like syntax in JavaScript." },
      { id: 5, question: "Which method is called when a component is first mounted?", options: ["componentDidUpdate", "componentWillUnmount", "componentDidMount", "componentWillMount"], correct: 2, explanation: "componentDidMount is called after the component is mounted and inserted into the DOM tree." },
      { id: 6, question: "What is the correct way to pass props to a component?", options: ["<MyComponent prop='value' />", "<MyComponent {prop: 'value'} />", "<MyComponent prop={'value'} />", "Both A and C"], correct: 3, explanation: "Props can be passed using either string literals or JSX expressions wrapped in curly braces." },
      { id: 7, question: "What is the Virtual DOM?", options: ["A real DOM element", "A JavaScript representation of the real DOM", "A CSS framework", "A database"], correct: 1, explanation: "Virtual DOM is a JavaScript representation of the real DOM that React uses for efficient updates." },
      { id: 8, question: "Which hook is used to access context in functional components?", options: ["useContext", "useState", "useEffect", "useReducer"], correct: 0, explanation: "useContext hook is used to consume context values in functional components." },
      { id: 9, question: "What is the correct way to handle events in React?", options: ["onclick='handleClick()'", "onClick={handleClick}", "onClick='handleClick()'", "onCLick={handleClick()}"], correct: 1, explanation: "Event handlers in React use camelCase and should be passed as references, not called immediately." },
      { id: 10, question: "What is a controlled component?", options: ["A component that controls other components", "A component whose form data is handled by React state", "A component with no state", "A component that controls the DOM directly"], correct: 1, explanation: "A controlled component is one where form data is handled by React state rather than the DOM." },
      { id: 11, question: "What is the purpose of keys in React lists?", options: ["To style list items", "To help React identify which items have changed", "To sort the list", "To filter the list"], correct: 1, explanation: "Keys help React identify which items have changed, are added, or are removed for efficient re-rendering." },
      { id: 12, question: "Which lifecycle method is used to update state when props change?", options: ["componentDidUpdate", "getDerivedStateFromProps", "componentWillReceiveProps", "shouldComponentUpdate"], correct: 1, explanation: "getDerivedStateFromProps is the modern way to update state when props change." },
      { id: 13, question: "What is the correct way to update state in a class component?", options: ["this.state.count = 1", "this.setState({count: 1})", "this.state = {count: 1}", "setState({count: 1})"], correct: 1, explanation: "State should always be updated using this.setState() method in class components." },
      { id: 14, question: "What is prop drilling?", options: ["Creating new props", "Passing props through multiple component levels", "Validating props", "Deleting props"], correct: 1, explanation: "Prop drilling refers to passing props through multiple component levels to reach a deeply nested component." },
      { id: 15, question: "Which hook is used for performance optimization by memoizing expensive calculations?", options: ["useCallback", "useMemo", "useEffect", "useState"], correct: 1, explanation: "useMemo is used to memoize expensive calculations and only recalculate when dependencies change." },
      { id: 16, question: "What is the purpose of useCallback hook?", options: ["To manage state", "To memoize functions", "To handle side effects", "To create refs"], correct: 1, explanation: "useCallback is used to memoize functions to prevent unnecessary re-renders of child components." },
      { id: 17, question: "What is the correct way to create a ref in functional components?", options: ["React.createRef()", "useRef()", "createRef()", "ref()"], correct: 1, explanation: "useRef() is the hook used to create refs in functional components." },
      { id: 18, question: "What is React.Fragment used for?", options: ["Creating components", "Grouping elements without adding extra DOM nodes", "Managing state", "Handling events"], correct: 1, explanation: "React.Fragment allows you to group multiple elements without adding an extra DOM node." },
      { id: 19, question: "What is the difference between state and props?", options: ["No difference", "State is mutable, props are immutable", "Props are mutable, state is immutable", "Both are immutable"], correct: 1, explanation: "State is mutable and managed within the component, while props are immutable and passed from parent components." },
      { id: 20, question: "What is conditional rendering in React?", options: ["Rendering components based on conditions", "Rendering all components", "Rendering no components", "Rendering components randomly"], correct: 0, explanation: "Conditional rendering is the practice of rendering different components or elements based on certain conditions." },
      { id: 21, question: "What is the purpose of React.StrictMode?", options: ["To enforce strict typing", "To highlight potential problems in an application", "To improve performance", "To handle errors"], correct: 1, explanation: "React.StrictMode is a tool for highlighting potential problems in an application during development." },
      { id: 22, question: "What is a higher-order component (HOC)?", options: ["A component at the top of the hierarchy", "A function that takes a component and returns a new component", "A component with high performance", "A component with many props"], correct: 1, explanation: "A HOC is a function that takes a component and returns a new component with enhanced functionality." },
      { id: 23, question: "What is the correct way to handle forms in React?", options: ["Using uncontrolled components only", "Using controlled components only", "Using both controlled and uncontrolled components", "Using vanilla JavaScript"], correct: 2, explanation: "React supports both controlled and uncontrolled components for handling forms, each with their own use cases." },
      { id: 24, question: "What is the purpose of defaultProps?", options: ["To set default values for props", "To validate props", "To pass props to children", "To create new props"], correct: 0, explanation: "defaultProps is used to set default values for props in case they are not provided by the parent component." },
      { id: 25, question: "What is the correct way to handle asynchronous operations in useEffect?", options: ["Make useEffect async", "Create an async function inside useEffect", "Use promises directly", "Both B and C"], correct: 3, explanation: "useEffect cannot be async, but you can create async functions inside it or use promises directly." },
      { id: 26, question: "What is React.memo used for?", options: ["Memorizing values", "Optimizing functional components", "Creating memos", "Managing memory"], correct: 1, explanation: "React.memo is a higher-order component that memoizes functional components to prevent unnecessary re-renders." },
      { id: 27, question: "What is the purpose of the dependency array in useEffect?", options: ["To list all variables", "To control when the effect runs", "To pass data to the effect", "To handle errors"], correct: 1, explanation: "The dependency array controls when the useEffect runs by specifying which values it depends on." },
      { id: 28, question: "What is the correct way to handle errors in React components?", options: ["try-catch blocks", "Error boundaries", "console.error", "window.onerror"], correct: 1, explanation: "Error boundaries are React components that catch JavaScript errors anywhere in their child component tree." },
      { id: 29, question: "What is the purpose of useReducer hook?", options: ["To reduce component size", "To manage complex state logic", "To reduce re-renders", "To reduce bundle size"], correct: 1, explanation: "useReducer is used for managing complex state logic that involves multiple sub-values or when the next state depends on the previous one." },
      { id: 30, question: "What is the correct way to optimize React app performance?", options: ["Use only class components", "Use React.memo, useMemo, and useCallback", "Avoid using hooks", "Use inline functions everywhere"], correct: 1, explanation: "Performance optimization in React involves using React.memo, useMemo, useCallback, and avoiding unnecessary re-renders." }
    ],

    mathsAptitude: [
      { id: 1, question: "If 3x + 7 = 22, what is the value of x?", options: ["3", "5", "7", "15"], correct: 1, explanation: "3x + 7 = 22, so 3x = 15, therefore x = 5" },
      { id: 2, question: "What is 15% of 200?", options: ["25", "30", "35", "40"], correct: 1, explanation: "15% of 200 = (15/100) × 200 = 30" },
      { id: 3, question: "If a train travels 240 km in 4 hours, what is its average speed?", options: ["50 km/h", "60 km/h", "70 km/h", "80 km/h"], correct: 1, explanation: "Speed = Distance/Time = 240/4 = 60 km/h" },
      { id: 4, question: "What is the next number in the sequence: 2, 6, 18, 54, ?", options: ["108", "162", "216", "270"], correct: 1, explanation: "Each number is multiplied by 3: 2×3=6, 6×3=18, 18×3=54, 54×3=162" },
      { id: 5, question: "If the area of a square is 64 sq cm, what is its perimeter?", options: ["16 cm", "24 cm", "32 cm", "48 cm"], correct: 2, explanation: "Side = √64 = 8 cm, Perimeter = 4 × 8 = 32 cm" },
      { id: 6, question: "What is the value of 2^5?", options: ["10", "16", "25", "32"], correct: 3, explanation: "2^5 = 2 × 2 × 2 × 2 × 2 = 32" },
      { id: 7, question: "If 20% of a number is 40, what is the number?", options: ["160", "180", "200", "220"], correct: 2, explanation: "Let the number be x. 20% of x = 40, so x = 40 × (100/20) = 200" },
      { id: 8, question: "What is the LCM of 12 and 18?", options: ["30", "36", "54", "72"], correct: 1, explanation: "LCM of 12 and 18 = 36 (12 = 2²×3, 18 = 2×3², LCM = 2²×3² = 36)" },
      { id: 9, question: "If a circle has a radius of 7 cm, what is its area? (Use π = 22/7)", options: ["154 sq cm", "144 sq cm", "164 sq cm", "174 sq cm"], correct: 0, explanation: "Area = πr² = (22/7) × 7² = (22/7) × 49 = 154 sq cm" },
      { id: 10, question: "What is the sum of interior angles of a hexagon?", options: ["540°", "720°", "900°", "1080°"], correct: 1, explanation: "Sum of interior angles = (n-2) × 180° = (6-2) × 180° = 720°" },
      { id: 11, question: "If log₂8 = x, what is the value of x?", options: ["2", "3", "4", "8"], correct: 1, explanation: "log₂8 = x means 2^x = 8, so 2³ = 8, therefore x = 3" },
      { id: 12, question: "What is the median of the numbers: 3, 7, 2, 9, 5, 1, 8?", options: ["5", "6", "7", "8"], correct: 0, explanation: "Arranged in order: 1, 2, 3, 5, 7, 8, 9. The median (middle value) is 5" },
      { id: 13, question: "If sin θ = 3/5, what is cos θ? (θ is acute)", options: ["3/5", "4/5", "5/3", "5/4"], correct: 1, explanation: "Using Pythagorean theorem: cos²θ + sin²θ = 1, so cos²θ = 1 - 9/25 = 16/25, cos θ = 4/5" },
      { id: 14, question: "What is the derivative of x³ + 2x²?", options: ["3x² + 2x", "3x² + 4x", "x² + 4x", "3x + 4"], correct: 1, explanation: "d/dx(x³ + 2x²) = 3x² + 4x" },
      { id: 15, question: "If a bag contains 5 red balls and 3 blue balls, what is the probability of drawing a red ball?", options: ["3/8", "5/8", "3/5", "5/3"], correct: 1, explanation: "Probability = Number of red balls / Total balls = 5/(5+3) = 5/8" },
      { id: 16, question: "What is the value of ∫x²dx?", options: ["x³/3 + C", "2x + C", "x³ + C", "3x² + C"], correct: 0, explanation: "∫x²dx = x³/3 + C, where C is the constant of integration" },
      { id: 17, question: "If matrix A = [2 3; 1 4], what is det(A)?", options: ["5", "8", "11", "14"], correct: 0, explanation: "det(A) = (2×4) - (3×1) = 8 - 3 = 5" },
      { id: 18, question: "What is the equation of a line passing through (2,3) with slope 2?", options: ["y = 2x - 1", "y = 2x + 1", "y = x + 1", "y = 3x - 3"], correct: 0, explanation: "Using y - y₁ = m(x - x₁): y - 3 = 2(x - 2), so y = 2x - 1" },
      { id: 19, question: "What is the standard deviation of the dataset: 2, 4, 6, 8?", options: ["√5", "√2", "2", "√10"], correct: 0, explanation: "Mean = 5, Variance = [(2-5)² + (4-5)² + (6-5)² + (8-5)²]/4 = 5, SD = √5" },
      { id: 20, question: "If 2ˣ = 16, what is the value of x?", options: ["2", "3", "4", "8"], correct: 2, explanation: "2ˣ = 16 = 2⁴, therefore x = 4" },
      { id: 21, question: "What is the sum of the first 10 natural numbers?", options: ["45", "50", "55", "60"], correct: 2, explanation: "Sum = n(n+1)/2 = 10(11)/2 = 55" },
      { id: 22, question: "If the ratio of two numbers is 3:4 and their sum is 35, what is the larger number?", options: ["15", "20", "25", "30"], correct: 1, explanation: "Let numbers be 3x and 4x. 3x + 4x = 35, so 7x = 35, x = 5. Larger number = 4×5 = 20" },
      { id: 23, question: "What is the volume of a cube with side length 5 cm?", options: ["25 cm³", "75 cm³", "100 cm³", "125 cm³"], correct: 3, explanation: "Volume of cube = side³ = 5³ = 125 cm³" },
      { id: 24, question: "If f(x) = 2x + 3, what is f(5)?", options: ["10", "11", "12", "13"], correct: 3, explanation: "f(5) = 2(5) + 3 = 10 + 3 = 13" },
      { id: 25, question: "What is the HCF of 48 and 72?", options: ["12", "18", "24", "36"], correct: 2, explanation: "48 = 2⁴×3, 72 = 2³×3². HCF = 2³×3 = 24" },
      { id: 26, question: "If tan θ = 1, what is the value of θ (in degrees)?", options: ["30°", "45°", "60°", "90°"], correct: 1, explanation: "tan 45° = 1, so θ = 45°" },
      { id: 27, question: "What is the distance between points (1,2) and (4,6)?", options: ["3", "4", "5", "7"], correct: 2, explanation: "Distance = √[(4-1)² + (6-2)²] = √[9 + 16] = √25 = 5" },
      { id: 28, question: "If a polynomial has roots 2 and 3, what could be the polynomial?", options: ["x² - 5x + 6", "x² + 5x + 6", "x² - 5x - 6", "x² + 5x - 6"], correct: 0, explanation: "If roots are 2 and 3, polynomial is (x-2)(x-3) = x² - 5x + 6" },
      { id: 29, question: "What is the limit of (x² - 4)/(x - 2) as x approaches 2?", options: ["0", "2", "4", "undefined"], correct: 2, explanation: "Factoring: (x-2)(x+2)/(x-2) = x+2. As x→2, limit = 2+2 = 4" },
      { id: 30, question: "If A = {1,2,3} and B = {2,3,4}, what is A ∩ B?", options: ["{1}", "{2,3}", "{4}", "{1,2,3,4}"], correct: 1, explanation: "A ∩ B represents elements common to both sets, which are {2,3}" }
    ],



    OsAndCn:[
  {
    id: 1,
    question: "What is the primary function of an operating system?",
    options: ["Compile programs", "Manage hardware and software resources", "Design user interfaces", "Debug applications"],
    correct: 1,
    explanation: "The primary function of an OS is to manage hardware and software resources, acting as an intermediary between users and computer hardware."
  },
  {
    id: 2,
    question: "In the OSI model, which layer is responsible for routing?",
    options: ["Physical Layer", "Data Link Layer", "Network Layer", "Transport Layer"],
    correct: 2,
    explanation: "The Network Layer (Layer 3) is responsible for routing packets between different networks using IP addresses."
  },
  {
    id: 3,
    question: "What is a deadlock in operating systems?",
    options: ["A process that runs indefinitely", "A situation where processes wait for each other indefinitely", "A memory leak", "A scheduling algorithm"],
    correct: 1,
    explanation: "A deadlock occurs when two or more processes are blocked forever, waiting for each other to release resources."
  },
  {
    id: 4,
    question: "Which protocol operates at the Transport Layer?",
    options: ["HTTP", "IP", "TCP", "Ethernet"],
    correct: 2,
    explanation: "TCP (Transmission Control Protocol) operates at the Transport Layer, providing reliable data transmission."
  },
  {
    id: 5,
    question: "What is the purpose of virtual memory?",
    options: ["Increase CPU speed", "Allow programs larger than physical memory to run", "Improve disk performance", "Enhance network speed"],
    correct: 1,
    explanation: "Virtual memory allows the system to run programs that require more memory than physically available by using disk space as extended memory."
  },
  {
    id: 6,
    question: "What is the default port number for HTTP?",
    options: ["21", "23", "80", "443"],
    correct: 2,
    explanation: "HTTP uses port 80 as its default port number for web communication."
  },
  {
    id: 7,
    question: "Which scheduling algorithm can cause starvation?",
    options: ["Round Robin", "First Come First Serve", "Shortest Job First", "Priority Scheduling"],
    correct: 3,
    explanation: "Priority Scheduling can cause starvation where low-priority processes may never get executed if high-priority processes keep arriving."
  },
  {
    id: 8,
    question: "What does DNS stand for?",
    options: ["Domain Name System", "Data Network Service", "Digital Network Security", "Dynamic Name Server"],
    correct: 0,
    explanation: "DNS stands for Domain Name System, which translates domain names to IP addresses."
  },
  {
    id: 9,
    question: "What is thrashing in operating systems?",
    options: ["High CPU utilization", "Excessive paging activity", "Memory corruption", "Process synchronization"],
    correct: 1,
    explanation: "Thrashing occurs when the system spends more time paging than executing processes due to insufficient physical memory."
  },
  {
    id: 10,
    question: "Which of the following is a connectionless protocol?",
    options: ["TCP", "UDP", "HTTP", "FTP"],
    correct: 1,
    explanation: "UDP (User Datagram Protocol) is connectionless, meaning it doesn't establish a connection before sending data."
  },
  {
    id: 11,
    question: "What is a semaphore in operating systems?",
    options: ["A type of memory", "A synchronization primitive", "A scheduling algorithm", "A file system"],
    correct: 1,
    explanation: "A semaphore is a synchronization primitive used to control access to shared resources by multiple processes."
  },
  {
    id: 12,
    question: "What is the maximum number of hosts in a Class C network?",
    options: ["254", "256", "65534", "16777214"],
    correct: 0,
    explanation: "A Class C network has 8 host bits, allowing 2^8 - 2 = 254 hosts (excluding network and broadcast addresses)."
  },
  {
    id: 13,
    question: "Which memory allocation technique suffers from external fragmentation?",
    options: ["Paging", "Segmentation", "Fixed partitioning", "All of the above"],
    correct: 1,
    explanation: "Segmentation suffers from external fragmentation as variable-sized segments create unusable gaps in memory."
  },
  {
    id: 14,
    question: "What is the purpose of ARP protocol?",
    options: ["Route packets", "Resolve IP to MAC address", "Encrypt data", "Compress data"],
    correct: 1,
    explanation: "ARP (Address Resolution Protocol) resolves IP addresses to MAC addresses in local networks."
  },
  {
    id: 15,
    question: "What is a race condition?",
    options: ["CPU scheduling conflict", "Memory access violation", "Outcome depends on timing of events", "Network congestion"],
    correct: 2,
    explanation: "A race condition occurs when the outcome of a program depends on the relative timing of events, such as thread execution order."
  },
  {
    id: 16,
    question: "Which layer of OSI model handles error detection and correction?",
    options: ["Physical Layer", "Data Link Layer", "Network Layer", "Session Layer"],
    correct: 1,
    explanation: "The Data Link Layer is responsible for error detection and correction in transmitted frames."
  },
  {
    id: 17,
    question: "What is the Banker's algorithm used for?",
    options: ["CPU scheduling", "Memory management", "Deadlock avoidance", "File allocation"],
    correct: 2,
    explanation: "The Banker's algorithm is used for deadlock avoidance by ensuring the system never enters an unsafe state."
  },
  {
    id: 18,
    question: "What is the default subnet mask for Class B network?",
    options: ["255.0.0.0", "255.255.0.0", "255.255.255.0", "255.255.255.255"],
    correct: 1,
    explanation: "Class B networks use a default subnet mask of 255.255.0.0 (/16), providing 16 network bits and 16 host bits."
  },
  {
    id: 19,
    question: "What is the difference between preemptive and non-preemptive scheduling?",
    options: ["Memory usage", "CPU can/cannot be taken away from running process", "Priority levels", "Queue implementation"],
    correct: 1,
    explanation: "In preemptive scheduling, the CPU can be taken away from a running process, while in non-preemptive scheduling, it cannot."
  },
  {
    id: 20,
    question: "Which protocol is used for secure web communication?",
    options: ["HTTP", "HTTPS", "FTP", "SMTP"],
    correct: 1,
    explanation: "HTTPS (HTTP Secure) is used for secure web communication, encrypting data using SSL/TLS protocols."
  },
  {
    id: 21,
    question: "What is internal fragmentation?",
    options: ["Unused space within allocated memory blocks", "Gaps between allocated blocks", "Memory corruption", "Stack overflow"],
    correct: 0,
    explanation: "Internal fragmentation refers to unused space within allocated memory blocks, common in fixed-size allocation schemes."
  },
  {
    id: 22,
    question: "What is the purpose of ICMP protocol?",
    options: ["File transfer", "Error reporting and diagnostics", "Email transmission", "Web browsing"],
    correct: 1,
    explanation: "ICMP (Internet Control Message Protocol) is used for error reporting and network diagnostics, like ping and traceroute."
  },
  {
    id: 23,
    question: "What is a critical section in process synchronization?",
    options: ["High priority code", "Code that accesses shared resources", "Error handling code", "Initialization code"],
    correct: 1,
    explanation: "A critical section is a code segment that accesses shared resources and must be executed by only one process at a time."
  },
  {
    id: 24,
    question: "What does TTL stand for in networking?",
    options: ["Time To Live", "Total Transfer Length", "Transmission Time Limit", "Terminal Transfer Layer"],
    correct: 0,
    explanation: "TTL stands for Time To Live, indicating the maximum time a packet can exist in the network before being discarded."
  },
  {
    id: 25,
    question: "What is the main advantage of multithreading?",
    options: ["Reduced memory usage", "Better resource utilization and responsiveness", "Simpler programming", "Faster disk access"],
    correct: 1,
    explanation: "Multithreading provides better resource utilization and application responsiveness by allowing concurrent execution of tasks."
  },
  {
    id: 26,
    question: "Which routing algorithm is used by RIP protocol?",
    options: ["Link State", "Distance Vector", "Path Vector", "Hybrid"],
    correct: 1,
    explanation: "RIP (Routing Information Protocol) uses the Distance Vector routing algorithm with hop count as the metric."
  },
  {
    id: 27,
    question: "What is the purpose of system calls?",
    options: ["Compile programs", "Interface between user programs and OS kernel", "Debug applications", "Manage memory"],
    correct: 1,
    explanation: "System calls provide an interface between user programs and the operating system kernel for accessing system resources."
  },
  {
    id: 28,
    question: "What is the default port for HTTPS?",
    options: ["80", "443", "21", "25"],
    correct: 1,
    explanation: "HTTPS uses port 443 as its default port for secure web communication."
  },
  {
    id: 29,
    question: "What is page replacement algorithm?",
    options: ["CPU scheduling method", "Memory management technique", "File organization method", "Network routing strategy"],
    correct: 1,
    explanation: "Page replacement algorithms are memory management techniques used to decide which pages to swap out when physical memory is full."
  },
  {
    id: 30,
    question: "What is the purpose of NAT (Network Address Translation)?",
    options: ["Encrypt data", "Translate private IPs to public IPs", "Route packets", "Detect errors"],
    correct: 1,
    explanation: "NAT translates private IP addresses to public IP addresses, allowing multiple devices to share a single public IP."
  },
  {
    id: 31,
    question: "What is a zombie process?",
    options: ["A malicious process", "A terminated process whose entry still exists", "A sleeping process", "A high priority process"],
    correct: 1,
    explanation: "A zombie process is a terminated process whose entry still exists in the process table until the parent process reads its exit status."
  },
  {
    id: 32,
    question: "Which protocol is used for email retrieval?",
    options: ["SMTP", "POP3", "HTTP", "FTP"],
    correct: 1,
    explanation: "POP3 (Post Office Protocol version 3) is commonly used for retrieving emails from mail servers."
  },
  {
    id: 33,
    question: "What is the working set in memory management?",
    options: ["Total memory size", "Set of pages currently in use by a process", "Available memory", "Swap space"],
    correct: 1,
    explanation: "The working set is the set of pages that a process is currently using and should be kept in memory for optimal performance."
  },
  {
    id: 34,
    question: "What is the purpose of DHCP?",
    options: ["Domain name resolution", "Automatic IP address assignment", "File transfer", "Email routing"],
    correct: 1,
    explanation: "DHCP (Dynamic Host Configuration Protocol) automatically assigns IP addresses and network configuration to devices."
  },
  {
    id: 35,
    question: "What is the difference between mutex and semaphore?",
    options: ["No difference", "Mutex is binary, semaphore can count", "Mutex is faster", "Semaphore is more secure"],
    correct: 1,
    explanation: "A mutex is binary (locked/unlocked) while a semaphore can count multiple resources and allow multiple accesses up to its limit."
  },
  {
    id: 36,
    question: "Which layer is responsible for data encryption in OSI model?",
    options: ["Physical Layer", "Session Layer", "Presentation Layer", "Application Layer"],
    correct: 2,
    explanation: "The Presentation Layer is responsible for data encryption, compression, and translation between different data formats."
  },
  {
    id: 37,
    question: "What is memory compaction?",
    options: ["Reducing memory size", "Moving allocated blocks to eliminate fragmentation", "Compressing data", "Clearing cache"],
    correct: 1,
    explanation: "Memory compaction moves all allocated memory blocks together to eliminate external fragmentation and create larger free blocks."
  },
  {
    id: 38,
    question: "What is the maximum segment size in TCP?",
    options: ["1024 bytes", "1500 bytes", "65535 bytes", "Variable based on network"],
    correct: 3,
    explanation: "TCP Maximum Segment Size (MSS) is variable and depends on the network's Maximum Transmission Unit (MTU), typically 1460 bytes for Ethernet."
  },
  {
    id: 39,
    question: "What is demand paging?",
    options: ["Loading all pages at startup", "Loading pages only when needed", "Preloading frequently used pages", "Caching pages in memory"],
    correct: 1,
    explanation: "Demand paging loads pages into memory only when they are actually needed, reducing initial load time and memory usage."
  },
  {
    id: 40,
    question: "What is the purpose of sliding window protocol?",
    options: ["Error detection", "Flow control", "Routing", "Addressing"],
    correct: 1,
    explanation: "Sliding window protocol provides flow control by allowing the sender to transmit multiple frames before receiving acknowledgments."
  },
  {
    id: 41,
    question: "What is process starvation?",
    options: ["Process using too much memory", "Process never getting CPU time", "Process executing too slowly", "Process waiting for I/O"],
    correct: 1,
    explanation: "Process starvation occurs when a process never gets CPU time to execute, often due to unfair scheduling algorithms."
  },
  {
    id: 42,
    question: "What is CSMA/CD used for?",
    options: ["Routing", "Medium access control in Ethernet", "Error correction", "Data encryption"],
    correct: 1,
    explanation: "CSMA/CD (Carrier Sense Multiple Access with Collision Detection) is used for medium access control in traditional Ethernet networks."
  },
  {
    id: 43,
    question: "What is the purpose of file allocation table (FAT)?",
    options: ["Store file permissions", "Track file block locations", "Compress files", "Encrypt file data"],
    correct: 1,
    explanation: "The File Allocation Table (FAT) keeps track of which disk blocks are allocated to which files and which blocks are free."
  },
  {
    id: 44,
    question: "What is the difference between hub and switch?",
    options: ["No difference", "Hub operates at physical layer, switch at data link layer", "Hub is faster", "Switch is cheaper"],
    correct: 1,
    explanation: "A hub operates at the physical layer and broadcasts to all ports, while a switch operates at the data link layer and sends frames only to the intended recipient."
  },
  {
    id: 45,
    question: "What is copy-on-write in operating systems?",
    options: ["File backup mechanism", "Memory optimization technique", "Process scheduling method", "Disk allocation strategy"],
    correct: 1,
    explanation: "Copy-on-write is a memory optimization technique where pages are shared until one process modifies them, then a copy is created."
  }
]

  };