Manage URL
==========

Library to manage any kind of URLs

Feature:
1. 2 Different URLs string but same page
	1.1 Query Segment rearranged
	1.2 Redirection [HTTP specific]
	1.3 Different no. of key-value pairs in query segment
	1.4 With or without port in authority
	1.5 Case verification
	1.6 Dot and Double dot handling in path
2. Classify Pages
	2.1 Normal (11)
		2.1.1 Has been modified or not
	2.2 Special [requires login or some other action] (10)
	2.3 Doesn't exist (00,01)