*The goal of this take-home project is to provide an introduction to the type of data we’re working with and expose you to a few key concepts of our platform. You’ll be walking through your work with a member of our team.* 

*The project is intentionally designed to be open-ended and language agnostic. You could pretty easily spend 40+ hours making the perfect system, but that’s not required. The expectation is that you spend 4 hours on it and document the things you’d like to do, but did not have time for. We want to see work that you are proud of and excited to share with others.*

**Automated Quality Check for Traffic Signs**

### **Motivation:**

Our customers expect extremely high-quality tasks (see here for how Scale defines a task: [https://docs.scale.com/reference/tasks-object-overview](https://docs.scale.com/reference/tasks-object-overview)  ) to be returned to them. When we have large pipelines with hundreds of thousands of images being labeled by humans, it can make sense to add some programmatic quality checks to ensure we’re hitting the customer’s quality bar and nothing really bad can slip through. 

The tasker marketplace annotating images can be adversarial at times, with people trying to game the system, submit fraud, or otherwise just speed through the tasks we need to be done. They’re also human, so sometimes, even our best taskers can make a mistake here or there.

We do these automated quality checks extensively across our product types today as one way to ensure quality is where it needs to be.

### **The Project:**

Introducing **ObserveSign**, the latest imaginary tech startup to raise $20M to help the autonomous vehicle industry detect and understand traffic signals. They’ve enlisted the help of Scale AI to label 250k images to help train their ML models. 

They’ve given Scale their project guidelines here:  
[Traffic Sign Spec Document](https://docs.google.com/document/d/1iVf4lVqOeJMxwJEQXSgg6w_8vIzPrx4lmeUGv-zw35c)

We’ve already had humans label their tasks and have them ready to send back to them.

Before we send them back, we want your help writing **1** quality check that can flag potential human-made errors. Your check should be useful, such that the results allow reviewers to quickly validate and correct your reported issues.

### **Phase 1 | Task Retrieval:**

You may log in to their account to review and access the completed task responses:

**Email:** [fieldengineering+observesign@scale.com](mailto:fieldengineering+observesign@scale.com)  
**Password:** 8sTnHhEqU7hTFuYw  
**Dashboard:** [https://dashboard.scale.com/login?redirect\_url=%2F\&clear=1](https://dashboard.scale.com/login?redirect_url=%2F&clear=1)

There are 8 “bounding box” tasks in the **Traffic Sign Detection** project, some are annotated correctly, some are not. You can use the “Audit Task” button to visualize the annotations in more detail. 

***Good to know:** You can ignore any audit response like “accepted” or “rejected”, the audit statuses / feedback are simply a result of other job candidates doing this too.*

You can leverage their live API key in their account to programmatically retrieve the task responses and the original images used are available on the public internet.

1. Select the User Icon in the upper right hand side of the customer dashboard linked above  
2. Select API Key  
3. Scroll down to the Live API Keys & Select any of the keys starting with “live\_”

For programmatic Task retrieval reference the Scale API docs here: [https://docs.scale.com/reference/introduction](https://docs.scale.com/reference/introduction) 

### **Phase 2 | Programmatic Quality Checks:**

The goal of this project is to write code that can ingest a task response, perform a quality check, and output a .csv or JSON file of any issues your quality check found. There is no set output format you need to have, just make it clear and consistent.

Your script should be able to take the task responses from the API and generate an output for them. While there are only 8 tasks in this demo account, imagine we’d want to use the same script / function on the set of 250k images they’d want to be labeled. (i.e. don’t hard-code things for specific tasks, etc.)

As an example quality check, if a task has a bounding box taking up the entire image, that’s probably not great. There are many such checks that could be helpful. You’re not going to make it to the next round with us if you simply implement this check, pick something that you can uniquely deliver and can be really excited about / proud of.

If helpful, depending on the type of check you develop, it may be useful to come up with an escalation severity such as “warning” for things that seem risky but could be OK and “error” for things that we’re almost certain would be invalid.

### **Phase 3 | Reflection on Future Quality Checks:**

It’s easy to recognize that this type of work could be ongoing almost indefinitely. Instead of writing code for hours and hours, we’d like you to think critically about where these types of quality checks could go in the future and what would have the biggest impact.

### **Deliverables:** 

1. A script that is written in a language of your choice that can query for tasks, run the quality check, and create a .csv or JSON file with the results. You may upload the script to Github, or send it over as a .zip file  
2. A less than one page long reflection on where you would take this with more time  
3. A 20-25 minute walk through or presentation of \#1 and \#2 with members of our team