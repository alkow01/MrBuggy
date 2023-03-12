# MrBuggy
Automation tests in Cypress for test functionality in MrBuggy 2 app

## 1. Description of the project and purpose of testing

      MrBuggy 2 was used to learn automation with Cypress.
      MrBuggy are applications and specifications specially created to verify knowledge and testing skills.
      On the basis of the MrBuggy 2 application and shared user stories, test cases were created, which were then used to create Cypress automated test scripts.
      Various functions have been tested, such as: sending messages, creating a new project, logging in to the app, etc. The number of test scripts will systematically         increase with new tests

## 2. Tips and recommendations

      Here are some best practices for writing tests in Cypress:
      
     	1. When writing tests, focus on functionality testing, not UI testing. This way the tests will be more stable and not dependent on implementation details.
		2. Tests should be written in a modular and maintainable way. For this purpose, it is worth using assertions that check a specific state or behavior, not a 		specific element on the page.
		3. It is worth writing tests that are repeatable and independent of each other.
		4. It is worth to write tests that are flexible and easy to configure. For this purpose, it is worth using variables and configuration files that allow you to 		adapt tests to different environments and scenarios.
		5. It is worth writing tests that comply with the principles of TDD (Test Driven Development) and BDD (Behavior Driven Development). This approach means that 		tests are written before the application code and allows for faster detection of errors and defects.
		
## 3. Improvements 

      1. Due to limitations in the application code, selectors were referenced in test scripts in a way that was inconsistent with best practices, according to which the use of data-* attributes isolates the selectors from changes in CSS or JS.
      2. All random number generators should be moved to the command file in the support folder so as not to repeat the code

	
## 4. About me
	
      Experienced chemist associated with quality control. I want to transfer my knowledge to the IT industry. 
      Software testing and sample testing/analyzing have many connections. 
      Even the vocabulary used is similar: validation, retest, quality assurance and control, reporting of results. 
      Undoubtedly, these two worlds can merge. 



      
