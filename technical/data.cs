using System;
using System.Collections.Generic;

// Simple Max-Heap outline for a priority-queue (highest-priority first).
// - Data structure: Binary Max-Heap (array-backed)
// - Insert (add new task): O(log n) time
// - ExtractMax (remove highest-priority): O(log n) time
public class MaxHeap<T> where T : IComparable<T>
{
	private List<T> heap = new List<T>();

	public int Count => heap.Count;

	// Insert a new item (task) into the heap.
	// Complexity: O(log n)
	public void Insert(T item)
	{
		heap.Add(item);
		BubbleUp(heap.Count - 1);
	}

	// Return the max (highest-priority) without removing it.
	public T Peek()
	{
		if (Count == 0) throw new InvalidOperationException("Heap is empty");
		return heap[0];
	}

	// Remove and return the highest-priority item.
	// Complexity: O(log n)
	public T ExtractMax()
	{
		if (Count == 0) throw new InvalidOperationException("Heap is empty");
		T max = heap[0];
		int last = heap.Count - 1;
		heap[0] = heap[last];
		heap.RemoveAt(last);
		if (Count > 0) SiftDown(0);
		return max;
	}

	// Move the element at index up until heap property is restored.
	// Called after inserting a new element at the end.
	private void BubbleUp(int index)
	{
		while (index > 0)
		{
			int parent = (index - 1) / 2;
			if (heap[parent].CompareTo(heap[index]) < 0)
			{
				Swap(parent, index);
				index = parent;
			}
			else
			{
				break;
			}
		}
	}

	// Move the element at index down until heap property is restored.
	// Called after removing the root and moving last element to root.
	private void SiftDown(int index)
	{
		int n = heap.Count;
		while (true)
		{
			int left = 2 * index + 1;
			int right = 2 * index + 2;
			int largest = index;

			if (left < n && heap[left].CompareTo(heap[largest]) > 0)
				largest = left;
			if (right < n && heap[right].CompareTo(heap[largest]) > 0)
				largest = right;

			if (largest == index) break;

			Swap(index, largest);
			index = largest;
		}
	}

	private void Swap(int i, int j)
	{
		T tmp = heap[i];
		heap[i] = heap[j];
		heap[j] = tmp;
	}
}

/*
 Summary answer to the question:
 - Data structure: Binary Max-Heap (implements a priority queue where highest-priority task is at the root).
 - Time complexities: Insert -> O(log n); Extract highest-priority (ExtractMax) -> O(log n).
*/

