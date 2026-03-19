"""palindrpme.py

Palindrome checker using two-pointer in-place algorithm.

This version does NOT build a cleaned string: it skips invalid characters
on the fly and compares characters directly. Time O(n), space O(1).
"""

def is_palindrome(s: str) -> bool:
	"""Return True if `s` is a palindrome considering only alphanumeric chars.

	Uses two pointers moving inward, skipping non-alphanumeric chars and
	comparing characters case-insensitively.
	"""
	left, right = 0, len(s) - 1
	while left < right:
		# advance left until alnum or cross
		while left < right and not s[left].isalnum():
			left += 1
		# advance right until alnum or cross
		while left < right and not s[right].isalnum():
			right -= 1

		if left < right:
			if s[left].lower() != s[right].lower():
				return False
			left += 1
			right -= 1

	return True


if __name__ == '__main__':
	test = "///a man, a plan, a canal: Panama"
	result = is_palindrome(test)
	print('Original:', test)
	print('Is palindrome?:', result)

